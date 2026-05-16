import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Project, Task, Note, UserSettings } from '../types';

// ============================================
// DATABASE SCHEMA
// ============================================
interface FutureStackDB extends DBSchema {
  projects: {
    key: string;
    value: Project;
    indexes: { 'by-status': string; 'by-updated': string };
  };
  tasks: {
    key: string;
    value: Task;
    indexes: { 'by-project': string; 'by-status': string };
  };
  notes: {
    key: string;
    value: Note;
    indexes: { 'by-updated': string; 'by-pinned': number };
  };
  settings: {
    key: string;
    value: UserSettings & { id: string };
  };
}

const DB_NAME = 'futurestack-db';
const DB_VERSION = 1;

let db: IDBPDatabase<FutureStackDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<FutureStackDB>> {
  if (db) return db;
  db = await openDB<FutureStackDB>(DB_NAME, DB_VERSION, {
    upgrade(database) {
      // Projects store
      const projectStore = database.createObjectStore('projects', { keyPath: 'id' });
      projectStore.createIndex('by-status', 'status');
      projectStore.createIndex('by-updated', 'updatedAt');

      // Tasks store
      const taskStore = database.createObjectStore('tasks', { keyPath: 'id' });
      taskStore.createIndex('by-project', 'projectId');
      taskStore.createIndex('by-status', 'status');

      // Notes store
      const noteStore = database.createObjectStore('notes', { keyPath: 'id' });
      noteStore.createIndex('by-updated', 'updatedAt');
      noteStore.createIndex('by-pinned', 'pinned' as never);

      // Settings store
      database.createObjectStore('settings', { keyPath: 'id' });
    },
  });
  return db;
}

// ============================================
// PROJECT CRUD
// ============================================
export async function getAllProjects(): Promise<Project[]> {
  const database = await getDB();
  return database.getAll('projects');
}

export async function getProject(id: string): Promise<Project | undefined> {
  const database = await getDB();
  return database.get('projects', id);
}

export async function saveProject(project: Project): Promise<void> {
  const database = await getDB();
  await database.put('projects', project);
}

export async function deleteProject(id: string): Promise<void> {
  const database = await getDB();
  await database.delete('projects', id);
}

// ============================================
// TASK CRUD
// ============================================
export async function getAllTasks(): Promise<Task[]> {
  const database = await getDB();
  return database.getAll('tasks');
}

export async function getTasksByProject(projectId: string): Promise<Task[]> {
  const database = await getDB();
  return database.getAllFromIndex('tasks', 'by-project', projectId);
}

export async function saveTask(task: Task): Promise<void> {
  const database = await getDB();
  await database.put('tasks', task);
}

export async function deleteTask(id: string): Promise<void> {
  const database = await getDB();
  await database.delete('tasks', id);
}

// ============================================
// NOTE CRUD
// ============================================
export async function getAllNotes(): Promise<Note[]> {
  const database = await getDB();
  return database.getAll('notes');
}

export async function saveNote(note: Note): Promise<void> {
  const database = await getDB();
  await database.put('notes', note);
}

export async function deleteNote(id: string): Promise<void> {
  const database = await getDB();
  await database.delete('notes', id);
}

// ============================================
// SETTINGS CRUD
// ============================================
export async function getSettings(): Promise<UserSettings | undefined> {
  const database = await getDB();
  const result = await database.get('settings', 'user');
  if (!result) return undefined;
  const { id: _id, ...settings } = result;
  return settings as UserSettings;
}

export async function saveSettings(settings: UserSettings): Promise<void> {
  const database = await getDB();
  await database.put('settings', { ...settings, id: 'user' });
}

