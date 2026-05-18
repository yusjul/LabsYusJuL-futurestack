import { useState, useEffect, useRef } from 'react';
import { Plus, GripVertical, MoreHorizontal, Tag, CalendarDays, AlertCircle, Trash2, Edit3 } from 'lucide-react';
import { useTranslation } from '../translations';
import { useApp } from '../store/AppContext';
import { getAllTasks, getAllProjects, saveTask, saveProject, deleteTask } from '../database/db';
import { addTombstone } from '../database/sync';
import type { Task, TaskStatus, Project } from '../types';
import { Button } from '../components/Button';
import { Input, Select } from '../components/FormControls';
import { Modal } from '../components/Overlays';

import { Dropdown } from '../components/Navigation';

// ============================================
// COLUMN CONFIG
// ============================================
function getColumns(t: (key: string) => string): { id: TaskStatus; label: string; color: string; dotColor: string; shadowColor: string }[] {
  return [
    { id: 'backlog', label: t('kanban.column_backlog'), color: 'border-on-surface-variant dark:border-[#777584]', dotColor: 'bg-on-surface-variant dark:bg-[#777584]', shadowColor: 'shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]' },
    { id: 'todo', label: t('kanban.column_todo'), color: 'border-primary dark:border-[var(--color-primary-fixed-dim-dark)]', dotColor: 'bg-primary dark:bg-[var(--color-primary-fixed-dim-dark)]', shadowColor: 'shadow-hard-violet dark:shadow-[4px_4px_0px_0px_var(--color-primary-fixed-dim-dark)]' },
    { id: 'in-progress', label: t('kanban.column_in_progress'), color: 'border-[#06b6d4]', dotColor: 'bg-[#06b6d4]', shadowColor: 'shadow-[4px_4px_0px_0px_#06b6d4]' },
    { id: 'review', label: t('kanban.column_review'), color: 'border-[#eab308]', dotColor: 'bg-[#eab308]', shadowColor: 'shadow-[4px_4px_0px_0px_#eab308]' },
    { id: 'done', label: t('kanban.column_done'), color: 'border-[#84cc16]', dotColor: 'bg-[#84cc16]', shadowColor: 'shadow-[4px_4px_0px_0px_#84cc16]' },
  ];
}

const priorityConfig: Record<Task['priority'], { color: string; icon: typeof AlertCircle | null }> = {
  critical: { color: 'text-error dark:text-[#fa7a7a] border-error dark:border-[#fa7a7a]', icon: AlertCircle },
  high: { color: 'text-[#fa7a7a] border-[#fa7a7a]', icon: null },
  medium: { color: 'text-[#eab308] border-[#eab308]', icon: null },
  low: { color: 'text-on-surface-variant dark:text-[#c8c4d4] border-on-surface-variant dark:border-[#464552]', icon: null },
};

