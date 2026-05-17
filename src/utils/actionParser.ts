/**
 * AI Action Parser — Mendeteksi intent dari pesan user
 * Mendukung bahasa Indonesia casual dan multi-step flow
 */

export type ActionType =
  | 'create_project'
  | 'create_task'
  | 'create_note'
  | 'add_task_to_project'
  | 'list_projects'
  | 'list_tasks'
  | 'delete_project'
  | 'delete_task'
  | 'navigate'
  | 'none';

export interface ParsedAction {
  type: ActionType;
  params: Record<string, string>;
  requiresAuth: boolean;
}

interface ActionRule {
  type: ActionType;
  patterns: RegExp[];
  extract: (match: RegExpMatchArray, input: string) => Record<string, string>;
  requiresAuth: boolean;
}

function extractAfter(input: string, keywords: string[]): string {
  const lower = input.toLowerCase();
  for (const kw of keywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const after = input.slice(idx + kw.length).trim()
        .replace(/^(baru\s+)?/i, '')
        .replace(/^(nama(nya)?\s+)/i, '')
        .replace(/^(bernama\s+)/i, '')
        .replace(/^(dengan\s+nama\s+)/i, '')
        .replace(/^(judul(nya)?\s+)/i, '')
        .replace(/^(yang\s+)/i, '')
        .replace(/["""]/g, '')
        .trim();
      if (after.length > 0) return after;
    }
  }
  return '';
}

const actionRules: ActionRule[] = [
  // === ADD TASK TO SPECIFIC PROJECT ===
  // "tambahkan task Deploy Backend ke project LabsYusJuL API"
  {
    type: 'add_task_to_project',
    patterns: [
      /(?:tambah(?:kan|in)?|add|buat(?:kan)?)\s+(?:task|tugas)\s+(.+?)\s+(?:ke|di|pada|into|to)\s+(?:project|proyek|projek)\s+(.+)/i,
    ],
    extract: (match) => ({
      title: match[1]?.trim().replace(/["""]/g, '') || '',
      projectName: match[2]?.trim().replace(/["""]/g, '') || '',
    }),
    requiresAuth: true,
  },
  // === CREATE PROJECT (bisa tanpa nama → akan ditanyakan) ===
  {
    type: 'create_project',
    patterns: [
      /(?:buat(?:kan|in)?|create|tambah(?:kan|in)?|bikin)\s+(?:project|proyek|projek)(?:nya)?\b/i,
      /(?:tolong|coba|mau|ingin|minta)\s+(?:buat(?:kan|in)?|bikin)\s+(?:project|proyek|projek)(?:nya)?\b/i,
      /(?:ingin|mau|pengen)\s+(?:mem)?buat\s+(?:project|proyek|projek)(?:nya)?\b/i,
      // "tambahkan project X", "tambahkan saya project X"
      /(?:tambah(?:kan|in)?)\s+(?:saya\s+)?(?:project|proyek|projek)(?:nya)?\b/i,
      // "add project X"
      /add\s+(?:a\s+)?(?:new\s+)?project/i,
    ],
    extract: (_m, input) => ({
      name: extractAfter(input, ['project ', 'proyek ', 'projek ', 'projectnya ', 'proyeknya ']),
    }),
    requiresAuth: true,
  },
  // === CREATE TASK (bisa tanpa nama) ===
  {
    type: 'create_task',
    patterns: [
      /(?:buat(?:kan|in)?|create|tambah(?:kan|in)?|bikin)\s+(?:task|tugas|todo)(?:nya)?\b/i,
      /(?:tolong|coba|mau|ingin|minta)\s+(?:buat(?:kan|in)?|bikin)\s+(?:task|tugas|todo)(?:nya)?\b/i,
    ],
    extract: (_m, input) => ({
      title: extractAfter(input, ['task ', 'tugas ', 'todo ', 'tasknya ', 'tugasnya ']),
    }),
    requiresAuth: true,
  },
  // === CREATE NOTE ===
  {
    type: 'create_note',
    patterns: [
      /(?:buat(?:kan|in)?|create|tambah(?:kan|in)?|bikin)\s+(?:note|notes|catatan)(?:nya)?\b/i,
      /(?:tolong|coba|mau|ingin|minta)\s+(?:buat(?:kan|in)?|bikin)\s+(?:note|notes|catatan)(?:nya)?\b/i,
    ],
    extract: (_m, input) => ({
      title: extractAfter(input, ['note ', 'notes ', 'catatan ', 'notenya ', 'catatannya ']),
    }),
    requiresAuth: true,
  },
  // === LIST ===
  {
    type: 'list_projects',
    patterns: [
      /(?:lihat|tampilkan|show|list|daftar)\s+(?:semua\s+)?(?:project|proyek|projek)/i,
      /(?:project|proyek|projek)\s+(?:apa\s+)?(?:saja|aja)/i,
    ],
    extract: () => ({}), requiresAuth: false,
  },
  {
    type: 'list_tasks',
    patterns: [
      /(?:lihat|tampilkan|show|list|daftar)\s+(?:semua\s+)?(?:task|tugas|todo)/i,
      /(?:task|tugas|todo)\s+(?:apa\s+)?(?:saja|aja)/i,
    ],
    extract: () => ({}), requiresAuth: false,
  },
  // === DELETE ===
  {
    type: 'delete_project',
    patterns: [/(?:hapus|delete|remove)\s+(?:project|proyek|projek)(?:nya)?\s+(.+)/i],
    extract: (m) => ({ name: m[1]?.trim().replace(/["""]/g, '') || '' }),
    requiresAuth: true,
  },
  {
    type: 'delete_task',
    patterns: [/(?:hapus|delete|remove)\s+(?:task|tugas|todo)(?:nya)?\s+(.+)/i],
    extract: (m) => ({ title: m[1]?.trim().replace(/["""]/g, '') || '' }),
    requiresAuth: true,
  },
  // === NAVIGATE ===
  {
    type: 'navigate',
    patterns: [/(?:buka|open|pergi\s+ke|go\s+to)\s+(dashboard|projects?|kanban|notes?|analytics|settings)/i],
    extract: (m) => {
      const p = m[1]?.trim().toLowerCase();
      const map: Record<string, string> = { project: 'projects', projects: 'projects', note: 'notes', notes: 'notes', dashboard: 'dashboard', kanban: 'kanban', analytics: 'analytics', settings: 'settings' };
      return { page: map[p] || p };
    },
    requiresAuth: false,
  },
];

export function parseAction(input: string): ParsedAction {
  const trimmed = input.trim();
  for (const rule of actionRules) {
    for (const pattern of rule.patterns) {
      const match = trimmed.match(pattern);
      if (match) {
        return { type: rule.type, params: rule.extract(match, trimmed), requiresAuth: rule.requiresAuth };
      }
    }
  }
  return { type: 'none', params: {}, requiresAuth: false };
}
