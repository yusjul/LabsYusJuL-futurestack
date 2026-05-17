import { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { animate } from 'animejs';
import { AssistantFace } from './AssistantFace';
import { sendMessage } from '../utils/gemini';
import { parseAction, type ParsedAction, type ActionType } from '../utils/actionParser';
import { useApp } from '../store/AppContext';
import { saveProject, saveTask, saveNote, getAllProjects, getAllTasks, deleteProject, deleteTask } from '../database/db';
import { addTombstone } from '../database/sync';
import type { ChatMessage, Project, Task, Note, ActivePage } from '../types';

const PROJECT_COLORS = ['violet', 'cyan', 'lime', 'yellow', 'red'];
function randomColor() { return PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)]; }

// localStorage counter — bertahan setelah refresh
const GUEST_MSG_KEY = 'fs_guest_msg_count';
function getGuestMsgCount(): number { try { return parseInt(localStorage.getItem(GUEST_MSG_KEY) || '0', 10); } catch { return 0; } }
function incrementGuestMsgCount(): number { const c = getGuestMsgCount() + 1; try { localStorage.setItem(GUEST_MSG_KEY, String(c)); } catch {} return c; }
function resetGuestMsgCount(): void { try { localStorage.removeItem(GUEST_MSG_KEY); } catch {} }

