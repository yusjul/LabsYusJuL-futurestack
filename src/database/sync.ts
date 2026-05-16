import { supabase } from './supabase';
import type { Project, Task, Note } from '../types';
import * as db from './db';

export interface SyncStatus {
  synced: number;
  errors: string[];
}

export interface SyncResult {
  projects: SyncStatus;
  tasks: SyncStatus;
  notes: SyncStatus;
  error?: string;
}

function toSnake(str: string): string {
  return str.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`);
}

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, l) => l.toUpperCase());
}

function recordToSnake(r: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(r)) {
    result[toSnake(k)] = v;
  }
  return result;
}

function recordToCamel(r: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(r)) {
    if (k === 'user_id') continue;
    result[toCamel(k)] = v;
  }
  return result;
}

async function syncTable<T extends { id: string; updatedAt: string }>(
  tableName: string,
  getAllLocal: () => Promise<T[]>,
  saveLocal: (item: T) => Promise<void>,
  _deleteLocal: (id: string) => Promise<void>,
): Promise<SyncStatus> {
  const status: SyncStatus = { synced: 0, errors: [] };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    status.errors.push('Not authenticated');
    return status;
  }

  const { data: remote, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    status.errors.push(error.message);
    return status;
  }

  const local = await getAllLocal();
  const localMap = new Map(local.map(i => [i.id, i]));
  const remoteMap = new Map((remote || []).map(r => [r.id, recordToCamel(r) as unknown as T]));
  const allIds = new Set([...localMap.keys(), ...remoteMap.keys()]);

  for (const id of allIds) {
    try {
      const l = localMap.get(id);
      const r = remoteMap.get(id);

      if (!l && r) {
        await saveLocal(r);
        status.synced++;
      } else if (l && !r) {
        const { error: upsertError } = await supabase
          .from(tableName)
          .upsert({ ...recordToSnake(l as unknown as Record<string, unknown>), user_id: user.id })
          .eq('id', id);
        if (upsertError) throw upsertError;
        status.synced++;
      } else if (l && r) {
        const lTime = new Date(l.updatedAt).getTime();
        const rTime = new Date(r.updatedAt).getTime();

        if (lTime > rTime) {
          const { error: upsertError } = await supabase
            .from(tableName)
            .upsert({ ...recordToSnake(l as unknown as Record<string, unknown>), user_id: user.id })
            .eq('id', id);
          if (upsertError) throw upsertError;
          status.synced++;
        } else if (rTime > lTime) {
          await saveLocal(r);
          status.synced++;
        }
      }
    } catch (e) {
      status.errors.push(`${tableName}[${id}]: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return status;
}

export async function fullSync(): Promise<SyncResult> {
  try {
    const projects = await syncTable<Project>('projects', db.getAllProjects, db.saveProject, db.deleteProject);
    const tasks = await syncTable<Task>('tasks', db.getAllTasks, db.saveTask, db.deleteTask);
    const notes = await syncTable<Note>('notes', db.getAllNotes, db.saveNote, db.deleteNote);
    return { projects, tasks, notes };
  } catch (e) {
    return {
      projects: { synced: 0, errors: [] },
      tasks: { synced: 0, errors: [] },
      notes: { synced: 0, errors: [] },
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function pushProject(project: Project): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from('projects')
    .upsert({ ...recordToSnake(project as unknown as Record<string, unknown>), user_id: user.id })
    .eq('id', project.id);
}

export async function deleteRemoteProject(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('projects').delete().eq('id', id).eq('user_id', user.id);
}

export async function pushTask(task: Task): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from('tasks')
    .upsert({ ...recordToSnake(task as unknown as Record<string, unknown>), user_id: user.id })
    .eq('id', task.id);
}

export async function deleteRemoteTask(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('tasks').delete().eq('id', id).eq('user_id', user.id);
}

export async function pushNote(note: Note): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from('notes')
    .upsert({ ...recordToSnake(note as unknown as Record<string, unknown>), user_id: user.id })
    .eq('id', note.id);
}

export async function deleteRemoteNote(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('notes').delete().eq('id', id).eq('user_id', user.id);
}
