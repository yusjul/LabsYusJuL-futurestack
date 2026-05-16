import type { Project, Task, Note } from '../types';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToJSON(projects: Project[], tasks: Task[], notes: Note[]) {
  const data = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    data: { projects, tasks, notes },
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `labsyusjul-export-${new Date().toISOString().slice(0, 10)}.json`);
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';
  const keys = Object.keys(rows[0]);
  const header = keys.join(',');
  const lines = rows.map(row =>
    keys.map(k => {
      const v = row[k];
      if (v === null || v === undefined) return '';
      const s = String(v);
      return s.includes(',') || s.includes('"') || s.includes('\n')
        ? `"${s.replace(/"/g, '""')}"`
        : s;
    }).join(',')
  );
  return [header, ...lines].join('\n');
}

export function exportToCSV(projects: Project[], tasks: Task[], notes: Note[]) {
  const date = new Date().toISOString().slice(0, 10);

  const projectRows = projects.map(p => ({
    id: p.id, name: p.name, status: p.status, priority: p.priority,
    progress: p.progress, taskCount: p.taskCount, completedTasks: p.completedTasks,
    tags: p.tags.join('; '), description: p.description, color: p.color,
  }));
  downloadBlob(new Blob([toCSV(projectRows)], { type: 'text/csv' }), `labsyusjul-projects-${date}.csv`);

  const taskRows = tasks.map(t => ({
    id: t.id, title: t.title, status: t.status, priority: t.priority,
    projectId: t.projectId, order: t.order, tags: t.tags.join('; '),
    assignee: t.assignee || '', dueDate: t.dueDate || '',
  }));
  downloadBlob(new Blob([toCSV(taskRows)], { type: 'text/csv' }), `labsyusjul-tasks-${date}.csv`);

  const noteRows = notes.map(n => ({
    id: n.id, title: n.title, tags: n.tags.join('; '), pinned: n.pinned,
    content: n.content,
  }));
  downloadBlob(new Blob([toCSV(noteRows)], { type: 'text/csv' }), `labsyusjul-notes-${date}.csv`);
}