// ============================================
// SEED DATA
// ============================================
export async function seedDatabase(): Promise<void> {
  const database = await getDB();
  const existingProjects = await database.getAll('projects');
  const existingNotes = await database.getAll('notes');
  const alreadySeeded = existingProjects.length > 0;

  const now = new Date().toISOString();

  const projects: Project[] = [
    {
      id: 'proj-1',
      name: 'FutureStack Core',
      description: 'The main platform engine and developer OS layer.',
      status: 'active',
      priority: 'critical',
      tags: ['typescript', 'react', 'vite'],
      color: 'violet',
      progress: 68,
      taskCount: 24,
      completedTasks: 16,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'proj-2',
      name: 'LabsYusJuL API',
      description: 'REST + GraphQL API gateway for all platform services.',
      status: 'active',
      priority: 'high',
      tags: ['nodejs', 'graphql', 'postgres'],
      color: 'cyan',
      progress: 42,
      taskCount: 18,
      completedTasks: 7,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'proj-3',
      name: 'Analytics Engine',
      description: 'Real-time telemetry pipeline and dashboard metrics.',
      status: 'active',
      priority: 'medium',
      tags: ['python', 'kafka', 'clickhouse'],
      color: 'lime',
      progress: 25,
      taskCount: 12,
      completedTasks: 3,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'proj-4',
      name: 'Design System v2',
      description: 'Neo-brutalist component library and token system.',
      status: 'draft',
      priority: 'low',
      tags: ['figma', 'css', 'storybook'],
      color: 'yellow',
      progress: 10,
      taskCount: 8,
      completedTasks: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'proj-5',
      name: 'Mobile App',
      description: 'Cross-platform mobile client for iOS and Android.',
      status: 'archived',
      priority: 'low',
      tags: ['react-native', 'expo'],
      color: 'violet',
      progress: 100,
      taskCount: 30,
      completedTasks: 30,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const tasks: Task[] = [
    { id: 't-1', projectId: 'proj-1', title: 'Set up Vite + React scaffold', description: 'Initialize project structure', status: 'done', priority: 'high', tags: ['setup'], order: 0, createdAt: now, updatedAt: now },
    { id: 't-2', projectId: 'proj-1', title: 'Implement IndexedDB layer', description: 'CRUD operations for offline-first', status: 'done', priority: 'critical', tags: ['db'], order: 1, createdAt: now, updatedAt: now },
    { id: 't-3', projectId: 'proj-1', title: 'Build Kanban board UI', description: 'Drag-and-drop column layout', status: 'in-progress', priority: 'high', tags: ['ui'], order: 2, createdAt: now, updatedAt: now },
    { id: 't-4', projectId: 'proj-1', title: 'Notes markdown editor', description: 'Full markdown with preview', status: 'in-progress', priority: 'medium', tags: ['editor'], order: 3, createdAt: now, updatedAt: now },
    { id: 't-5', projectId: 'proj-1', title: 'Analytics charts integration', description: 'Recharts with live data', status: 'todo', priority: 'medium', tags: ['charts'], order: 4, createdAt: now, updatedAt: now },
    { id: 't-6', projectId: 'proj-1', title: 'PWA service worker setup', description: 'Offline caching strategy', status: 'todo', priority: 'high', tags: ['pwa'], order: 5, createdAt: now, updatedAt: now },
    { id: 't-7', projectId: 'proj-1', title: 'Dark mode implementation', description: 'Toggle + system preference', status: 'review', priority: 'medium', tags: ['theming'], order: 6, createdAt: now, updatedAt: now },
    { id: 't-8', projectId: 'proj-1', title: 'Mobile responsive layout', description: 'Breakpoints and drawer', status: 'backlog', priority: 'high', tags: ['responsive'], order: 7, createdAt: now, updatedAt: now },
    { id: 't-9', projectId: 'proj-2', title: 'GraphQL schema design', description: 'Define all types and resolvers', status: 'done', priority: 'critical', tags: ['api'], order: 0, createdAt: now, updatedAt: now },
    { id: 't-10', projectId: 'proj-2', title: 'Auth middleware', description: 'JWT + refresh token flow', status: 'in-progress', priority: 'critical', tags: ['auth'], order: 1, createdAt: now, updatedAt: now },
  ];

  const notes: Note[] = [
    {
      id: 'note-1',
      title: '## System Architecture Notes',
      content: `# FutureStack Architecture

## Overview
FutureStack is an offline-first developer OS built with React + TypeScript.

## Core Principles
- **Offline-first**: All data persists in IndexedDB
- **Neo-brutalist**: Hard shadows, borders, raw aesthetic
- **Performance**: Minimal bundle, lazy loading
- **Accessible**: WCAG AA compliance throughout

## Tech Stack
\`\`\`
Frontend: React 19 + TypeScript + Vite
Styling: Tailwind CSS v3
Database: IndexedDB (via idb)
Charts: Recharts
Icons: Lucide React
\`\`\`

## Folder Structure
\`\`\`
src/
├── app/         # App entry, routing
├── components/  # Reusable UI components
├── features/    # Feature-specific logic
├── database/    # IndexedDB CRUD
├── hooks/       # Custom React hooks
├── store/       # Global state
├── types/       # TypeScript interfaces
└── utils/       # Utility functions
\`\`\``,
      tags: ['architecture', 'docs'],
      pinned: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-2',
      title: 'API Integration Checklist',
      content: `# API Integration Checklist

- [x] GraphQL client setup
- [x] Auth token management
- [ ] Rate limiting handlers
- [ ] Error boundary setup
- [ ] Retry logic for failed requests

## Notes
Remember to handle 429 Too Many Requests with exponential backoff.`,
      tags: ['api', 'checklist'],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-3',
      title: 'Design System Tokens',
      content: `# Design System Tokens

## Colors
Primary: \`#2f3eff\`
Secondary: \`#973593\`
Tertiary: \`#735c00\`

## Typography
- Display: Space Grotesk 64px
- Headline: Space Grotesk 40px
- Body: DM Sans 16px
- Mono: JetBrains Mono 14px

## Shadows
Hard shadow: \`4px 4px 0px 0px #1b1b22\`
Card violet: \`6px 6px 0px 0px #918efa\``,
      tags: ['design', 'tokens'],
      pinned: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-4',
      title: 'Dev Log — Week 20',
      content: `# Dev Log — Week 20

## Monday
- Fixed Kanban drag & drop reordering bug
- Added search modal to Topbar
- Refactored AppContext to include notification history

## Wednesday
- Started working on dark mode polish
- Colors in charts still look off in dark mode
- Need to check contrast ratios

## Friday
- Deployed v1.0.0 to preview
- Load time improved by 40% after code splitting
- Next: add export/import for notes

## Blockers
- Recharts v3 has breaking changes with custom tooltips
- IndexedDB quota warnings on large datasets`,
      tags: ['devlog', 'weekly'],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-5',
      title: 'VS Code Setup & Snippets',
      content: `# VS Code Setup

## Extensions
- Tailwind CSS IntelliSense
- ESLint + Prettier
- GitHub Copilot
- Thunder Client (API testing)
- GitLens

## Snippets

### React Functional Component
\`\`\`typescript
import { useState } from 'react';

interface \${1:Props} {
  \$0
}

export function \${1:Component}({ }: \${1:Props}) {
  return <div>\$0</div>;
}
\`\`\`

### Custom Hook
\`\`\`typescript
import { useState, useCallback } from 'react';

export function use\${1:Name}() {
  const [\${2:state}, set\${2:State}]] = useState<\$3>(initialValue);
  return { \${2:state} };
}
\`\`\`

## Theme
- Font: JetBrains Mono 14px
- Theme: One Dark Pro
- Terminal: zsh + powerlevel10k`,
      tags: ['vscode', 'snippets', 'tooling'],
      pinned: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-6',
      title: 'Project Ideas Board',
      content: `# Project Ideas

## 🚀 Active
- **LabsYusJuL** — Personal dev OS (current)

## 💡 Ideas
- **CLI Time Tracker** — Terminal-based time tracking with SQLite
- **Recipe Manager** — Offline-first PWA for cooking recipes
- **GitHub Stars Explorer** — Tag and search your starred repos
- **Minimal Blog Engine** — Markdown-to-HTML static site generator
- **Dev Dashboard** — Aggregate GitHub + Linear + Vercel stats

## 🔮 Stretch
- Rust CLI for file organization
- Tauri desktop app for note-taking
- WebSocket-based multiplayer code editor`,
      tags: ['ideas', 'roadmap'],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-7',
      title: 'Git & Terminal Cheatsheet',
      content: `# Git & Terminal Cheatsheet

## Git
\`\`\`bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Find when a string was introduced
git log -S "searchTerm" --source --all

# Stash with name
git stash push -m "my stash"

# View stash contents
git stash show -p stash@{0}
\`\`\`

## Terminal
\`\`\`bash
# Find largest files in directory
du -sh * | sort -rh | head -10

# Kill process on port
lsof -ti:5173 | xargs kill

# Watch command output every 2s
watch -n 2 "npm run test"

# Directory tree (excluding node_modules)
tree -I "node_modules|dist|.git"
\`\`\`

## Aliases
\`\`\`bash
alias dev="npm run dev"
alias build="npm run build"
alias gst="git status"
alias gc="git commit -m"
alias gp="git push"
\`\`\``,
      tags: ['git', 'terminal', 'cheatsheet'],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-8',
      title: 'Bug Hunting Log',
      content: `# Bug Hunting Log

## [FIXED] White screen on initial load
- **Cause**: \`Github\` icon removed from lucide-react v1.16
- **Fix**: Replaced with \`Globe\`
- **Date**: 2026-05-16

## [FIXED] Kanban drag & drop not working
- **Cause**: No HTML5 DnD API implemented
- **Fix**: Added draggable + drop zone + reorder logic
- **Date**: 2026-05-16

## [FIXED] Sidebar scrolls with content
- **Cause**: \`overflow-hidden\` parent broke sticky positioning
- **Fix**: Changed sidebar to \`fixed\` layout
- **Date**: 2026-05-16

## [OPEN] IndexedDB quota exceeded
- **Symptom**: App crashes when >50MB data stored
- **Investigation**: Check if old data can be pruned
- **Workaround**: Clear site data periodically`,
      tags: ['bugs', 'debugging'],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-9',
      title: 'Learning Resources 2026',
      content: `# Learning Resources

## 📚 Books
- [ ] _Designing Data-Intensive Applications_ — Kleppmann
- [ ] _Crafting Interpreters_ — Nystrom
- [ ] _The Pragmatic Programmer_ — Hunt & Thomas
- [ ] _Rust in Action_ — McNamara

## 🎓 Courses
- [x] Epic React — Kent C. Dodds
- [x] Frontend Masters: TypeScript
- [ ] Rustlings (rustlings.course)
- [ ] WebGPU Fundamentals

## 📝 Articles to Read
- "The Architecture of Open Source Applications"
- "How Vite Works" — Evan You
- "Offline-First Design Patterns"
- "IndexedDB Best Practices"

## 🎯 Goals
1. Ship LabsYusJuL v2 with export/import
2. Learn Rust by end of Q3
3. Contribute to 3 open source projects
4. Write 12 blog posts`,
      tags: ['learning', 'books', 'goals'],
      pinned: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'note-10',
      title: 'Daily Standup Template',
      content: `# Daily Standup

## Date: _______________

## 🟢 What I did yesterday
- 

## 🟡 What I'll do today
- 

## 🔴 Blockers
- 

## 📝 Notes
- 

---

## Weekly Retro

### What went well?
- 

### What could improve?
- 

### Action items
- 

> _"Write code. Break things. Learn. Repeat."_`,
      tags: ['template', 'standup'],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    },
  ];

  // Batch insert
  if (!alreadySeeded) {
    const tx1 = database.transaction('projects', 'readwrite');
    await Promise.all(projects.map(p => tx1.store.put(p)));
    await tx1.done;

    const tx2 = database.transaction('tasks', 'readwrite');
    await Promise.all(tasks.map(t => tx2.store.put(t)));
    await tx2.done;
  }

  // Always add missing notes (upsert only new ones)
  const existingNoteIds = new Set(existingNotes.map(n => n.id));
  const newNotes = notes.filter(n => !existingNoteIds.has(n.id));
  if (newNotes.length > 0) {
    const tx3 = database.transaction('notes', 'readwrite');
    await Promise.all(newNotes.map(n => tx3.store.put(n)));
    await tx3.done;
  }
}