// ============================================
// TASK CARD
// ============================================
function TaskCard({ task, projectName, onEdit, onDelete, onMove, isDragging, onDragStart, onDragEnd }: {
  task: Task;
  projectName?: string;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
}) {
  const { t } = useTranslation();
  const { highlightQuery } = useApp();
  const columns = getColumns(t);
  const pConfig = priorityConfig[task.priority];
  const PrioIcon = pConfig.icon;
  const isHighlighted = highlightQuery && (
    task.title.toLowerCase().includes(highlightQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(highlightQuery.toLowerCase())
  );

  return (
      <article
        draggable
        data-task-id={task.id}
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', task.id);
          e.dataTransfer.effectAllowed = 'move';
          onDragStart(task.id);
        }}
        onDragEnd={onDragEnd}
        className={[
          'bg-surface dark:bg-[#252533] border-2 border-on-surface dark:border-[#a8a6ff]',
          'p-3 shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]',
          'hover:-translate-x-px hover:-translate-y-px hover:shadow-hard dark:hover:shadow-[4px_4px_0px_0px_#a8a6ff]',
          'transition-all duration-150 cursor-grab active:cursor-grabbing',
          isDragging ? 'opacity-40 border-dashed' : '',
          isHighlighted ? 'ring-[3px] ring-[var(--color-primary)] dark:ring-[var(--color-primary-fixed-dim-dark)] bg-primary/10 dark:bg-[var(--color-primary-fixed-dim-dark)]/10 shadow-[0_0_12px_var(--color-primary)] dark:shadow-[0_0_12px_var(--color-primary-fixed-dim-dark)] animate-pulse' : '',
        ].join(' ')}
        aria-label={`Task: ${task.title}`}
      >
      <div className="flex items-start gap-2">
        <GripVertical size={14} className="text-on-surface-variant dark:text-[#c8c4d4] mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`font-body text-body-sm text-on-surface dark:text-[#e5e1ea] font-medium ${task.status === 'done' ? 'line-through opacity-60' : ''}`}>
              {task.title}
            </p>
            <Dropdown
              trigger={
                <button
                  aria-label={`Task options for ${task.title}`}
                  className="p-2 hover:bg-surface-container dark:hover:bg-[#2e2e3f] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <MoreHorizontal size={12} />
                </button>
              }
              items={[
                { id: 'edit', label: t('common.edit'), icon: <Edit3 size={12} /> },
                ...columns
                  .filter(c => c.id !== task.status)
                  .map(c => ({ id: `move-${c.id}`, label: `${t('kanban.move_to')} ${c.label}`, icon: <div className={`w-2 h-2 rounded-full ${c.dotColor}`} /> })),
                { id: 'divider', label: '', divider: true },
                { id: 'delete', label: t('common.delete'), icon: <Trash2 size={12} />, danger: true },
              ]}
              onSelect={id => {
                if (id === 'edit') onEdit(task);
                if (id === 'delete') onDelete(task.id);
                if (id.startsWith('move-')) onMove(task.id, id.replace('move-', '') as TaskStatus);
              }}
              align="right"
            />
          </div>

          {task.description && (
            <p className="font-body text-xs text-on-surface-variant dark:text-[#c8c4d4] mt-1 line-clamp-2">{task.description}</p>
          )}

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.slice(0, 3).map(tag => (
                <span key={tag} className="flex items-center gap-0.5 font-mono text-[10px] px-1.5 py-0.5 border border-on-surface-variant/40 dark:border-[#464552] text-on-surface-variant dark:text-[#c8c4d4]">
                  <Tag size={8} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className={`font-mono text-[10px] px-1.5 py-0.5 border ${pConfig.color} flex items-center gap-1`}>
              {PrioIcon && <PrioIcon size={10} />}
              {task.priority.toUpperCase()}
            </span>
            {projectName && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-primary/10 dark:bg-[var(--color-primary-fixed-dim-dark)]/20 border border-primary/30 dark:border-[var(--color-primary-fixed-dim-dark)]/40 text-primary dark:text-[var(--color-primary-fixed-dim-dark)] truncate max-w-[90px]" title={projectName}>
                📁 {projectName}
              </span>
            )}
            {task.dueDate && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-on-surface-variant dark:text-[#c8c4d4]">
                <CalendarDays size={10} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================
// KANBAN COLUMN
// ============================================
function KanbanCol({ col, tasks, projectMap, onEdit, onDelete, onMove, onAdd, onDropTask, draggedTaskId, isDragOver, onDragOverCol, onTaskDragStart, onTaskDragEnd }: {
  col: { id: TaskStatus; label: string; color: string; dotColor: string; shadowColor: string };
  tasks: Task[];
  projectMap: Map<string, string>;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
  onAdd: (status: TaskStatus) => void;
  onDropTask: (taskId: string, targetColId: TaskStatus, targetIndex: number) => void;
  draggedTaskId: string | null;
  isDragOver: boolean;
  onDragOverCol: (colId: TaskStatus | null) => void;
  onTaskDragStart: (id: string) => void;
  onTaskDragEnd: () => void;
}) {
  const { t } = useTranslation();
  const listRef = useRef<HTMLDivElement>(null);
  const [dropIndex, setDropIndex] = useState(-1);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOverCol(col.id);

    if (!listRef.current) return;
    const children = Array.from(listRef.current.children).filter(
      el => el.getAttribute('data-drop-indicator') === null
    );
    let idx = tasks.length;
    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        idx = i;
        break;
      }
    }
    setDropIndex(idx);
  }

  function handleDragLeave(e: React.DragEvent) {
    if (listRef.current && !listRef.current.contains(e.relatedTarget as Node)) {
      setDropIndex(-1);
      onDragOverCol(null);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, col.id, dropIndex);
    }
    setDropIndex(-1);
    onDragOverCol(null);
  }

  return (
    <section
      data-col-id={col.id}
      className={[
        'kanban-col flex flex-col gap-3',
        'border-2 border-on-surface dark:border-[#a8a6ff]',
        'bg-surface-container-low dark:bg-[#191926]',
        col.shadowColor,
        isDragOver ? 'ring-2 ring-primary/60 dark:ring-[var(--color-primary-fixed-dim-dark)]/60' : '',
      ].join(' ')}
      aria-label={`${col.label} column`}
    >
      {/* Column header */}
      <div className={`flex items-center justify-between px-3 py-2.5 border-b-2 ${col.color}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
          <span className="font-mono text-xs font-bold text-on-surface dark:text-[#e5e1ea] uppercase">{col.label}</span>
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] bg-surface-container dark:bg-[#252533] px-1.5 py-0.5 border border-on-surface dark:border-[#464552]">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAdd(col.id)}
          aria-label={`Add task to ${col.label}`}
          className="p-1 hover:bg-surface-container dark:hover:bg-[#252533] border border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-all min-h-[32px] min-w-[32px] flex items-center justify-center"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Tasks */}
      <div
        ref={listRef}
        data-task-list
        className={`flex flex-col gap-2 px-3 pb-3 min-h-[120px] transition-colors ${isDragOver ? 'bg-primary/5 dark:bg-[var(--color-primary-fixed-dim-dark)]/5' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 && !draggedTaskId ? (
          <div className="text-center py-8">
            <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t('kanban.no_tasks')}</p>
          </div>
        ) : (
          <>
            {dropIndex === 0 && <div className="h-1 bg-primary dark:bg-[var(--color-primary-fixed-dim-dark)] rounded-full" data-drop-indicator />}
            {tasks.map((task, idx) => (
              <div key={task.id} className="relative">
                <TaskCard
                  task={task}
                  projectName={projectMap.get(task.projectId)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onMove={onMove}
                  isDragging={draggedTaskId === task.id}
                  onDragStart={onTaskDragStart}
                  onDragEnd={onTaskDragEnd}
                />
                {dropIndex === idx + 1 && (
                  <div className="h-1 bg-primary dark:bg-[var(--color-primary-fixed-dim-dark)] rounded-full mt-2" data-drop-indicator />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

// ============================================
// TASK MODAL
// ============================================
const defaultTask = {
  title: '', description: '', status: 'todo' as TaskStatus,
  priority: 'medium' as Task['priority'], tags: '', dueDate: '',
  projectId: '',
};

function TaskModal({ open, task, defaultStatus, onClose, onSave }: {
  open: boolean;
  task: Task | null;
  defaultStatus: TaskStatus;
  onClose: () => void;
  onSave: (t: Task) => void;
}) {
  const { t } = useTranslation();
  const columns = getColumns(t);
  const [form, setForm] = useState({ ...defaultTask });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title, description: task.description,
        status: task.status, priority: task.priority,
        tags: task.tags.join(', '), dueDate: task.dueDate ?? '',
        projectId: task.projectId || (projects.length > 0 ? projects[0].id : ''),
      });
    } else {
      setForm({
        ...defaultTask, status: defaultStatus,
        projectId: projects.length > 0 ? projects[0].id : '',
      });
    }
  }, [task, open, defaultStatus, projects]);

  function handleSubmit() {
    if (!form.projectId) return;
    const now = new Date().toISOString();
    onSave({
      id: task?.id ?? `task-${Date.now()}`,
      projectId: form.projectId,
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      dueDate: form.dueDate || undefined,
      order: task?.order ?? 0,
      createdAt: task?.createdAt ?? now,
      updatedAt: now,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? t('kanban.edit_task') : t('kanban.new_task')}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!form.title}>
            {task ? t('common.save') : t('kanban.create_task')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input label={t('kanban.task_title_label')} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder={t('kanban.task_title_placeholder')} />
        <div className="flex flex-col gap-1">
          <label className="font-mono text-xs uppercase tracking-wide text-on-surface dark:text-[#e5e1ea]">{t('kanban.desc_label')}</label>
          <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder={t('kanban.desc_placeholder')} className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] px-3 py-2 font-body text-body-sm shadow-hard-sm focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label={t('kanban.status_label')} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as TaskStatus }))} options={columns.map(c => ({ value: c.id, label: c.label }))} />
          <Select label={t('kanban.priority_label')} value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Task['priority'] }))} options={[{ value: 'low', label: t('projects.priority_low') }, { value: 'medium', label: t('projects.priority_medium') }, { value: 'high', label: t('projects.priority_high') }, { value: 'critical', label: t('projects.priority_critical') }]} />
        </div>
        {projects.length === 0 ? (
          <div className="border-2 border-dashed border-on-surface/30 dark:border-[#464552]/30 p-4 text-center">
            <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t('kanban.no_projects_message')}</p>
          </div>
        ) : (
          <Select
            label={t('kanban.project_label')}
            value={form.projectId}
            onChange={e => setForm(f => ({ ...f, projectId: e.target.value }))}
            options={projects.map(p => ({ value: p.id, label: p.name }))}
          />
        )}
        <div className="grid grid-cols-2 gap-4">
          <Input label={t('kanban.tags_label')} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder={t('kanban.tags_placeholder')} />
          <Input label={t('kanban.due_date_label')} type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
        </div>
      </div>
    </Modal>
  );
}

