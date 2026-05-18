// ============================================
// GLOBAL TYPES
// ============================================

export type Theme = 'light' | 'dark';
export type ConnectionStatus = 'online' | 'offline' | 'sync-pending';

// ============================================
// PROJECT TYPES
// ============================================
export type ProjectStatus = 'active' | 'archived' | 'draft';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  tags: string[];
  color: string; // accent color key
  progress: number; // 0-100
  taskCount: number;
  completedTasks: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// KANBAN TYPES
// ============================================
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
  tags: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanColumn {
  id: TaskStatus;
  label: string;
  color: string;
  tasks: Task[];
}

// ============================================
// NOTE TYPES
// ============================================
export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  tags: string[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// ANALYTICS TYPES
// ============================================
export interface DataPoint {
  label: string;
  value: number;
}

export interface AnalyticsData {
  tasksCompleted: DataPoint[];
  projectProgress: DataPoint[];
  activityByDay: DataPoint[];
  velocityTrend: DataPoint[];
}

// ============================================
// STAT CARD TYPES
// ============================================
export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change: number; // percentage change
  changeLabel: string;
  icon: string;
  color: string;
}

// ============================================
// PROFILE TYPES
// ============================================
export interface UserProfile {
  id: string;
  username: string;
  gender: 'male' | 'female' | 'other';
  created_at: string;
}

// ============================================
// SETTINGS TYPES
// ============================================
export type Lang = 'en' | 'id';

export interface UserSettings {
  theme: Theme;
  accentColor: string;
  compactMode: boolean;
  sidebarCollapsed: boolean;
  notifications: boolean;
  autoSave: boolean;
  name: string;
  email: string;
  language: Lang;
}

// ============================================
// UI STORE TYPES
// ============================================
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export type ActivePage = 'dashboard' | 'projects' | 'kanban' | 'notes' | 'analytics' | 'settings' | 'documentation' | 'login';

// ============================================
// DOCUMENTATION TYPES
// ============================================
export interface DocEntry {
  id: string;
  title: string;
  content: string;
  category: 'quickstart' | 'feature' | 'tutorial' | 'shortcut';
  tags: string[];
  updatedAt: string;
}

// ============================================
// CHAT TYPES
// ============================================
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageDB {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  updatedAt: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================
export interface NotificationEntry {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: number;
}