// Pending action state — untuk alur percakapan multi-step
interface PendingAction {
  type: ActionType;
  step: 'ask_name' | 'ask_project';
  params: Record<string, string>;
}

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  const { user, requireAuth, setActivePage, addToast, bumpDataVersion, pushProjectAfterSave, pushTaskAfterSave, pushNoteAfterSave, deleteRemoteProject, deleteRemoteTask } = useApp();
  const hasUnread = !open && messages.length > 0 && messages[messages.length - 1].role === 'assistant';

  useEffect(() => { if (user) resetGuestMsgCount(); }, [user]);

  useEffect(() => {
    if (animRef.current) { animRef.current.pause(); animRef.current = null; }
    if (open) {
      setPanelVisible(true);
      setTimeout(() => {
        if (panelRef.current) animRef.current = animate(panelRef.current, { translateY: { from: 20, to: 0 }, opacity: { from: 0, to: 1 }, scale: { from: 0.85, to: 1 }, duration: 350, easing: 'easeOutBack(1.2)' });
        if (inputRef.current) inputRef.current.focus();
      }, 10);
    } else {
      if (panelRef.current) animRef.current = animate(panelRef.current, { translateY: { from: 0, to: 20 }, opacity: { from: 1, to: 0 }, scale: { from: 1, to: 0.85 }, duration: 200, easing: 'easeInQuad', onComplete: () => { if (!open) setPanelVisible(false); } });
      else setPanelVisible(false);
    }
  }, [open]);

  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages]);

  // Helper: kirim pesan assistant
  function pushAssistant(content: string) {
    setMessages(prev => [...prev, { id: `msg-${Date.now() + 1}`, role: 'assistant', content, timestamp: Date.now() }]);
  }

  // ================================
  // ACTION EXECUTORS
  // ================================
  const executeAction = useCallback(async (action: ParsedAction): Promise<string | null> => {
    const now = new Date().toISOString();
    switch (action.type) {
      case 'create_project': {
        const name = action.params.name;
        // Auto-generate tags dari kata kunci judul
        const tagKeywords: Record<string, string[]> = {
          keuangan: ['finance', 'keuangan'], finansial: ['finance'], budget: ['budget'],
          web: ['web', 'html', 'css'], mobile: ['mobile', 'app'], api: ['api', 'backend'],
          ui: ['ui', 'design'], desain: ['design', 'ui'], akademik: ['education'],
          inventori: ['inventory'], toko: ['ecommerce'], belanja: ['ecommerce'],
          chat: ['realtime', 'socket'], login: ['auth'], auth: ['auth'],
          dashboard: ['dashboard', 'analytics'], laporan: ['report'],
        };
        const autoTags: string[] = [];
        const lower = name.toLowerCase();
        for (const [key, tags] of Object.entries(tagKeywords)) {
          if (lower.includes(key)) tags.forEach(t => { if (!autoTags.includes(t)) autoTags.push(t); });
        }
        if (autoTags.length === 0) autoTags.push('project'); // fallback
        const project: Project = {
          id: `proj-${Date.now()}`, name, description: '', status: 'active', priority: 'medium',
          tags: autoTags, color: randomColor(), progress: 0, taskCount: 0, completedTasks: 0, createdAt: now, updatedAt: now,
        };
        await saveProject(project);
        await pushProjectAfterSave(project);
        bumpDataVersion();
        addToast({ message: `Project "${name}" dibuat!`, type: 'success' });
        return `✅ Project **"${name}"** berhasil dibuat!\nTags otomatis: ${autoTags.map(t => `\`${t}\``).join(', ')}\n\nMau tambahkan task? Ketik:\n\`tambahkan task [nama] ke project ${name}\``;
      }
      case 'create_task': {
        const title = action.params.title;
        // Jika judul kosong/kalimat tanya → biarkan AI yang menjawab
        if (!title || title.length < 2) return null;
        const projects = await getAllProjects();
        const activeProject = projects.find(p => p.status === 'active') || projects[0];
        const task: Task = {
          id: `t-${Date.now()}`, projectId: activeProject?.id || '', title, description: '',
          status: 'todo', priority: 'medium', tags: [], order: 0, createdAt: now, updatedAt: now,
        };
        await saveTask(task);
        await pushTaskAfterSave(task);
        // Update project stats
        if (activeProject) {
          const allT = await getAllTasks();
          const pT = allT.filter(t => t.projectId === activeProject.id);
          const upd = { ...activeProject, taskCount: pT.length, completedTasks: pT.filter(t => t.status === 'done').length, progress: pT.length > 0 ? Math.round((pT.filter(t => t.status === 'done').length / pT.length) * 100) : 0, updatedAt: now };
          await saveProject(upd); await pushProjectAfterSave(upd);
        }
        bumpDataVersion();
        addToast({ message: `Task "${title}" dibuat!`, type: 'success' });
        return `✅ Task **"${title}"** dibuat di project "${activeProject?.name || 'default'}"!`;
      }
      case 'create_note': {
        const title = action.params.title;
        const note: Note = {
          id: `note-${Date.now()}`, title, content: `# ${title}\n\n`, tags: [], pinned: false, createdAt: now, updatedAt: now,
        };
        await saveNote(note);
        await pushNoteAfterSave(note);
        bumpDataVersion();
        addToast({ message: `Note "${title}" dibuat!`, type: 'success' });
        return `📝 Note **"${title}"** berhasil dibuat!`;
      }
      case 'add_task_to_project': {
        const taskTitle = action.params.title;
        const projectName = action.params.projectName;
        // Jika title kosong (kena question guard) → biarkan AI menjawab
        if (!taskTitle || taskTitle.length < 2) return null;
        const projects = await getAllProjects();
        const found = projects.find(p => p.name.toLowerCase().includes(projectName.toLowerCase()));
        if (!found) return `❌ Project "${projectName}" tidak ditemukan. Cek nama projectnya ya.\n\nProject yang ada:\n${projects.map(p => `• ${p.name}`).join('\n')}`;
        const task: Task = {
          id: `t-${Date.now()}`, projectId: found.id, title: taskTitle, description: '',
          status: 'todo', priority: 'medium', tags: [], order: 0, createdAt: now, updatedAt: now,
        };
        await saveTask(task);
        await pushTaskAfterSave(task);
        // Update project stats
        const allTasks = await getAllTasks();
        const pTasks = allTasks.filter(t => t.projectId === found.id);
        const updated = { ...found, taskCount: pTasks.length, completedTasks: pTasks.filter(t => t.status === 'done').length, progress: pTasks.length > 0 ? Math.round((pTasks.filter(t => t.status === 'done').length / pTasks.length) * 100) : 0, updatedAt: now };
        await saveProject(updated);
        await pushProjectAfterSave(updated);
        bumpDataVersion();
        addToast({ message: `Task "${taskTitle}" ditambahkan ke ${found.name}!`, type: 'success' });
        return `✅ Task **"${taskTitle}"** berhasil ditambahkan ke project **"${found.name}"**!\n\nMau tambah task lagi? Ketik:\n\`tambahkan task [nama] ke project ${found.name}\``;
      }
      case 'list_projects': {
        const projects = await getAllProjects();
        if (projects.length === 0) return '📁 Belum ada project. Mau saya buatkan?';
        return `📁 **Daftar Project (${projects.length}):**\n\n${projects.map((p, i) => `${i + 1}. **${p.name}** — ${p.status} (${p.progress}%)`).join('\n')}`;
      }
      case 'list_tasks': {
        const tasks = await getAllTasks();
        if (tasks.length === 0) return '📋 Belum ada task.';
        const byStatus: Record<string, Task[]> = {};
        tasks.forEach(t => { if (!byStatus[t.status]) byStatus[t.status] = []; byStatus[t.status].push(t); });
        return `📋 **Daftar Task (${tasks.length}):**\n\n${Object.entries(byStatus).map(([s, items]) => `**${s.toUpperCase()}** (${items.length}):\n${items.map(t => `  • ${t.title}`).join('\n')}`).join('\n\n')}`;
      }
      case 'delete_project': {
        const projects = await getAllProjects();
        const found = projects.find(p => p.name.toLowerCase().includes(action.params.name.toLowerCase()));
        if (!found) return `❌ Project "${action.params.name}" tidak ditemukan.`;
        // Hapus semua task dalam project ini juga
        const allTasks = await getAllTasks();
        const projectTasks = allTasks.filter(t => t.projectId === found.id);
        for (const t of projectTasks) { addTombstone(t.id); await deleteTask(t.id); await deleteRemoteTask(t.id); }
        addTombstone(found.id);
        await deleteProject(found.id); await deleteRemoteProject(found.id);
        bumpDataVersion();
        addToast({ message: `Project "${found.name}" + ${projectTasks.length} task dihapus!`, type: 'warning' });
        return `🗑️ Project **"${found.name}"** dan **${projectTasks.length} task** di dalamnya berhasil dihapus.`;
      }
      case 'delete_task': {
        const tasks = await getAllTasks();
        const found = tasks.find(t => t.title.toLowerCase().includes(action.params.title.toLowerCase()));
        if (!found) return `❌ Task "${action.params.title}" tidak ditemukan.`;
        addTombstone(found.id);
        await deleteTask(found.id); await deleteRemoteTask(found.id);
        addToast({ message: `Task "${found.title}" dihapus!`, type: 'warning' });
        return `🗑️ Task **"${found.title}"** dihapus.`;
      }
      case 'count_tasks': {
        const pName = action.params.projectName?.trim();
        const allProjects = await getAllProjects();
        const allTasksAll = await getAllTasks();
        if (pName) {
          const found = allProjects.find(p => p.name.toLowerCase().includes(pName.toLowerCase()));
          if (!found) {
            const list = allProjects.map(p => `• ${p.name}`).join('\n');
            return `❌ Project "${pName}" tidak ditemukan.\n\nProject yang ada:\n${list}`;
          }
          const pTasks = allTasksAll.filter(t => t.projectId === found.id);
          const done = pTasks.filter(t => t.status === 'done').length;
          const inProgress = pTasks.filter(t => t.status === 'in-progress').length;
          const todo = pTasks.filter(t => t.status === 'todo').length;
          const review = pTasks.filter(t => t.status === 'review').length;
          const backlog = pTasks.filter(t => t.status === 'backlog').length;
          return `📊 **${found.name}** — Data Aktual:\n\n` +
            `• Total task: **${pTasks.length}**\n` +
            `• ✅ Done: ${done}\n` +
            `• 🔄 In Progress: ${inProgress}\n` +
            `• 📋 To Do: ${todo}\n` +
            `• 👁️ Review: ${review}\n` +
            `• 📦 Backlog: ${backlog}\n\n` +
            `Progress: **${pTasks.length > 0 ? Math.round((done / pTasks.length) * 100) : 0}%**`;
        }
        // Tanpa project spesifik → ringkasan semua
        const summary = allProjects.map(p => {
          const pt = allTasksAll.filter(t => t.projectId === p.id);
          const d = pt.filter(t => t.status === 'done').length;
          return `• **${p.name}**: ${pt.length} tasks (${d} done, ${Math.round(pt.length > 0 ? (d / pt.length) * 100 : 0)}%)`;
        }).join('\n');
        return `📊 **Ringkasan Semua Project:**\n\n${summary}\n\nTotal: **${allTasksAll.length} tasks** di ${allProjects.length} project`;
      }
      case 'navigate': {
        const page = action.params.page as ActivePage;
        setActivePage(page);
        return `🧭 Membuka **${page.charAt(0).toUpperCase() + page.slice(1)}**...`;
      }

      default: return null;
    }
  }, [user, bumpDataVersion, pushProjectAfterSave, pushTaskAfterSave, pushNoteAfterSave, deleteRemoteProject, deleteRemoteTask, setActivePage, addToast]);

  // ================================
  // SEND HANDLER
  // ================================
  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { id: `msg-${Date.now()}`, role: 'user', content: text, timestamp: Date.now() }]);
    setInput('');
    setLoading(true);

    // GATE: 5 pesan guest
    if (!user) {
      const count = incrementGuestMsgCount();
      if (count >= 5) {
        pushAssistant('🔒 Kamu sudah mengirim 5 pesan! Untuk melanjutkan chat, silakan **login** dulu ya.');
        setLoading(false);
        requireAuth(() => {});
        return;
      }
    }

    // === MULTI-STEP: User menjawab pertanyaan pending ===
    if (pending) {
      const answer = text.trim();

      if (pending.step === 'ask_name') {

        // CASE A: create_task dengan projectId sudah diketahui → answer adalah judul task
        if (pending.type === 'create_task' && pending.params?.projectId) {
          const finalAction: ParsedAction = {
            type: 'add_task_to_project',
            params: { title: answer, projectName: pending.params.projectName || '' },
            requiresAuth: true,
          };
          setPending(null);
          if (!user) { pushAssistant('🔒 Login dulu ya!'); setLoading(false); requireAuth(() => {}); return; }
          try { const r = await executeAction(finalAction); if (r) pushAssistant(r); }
          catch (err: any) { pushAssistant(`❌ Gagal: ${err.message}`); }
          setLoading(false);
          return;
        }

        // CASE B: create_task tanpa projectId → cek apakah answer adalah nama project
        if (pending.type === 'create_task' && !pending.params?.projectId) {
          const projects = await getAllProjects();
          const cleanAnswer = answer.replace(/^(project|proyek|projek)\s+/i, '').trim();
          const hasProjectKw = /\bproject\b/i.test(answer);
          const matchedProject = projects.find(p =>
            p.name.toLowerCase().includes(cleanAnswer.toLowerCase()) ||
            cleanAnswer.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
          );

          if (matchedProject && (hasProjectKw || cleanAnswer.toLowerCase() !== answer.toLowerCase() || matchedProject.name.toLowerCase() === cleanAnswer.toLowerCase())) {
            // Answer cocok dengan nama project → tanya task title
            setPending({ type: 'create_task', step: 'ask_name', params: { projectId: matchedProject.id, projectName: matchedProject.name } });
            pushAssistant(`📋 Task apa yang mau ditambahkan ke project **"${matchedProject.name}"**?\n\nContoh: _"Setup Database"_`);
            setLoading(false);
            return;
          }
          // Tidak cocok → answer dipakai sebagai judul task, lanjut ke ask_project
          const activeProjects = projects.filter(p => p.status !== 'archived');
          if (activeProjects.length === 1) {
            const fa: ParsedAction = { type: 'add_task_to_project', params: { title: answer, projectName: activeProjects[0].name }, requiresAuth: true };
            setPending(null);
            if (!user) { pushAssistant('🔒 Login dulu ya!'); setLoading(false); requireAuth(() => {}); return; }
            try { const r = await executeAction(fa); if (r) pushAssistant(r); } catch (e: any) { pushAssistant(`❌ ${e.message}`); }
            setLoading(false); return;
          }
          const list = activeProjects.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
          setPending({ type: 'create_task', step: 'ask_project', params: { title: answer } });
          pushAssistant(`📋 Task **"${answer}"** mau ke project mana?\n\n${list}\n\nKetik nama atau nomor:`);
          setLoading(false);
          return;
        }

        // CASE C: create_project / create_note → pakai answer sebagai nama/judul
        const finalAction: ParsedAction = {
          type: pending.type,
          params: pending.type === 'create_project' ? { name: answer } : { title: answer },
          requiresAuth: true,
        };
        setPending(null);
        if (!user) {
          pushAssistant('🔒 Kamu harus **login** dulu untuk membuat project/task/note.');
          setLoading(false); requireAuth(() => {}); return;
        }
        try {
          const result = await executeAction(finalAction);
          if (result) pushAssistant(result);
        } catch (err: any) { pushAssistant(`❌ Gagal: ${err.message}`); }
        setLoading(false);
        return;
      }

      if (pending.step === 'ask_project') {
        // Resolve project dari jawaban user (bisa nomor atau nama)
        let projectName = answer;
        const numInput = parseInt(answer.trim(), 10);
        if (!isNaN(numInput)) {
          // User ketik nomor → ambil dari list project
          const projects = await getAllProjects();
          const activeProjects = projects.filter(p => p.status !== 'archived');
          const chosen = activeProjects[numInput - 1];
          if (chosen) projectName = chosen.name;
        }

        const finalAction: ParsedAction = {
          type: 'add_task_to_project',
          params: { title: pending.params.title, projectName },
          requiresAuth: true,
        };
        setPending(null);

        if (!user) {
          pushAssistant('🔒 Kamu harus **login** dulu.');
          setLoading(false);
          requireAuth(() => {});
          return;
        }

        try {
          const result = await executeAction(finalAction);
          if (result) pushAssistant(result);
        } catch (err: any) {
          pushAssistant(`❌ Gagal: ${err.message}`);
        }
        setLoading(false);
        return;
      }
    }

    // === SMART CONTEXT: "nomor X tambahkan ke project Y" ===
    // Cek apakah user mereferensi item bernomor dari pesan AI sebelumnya
    const numPatterns = [
      // "tambahkan 7 nomor ketask project X" / "tambahkan 7 ke task project X"
      /(?:tambah(?:kan|in)?|add)\s+(\d+)\s+(?:nomor\s+)?(?:ke\s*)?(?:task|tugas)?\s*(?:project|proyek|projek)\s+(.+)/i,
      // "7 tambahkan ke project X" / "nomor 7 tambahkan ke project X"
      /(?:nomor|no|#)?\s*(\d+)\s+(?:tambah(?:kan|in)?|add)\s+(?:ke\s*)?(?:task|tugas)?\s*(?:project|proyek|projek)\s+(.+)/i,
      // "tambahkan nomor 7 ke project X"
      /(?:tambah(?:kan|in)?|add)\s+(?:nomor|no|#)\s*(\d+)\s+(?:ke\s*)?(?:task|tugas)?\s*(?:project|proyek|projek)\s+(.+)/i,
      // "nomor 7 ke project X" (tanpa tambahkan)
      /(?:nomor|no|#)\s*(\d+)\s+(?:ke\s*)?(?:task|tugas)?\s*(?:project|proyek|projek)\s+(.+)/i,
    ];
    let numberRef: RegExpMatchArray | null = null;
    for (const pat of numPatterns) {
      numberRef = text.match(pat);
      if (numberRef) break;
    }

    if (numberRef) {
      const num = parseInt(numberRef[1], 10);
      const targetProject = numberRef[2]?.trim().replace(/["""]/g, '');

      // Cari item bernomor dari pesan AI terakhir
      const lastAiMsg = [...messages].reverse().find(m => m.role === 'assistant');
      if (lastAiMsg) {
        const lines = lastAiMsg.content.split('\n');
        let foundItem = '';
        for (const line of lines) {
          const lineMatch = line.match(new RegExp(`^\\s*${num}[.\\)\\-\\.]\\s*(.+)`, 'i'))
            || line.match(new RegExp(`^\\s*${num}️⃣\\s*(.+)`, 'i'))
            || line.match(new RegExp(`^${num}\\.\\s*\\*\\*(.+?)\\*\\*`, 'i'));
          if (lineMatch) {
            foundItem = lineMatch[1].replace(/\*\*/g, '').replace(/\s*[-—–:].*/g, '').trim();
            break;
          }
        }

        if (foundItem && targetProject) {
          if (!user) {
            pushAssistant('🔒 Kamu harus **login** dulu.');
            setLoading(false);
            requireAuth(() => {});
            return;
          }
          const addAction: ParsedAction = {
            type: 'add_task_to_project',
            params: { title: foundItem, projectName: targetProject },
            requiresAuth: true,
          };
          try {
            const result = await executeAction(addAction);
            if (result) pushAssistant(result);
          } catch (err: any) {
            pushAssistant(`❌ Gagal: ${err.message}`);
          }
          setLoading(false);
          return;
        }
      }
    }

    // === BULK ADD: "tambahkan semua task ke/di project X" ===
    const bulkMatch = text.match(/(?:tambah(?:kan|in)?|add)\s+(?:semua|seluruh|all)\s+(?:task|tugas)?\s*(?:ke|di|pada)?\s*(?:project|proyek|projek)?\s+(.+)/i);
    if (bulkMatch) {
      const targetProject = bulkMatch[1]?.trim().replace(/["""]/g, '');

      if (!user) {
        pushAssistant('🔒 Kamu harus **login** dulu.');
        setLoading(false);
        requireAuth(() => {});
        return;
      }

      // Cari item bernomor dari SEMUA pesan AI (bukan cuma yang terakhir)
      const items: string[] = [];
      for (const msg of [...messages].reverse()) {
        if (msg.role !== 'assistant') continue;
        const lines = msg.content.split('\n');
        for (const line of lines) {
          const m = line.match(/^\s*(\d+)[.)\-\.]\s*(.+)/i)
            || line.match(/^\s*(\d+)️⃣\s*(.+)/i)
            || line.match(/^(\d+)\.\s*\*\*(.+?)\*\*/i);
          if (m) {
            const item = m[2].replace(/\*\*/g, '').replace(/\s*[-—–:].*/g, '').trim();
            if (item && !items.includes(item)) items.push(item);
          }
        }
        if (items.length > 0) break; // pakai pesan AI terbaru yang punya numbered items
      }

      if (items.length === 0) {
        // Tidak ada numbered items — minta user tanya task dulu
        pushAssistant(`ℹ️ Tidak ada daftar task yang bisa ditambahkan.\n\nCoba tanya dulu:\n_"task apa yang dibutuhkan untuk project ${targetProject}?"_\n\nLalu ketik lagi: **"tambahkan semua task di ${targetProject}"**`);
        setLoading(false);
        return;
      }

      const projects = await getAllProjects();
      const found = projects.find(p => p.name.toLowerCase().includes(targetProject.toLowerCase()));
      if (!found) {
        pushAssistant(`❌ Project "${targetProject}" tidak ditemukan.\n\nProject yang ada:\n${projects.map(p => `• ${p.name}`).join('\n')}`);
        setLoading(false);
        return;
      }

      const now = new Date().toISOString();
      const created: string[] = [];
      for (const item of items) {
        const task: Task = {
          id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          projectId: found.id, title: item, description: '',
          status: 'todo', priority: 'medium', tags: [], order: created.length, createdAt: now, updatedAt: now,
        };
        await saveTask(task);
        await pushTaskAfterSave(task);
        created.push(item);
      }
      // Update project taskCount & progress
      const allTasksForProject = await getAllTasks();
      const projectTasks = allTasksForProject.filter(t => t.projectId === found.id);
      const updatedProject = {
        ...found,
        taskCount: projectTasks.length,
        completedTasks: projectTasks.filter(t => t.status === 'done').length,
        progress: projectTasks.length > 0 ? Math.round((projectTasks.filter(t => t.status === 'done').length / projectTasks.length) * 100) : 0,
        updatedAt: now,
      };
      await saveProject(updatedProject);
      await pushProjectAfterSave(updatedProject);
      bumpDataVersion();
      addToast({ message: `${created.length} task ditambahkan ke ${found.name}!`, type: 'success' });
      pushAssistant(`✅ **${created.length} task** berhasil ditambahkan ke project **"${found.name}"**!\n\n${created.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nBuka Kanban untuk melihatnya!`);
      setLoading(false);
      return;
    }


    // === NORMAL: Parse action ===
    const action = parseAction(text);

    if (action.type !== 'none') {
      // Auth check untuk aksi modifikasi
      if (action.requiresAuth && !user) {
        pushAssistant('🔒 Kamu harus **login** dulu untuk aksi ini (buat/hapus project, task, note).');
        setLoading(false);
        requireAuth(() => {});
        return;
      }

      // CREATE tanpa nama → tanyakan dulu
      if (action.type === 'create_project' && !action.params.name) {
        setPending({ type: 'create_project', step: 'ask_name', params: {} });
        pushAssistant('📁 Mau buat project baru! Apa **judul/nama** project-nya?');
        setLoading(false);
        return;
      }
      if (action.type === 'create_task' && !action.params.title) {
        setPending({ type: 'create_task', step: 'ask_name', params: {} });
        pushAssistant('📋 Mau buat task baru! Apa **judul** task-nya?');
        setLoading(false);
        return;
      }
      // create_task punya judul tapi tidak ada project → tanya mau ke project mana
      if (action.type === 'create_task' && action.params.title) {
        const projects = await getAllProjects();
        const activeProjects = projects.filter(p => p.status !== 'archived');
        if (activeProjects.length === 0) {
          pushAssistant('❌ Tidak ada project. Buat project dulu ya!');
          setLoading(false);
          return;
        }
        if (activeProjects.length === 1) {
          // Hanya 1 project → langsung tambahkan
          const finalAction: ParsedAction = {
            type: 'add_task_to_project',
            params: { title: action.params.title, projectName: activeProjects[0].name },
            requiresAuth: true,
          };
          try {
            const result = await executeAction(finalAction);
            if (result) pushAssistant(result);
          } catch (err: any) { pushAssistant(`❌ Gagal: ${err.message}`); }
          setLoading(false);
          return;
        }
        // Multiple projects → tanya user pilih project mana
        const projectList = activeProjects.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
        setPending({ type: 'create_task', step: 'ask_project', params: { title: action.params.title } });
        pushAssistant(`📋 Task **"${action.params.title}"** mau ditambahkan ke project mana?\n\n${projectList}\n\nKetik nama atau nomor project-nya:`);
        setLoading(false);
        return;
      }
      if (action.type === 'create_note' && !action.params.title) {
        setPending({ type: 'create_note', step: 'ask_name', params: {} });
        pushAssistant('📝 Mau buat note baru! Apa **judul** note-nya?');
        setLoading(false);
        return;
      }

      // Execute aksi langsung
      try {
        const result = await executeAction(action);
        if (result) pushAssistant(result);
      } catch (err: any) {
        pushAssistant(`❌ Gagal: ${err.message}`);
      }
      setLoading(false);
      return;
    }

    // Bukan aksi → AI (Groq → Gemini → Offline)
    // Inject data konteks real-time dari IndexedDB agar AI bisa jawab pertanyaan data
    const [allProjects, allTasks] = await Promise.all([getAllProjects(), getAllTasks()]);
    const projectContext = allProjects.map(p => {
      const pTasks = allTasks.filter(t => t.projectId === p.id);
      const done = pTasks.filter(t => t.status === 'done').length;
      return `• ${p.name} [${p.status}] — ${pTasks.length} tasks (${done} done, ${pTasks.length - done} remaining), progress: ${p.progress}%`;
    }).join('\n');
    const taskContext = allTasks.length > 0
      ? allTasks.map(t => {
          const proj = allProjects.find(p => p.id === t.projectId);
          return `• [${proj?.name || 'No Project'}] ${t.title} (${t.status}, ${t.priority})`;
        }).slice(0, 30).join('\n') // max 30 tasks untuk hemat token
      : 'Tidak ada task.';

    const dataContextMsg = {
      role: 'assistant' as const,
      content: `[DATA AKTUAL USER — ${new Date().toLocaleDateString('id-ID')}]\n\nPROJECT (${allProjects.length}):\n${projectContext || 'Tidak ada project.'}\n\nTASK (${allTasks.length} total):\n${taskContext}`,
    };

    const history = messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
    // Sisipkan data context sebagai pesan pertama agar AI tahu data real
    const messagesWithContext = [dataContextMsg, ...history, { role: 'user' as const, content: text }];
    const result = await sendMessage(messagesWithContext);
    pushAssistant(result.error || result.text);
    setLoading(false);

  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  const guestLeft = Math.max(0, 4 - getGuestMsgCount());

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
        {panelVisible && (
          <div ref={panelRef} className="w-80 sm:w-96 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard-lg dark:shadow-[6px_6px_0px_0px_#a8a6ff] flex flex-col overflow-hidden" style={{ maxHeight: 'min(500px, 70vh)', transformOrigin: 'bottom right' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-on-surface dark:border-[#464552] bg-primary text-on-primary">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs font-bold">AI</span>
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">Assistant</span>
              </div>
              {user ? (
                <span className="font-mono text-[10px] text-green-200 px-1.5 py-0.5 bg-green-800/30 border border-green-200/30">LOGGED IN</span>
              ) : (
                <span className="font-mono text-[10px] text-yellow-200 px-1.5 py-0.5 bg-yellow-800/30 border border-yellow-200/30">GUEST ({guestLeft} left)</span>
              )}
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mb-2">👋 Hai! Ada yang bisa dibantu?</p>
                  <p className="font-mono text-[10px] text-on-surface-variant dark:text-[#464552] mb-3">Tanya seputar project, task, atau coding</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {['Buat project baru', 'Lihat semua task', 'Tips coding'].map(cmd => (
                      <button key={cmd} onClick={() => setInput(cmd)} className="font-mono text-[10px] px-2 py-1 border border-on-surface/30 dark:border-[#464552] bg-surface-container dark:bg-[#252533] text-on-surface-variant dark:text-[#777584] hover:bg-primary/10 transition-colors cursor-pointer">{cmd}</button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={['max-w-[85%] px-3 py-2 border-2', msg.role === 'user' ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff]' : 'bg-surface-container dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] border-on-surface/40 dark:border-[#464552]'].join(' ')}>
                      <p className="font-body text-body-sm whitespace-pre-wrap break-words">{msg.content}</p>
                      <p className="font-mono text-[10px] text-on-surface-variant/60 dark:text-[#777584]/60 text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container dark:bg-[#252533] border-2 border-on-surface/40 dark:border-[#464552] px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pending indicator */}
            {pending && (
              <div className="px-4 py-1.5 bg-primary/10 dark:bg-[#a8a6ff]/10 border-t border-primary/20">
                <p className="font-mono text-[10px] text-primary dark:text-[#a8a6ff]">
                  ⏳ Menunggu jawaban: {pending.step === 'ask_name' ? 'nama/judul' : 'nama project'}
                </p>
              </div>
            )}

            {/* Input */}
            <div className="border-t-2 border-on-surface dark:border-[#464552] p-3 flex gap-2">
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder={pending ? (pending.step === 'ask_name' ? 'Ketik nama/judul...' : 'Ketik nama project...') : 'Ketik pesan...'}
                disabled={loading}
                className="flex-1 px-3 py-2 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] font-body text-body-sm focus:outline-none focus:border-primary dark:focus:border-[var(--color-primary-fixed-dim-dark)] min-h-[44px]" />
              <button onClick={handleSend} disabled={loading || !input.trim()}
                className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] bg-primary text-on-primary shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
        <AssistantFace open={open} onToggle={() => setOpen(v => !v)} unread={hasUnread} />
      </div>
      {panelVisible && <div className="fixed inset-0 z-[55]" onClick={() => setOpen(false)} />}
    </>
  );
}