// ============================================
// KANBAN PAGE
// ============================================
export function KanbanPage() {
  const { t } = useTranslation();
  const columns = getColumns(t);
  const { addToast, showSaved, dataVersion, requireAuth, pushProjectAfterSave, bumpDataVersion, pushTaskAfterSave, deleteRemoteTask } = useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('todo');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<TaskStatus | null>(null);

  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  // Helper: update project stats after any task change
  async function updateProjectStats(projectId: string) {
    if (!projectId) return;
    const [allTasks, allProjects] = await Promise.all([getAllTasks(), getAllProjects()]);
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;
    const pTasks = allTasks.filter(t => t.projectId === projectId);
    const now = new Date().toISOString();
    const updated = {
      ...project,
      taskCount: pTasks.length,
      completedTasks: pTasks.filter(t => t.status === 'done').length,
      progress: pTasks.length > 0 ? Math.round((pTasks.filter(t => t.status === 'done').length / pTasks.length) * 100) : 0,
      updatedAt: now,
    };
    await saveProject(updated);
    await pushProjectAfterSave(updated);
    bumpDataVersion();
  }

  useEffect(() => {
    Promise.all([getAllTasks(), getAllProjects()]).then(([t, p]) => {
      setTasks(t); setProjects(p); setLoading(false);
    });
  }, [dataVersion]);

  const projectMap = new Map(projects.map(p => [p.id, p.name]));
  const filteredTasks = selectedProjectId === 'all' ? tasks : tasks.filter(t => t.projectId === selectedProjectId);

  function getColumnTasks(status: TaskStatus) {
    return filteredTasks.filter(t => t.status === status).sort((a, b) => a.order - b.order);
  }

  async function handleSave(task: Task) {
    requireAuth(async () => {
      await saveTask(task);
      await pushTaskAfterSave(task);
      await updateProjectStats(task.projectId);
      const updated = await getAllTasks();
      setTasks(updated);
      setModalOpen(false);
      setEditingTask(null);
      showSaved();
      addToast({ message: `Task "${task.title}" ${t('kanban.toast_saved')}`, type: 'success' });
    });
  }

  async function handleDelete(id: string) {
    requireAuth(async () => {
      const task = tasks.find(t => t.id === id);
      addTombstone(id);
      await deleteTask(id);
      await deleteRemoteTask(id);
      if (task?.projectId) await updateProjectStats(task.projectId);
      setTasks(prev => prev.filter(t => t.id !== id));
      addToast({ message: t('kanban.toast_deleted'), type: 'info' });
    });
  }

  async function handleMove(id: string, status: TaskStatus) {
    requireAuth(async () => {
      const task = tasks.find(t => t.id === id);
      if (!task) return;
      const updated = { ...task, status, updatedAt: new Date().toISOString() };
      await saveTask(updated);
      await pushTaskAfterSave(updated);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      if (task.projectId) await updateProjectStats(task.projectId);
      showSaved();
    });
  }

  async function handleDropTask(taskId: string, targetColId: TaskStatus, targetIndex: number) {
    requireAuth(async () => {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const sameCol = task.status === targetColId;
      let targetTasks = tasks
        .filter(t => t.status === targetColId && t.id !== taskId)
        .sort((a, b) => a.order - b.order);
      const insertIdx = Math.min(targetIndex, targetTasks.length);
      targetTasks.splice(insertIdx, 0, { ...task, status: targetColId });
      const updatedTasks = targetTasks.map((t, i) => ({
        ...t,
        order: i,
        updatedAt: new Date().toISOString(),
      }));

      if (!sameCol) {
        const sourceTasks = tasks
          .filter(t => t.status === task.status && t.id !== taskId)
          .sort((a, b) => a.order - b.order)
          .map((t, i) => ({ ...t, order: i, updatedAt: t.updatedAt }));
        await Promise.all([...updatedTasks, ...sourceTasks].map(t => saveTask(t)));
      } else {
        await Promise.all(updatedTasks.map(t => saveTask(t)));
      }

      const all = await getAllTasks();
      setTasks(all);
      setDraggedTaskId(null);
      setDragOverColId(null);
      showSaved();
    });
  }

  function handleAdd(status: TaskStatus) {
    requireAuth(() => {
      setDefaultStatus(status);
      setEditingTask(null);
      setModalOpen(true);
    });
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleDragStart(id: string) {
    setDraggedTaskId(id);
  }

  function handleDragEnd() {
    setDraggedTaskId(null);
    setDragOverColId(null);
  }

  // --- Touch drag support (mobile) ---
  const boardRef = useRef<HTMLDivElement>(null);
  const handleDropTaskRef = useRef(handleDropTask);
  handleDropTaskRef.current = handleDropTask;

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    let activeTaskId = '';
    let clone: HTMLElement | null = null;
    let startX = 0;
    let startY = 0;

    function onTouchStart(e: TouchEvent) {
      const target = e.target as HTMLElement;
      const card = target.closest('[data-task-id]') as HTMLElement | null;
      if (!card) return;

      activeTaskId = card.getAttribute('data-task-id')!;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (!activeTaskId) return;

      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx < 8 && dy < 8 && !clone) return;

      e.preventDefault();

      if (!clone) {
        const card = board!.querySelector(`[data-task-id="${activeTaskId}"]`) as HTMLElement | null;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        clone = card.cloneNode(true) as HTMLElement;
        Object.assign(clone.style, {
          position: 'fixed', pointerEvents: 'none', zIndex: '9999',
          width: rect.width + 'px', opacity: '0.85', transform: 'rotate(2deg)',
          left: (e.touches[0].clientX - rect.width / 2) + 'px',
          top: (e.touches[0].clientY - 20) + 'px',
        });
        document.body.appendChild(clone);
        setDraggedTaskId(activeTaskId);
      } else {
        clone.style.left = (e.touches[0].clientX - clone.offsetWidth / 2) + 'px';
        clone.style.top = (e.touches[0].clientY - 20) + 'px';
      }

      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el) {
        const colEl = el.closest('[data-col-id]') as HTMLElement | null;
        if (colEl) {
          setDragOverColId(colEl.getAttribute('data-col-id') as TaskStatus);
        }
      }
    }

    function onTouchEnd(e: TouchEvent) {
      const tid = activeTaskId;
      activeTaskId = '';
      if (clone) { clone.remove(); clone = null; }

      const touch = e.changedTouches[0];
      if (!touch || !tid) {
        setDraggedTaskId(null);
        setDragOverColId(null);
        return;
      }

      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (el) {
        const colEl = el.closest('[data-col-id]') as HTMLElement | null;
        if (colEl) {
          const colId = colEl.getAttribute('data-col-id') as TaskStatus;
          const listEl = colEl.querySelector('[data-task-list]');
          let dropIndex = 0;
          if (listEl) {
            const children = Array.from(listEl.children).filter(
              child => child.getAttribute('data-drop-indicator') === null
            );
            for (let i = 0; i < children.length; i++) {
              const childRect = children[i].getBoundingClientRect();
              if (touch.clientY < childRect.top + childRect.height / 2) {
                dropIndex = i;
                break;
              }
            }
          }
          handleDropTaskRef.current(tid, colId, dropIndex);
          return;
        }
      }

      setDraggedTaskId(null);
      setDragOverColId(null);
    }

    board.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      board.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      if (clone) clone.remove();
    };
  }, []);

  return (
    <div className="flex-1 px-3 py-2 md:px-8 md:py-8 w-full">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-3 md:mb-6">
        <div>
          <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">{t('kanban.title')}</h1>
          <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">
            {filteredTasks.length} {t('kanban.tasks_across')} {columns.length} {t('kanban.stages')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            options={[
              { value: 'all', label: t('kanban.all_projects') },
              ...projects.filter(p => p.status !== 'archived').map(p => ({ value: p.id, label: p.name }))
            ]}
          />
          <Button
            variant="primary"
            icon={<Plus size={14} />}
            onClick={() => handleAdd('todo')}
          >
            {t('kanban.add_task')}
          </Button>
        </div>
      </div>

      {/* Kanban Board — horizontal scroll on mobile/tablet */}
      {loading ? (
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4">
          {columns.map(col => (
            <div key={col.id} className="kanban-col border-2 border-on-surface dark:border-[#464552] p-3 space-y-3">
              <div className="h-6 skeleton mb-2" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-on-surface dark:border-[#464552] p-3 space-y-2">
                  <div className="h-3 skeleton" />
                  <div className="h-3 skeleton w-3/4" />
                  <div className="h-2 skeleton w-1/2" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={boardRef}
          className="kanban-board"
          role="region"
          aria-label="Kanban board"
        >
          {columns.map(col => (
            <KanbanCol
              key={col.id}
              col={col}
              tasks={getColumnTasks(col.id)}
              projectMap={projectMap}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMove={handleMove}
              onAdd={handleAdd}
              onDropTask={handleDropTask}
              draggedTaskId={draggedTaskId}
              isDragOver={dragOverColId === col.id}
              onDragOverCol={setDragOverColId}
              onTaskDragStart={handleDragStart}
              onTaskDragEnd={handleDragEnd}
            />
          ))}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onClose={() => { setModalOpen(false); setEditingTask(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
