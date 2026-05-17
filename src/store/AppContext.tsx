import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import type { Theme, ConnectionStatus, Toast, ActivePage, UserSettings, NotificationEntry, Project, Task, Note } from '../types';
import { getSettings, saveSettings } from '../database/db';
import * as syncEngine from '../database/sync';
import { supabase, signInWithUsername as supabaseSignInWithUsername, signUpWithProfile as supabaseSignUpWithProfile, resetPasswordForEmail as supabaseResetPasswordForEmail, signOut as supabaseSignOut } from '../database/supabase';
import type { User } from '@supabase/supabase-js';

type SyncStatusValue = 'idle' | 'syncing' | 'success' | 'error';

// ============================================
// APP STATE
// ============================================
interface AppState {
  theme: Theme;
  connectionStatus: ConnectionStatus;
  toasts: Toast[];
  activePage: ActivePage;
  sidebarOpen: boolean;
  settings: UserSettings;
  autoSaveLabel: string;
  notificationLog: NotificationEntry[];
  user: User | null;
  syncStatus: SyncStatusValue;
  syncResult: syncEngine.SyncResult | null;
  isAuthenticated: boolean;
  dataVersion: number;
  authReady: boolean;
  showAuthModal: boolean;
}

interface AppActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setActivePage: (page: ActivePage) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  showSaved: () => void;
  clearNotifications: () => void;
  signInWithUsername: (username: string, password: string) => Promise<void>;
  signUpWithProfile: (username: string, email: string, gender: string, password: string) => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  requireAuth: (callback: () => void | Promise<void>) => void;
  setShowAuthModal: (open: boolean) => void;
  syncNow: () => Promise<void>;
  pushProjectAfterSave: (project: Project) => Promise<void>;
  deleteRemoteProject: (id: string) => Promise<void>;
  pushTaskAfterSave: (task: Task) => Promise<void>;
  deleteRemoteTask: (id: string) => Promise<void>;
  pushNoteAfterSave: (note: Note) => Promise<void>;
  deleteRemoteNote: (id: string) => Promise<void>;
  bumpDataVersion: () => void;
}

type AppContextValue = AppState & AppActions;

// ============================================
// DEFAULT SETTINGS
// ============================================
const defaultSettings: UserSettings = {
  theme: 'light',
  accentColor: 'violet',
  compactMode: false,
  sidebarCollapsed: false,
  notifications: true,
  autoSave: true,
  name: 'LabsYusJuL',
  email: 'dev@futurestack.io',
};

// ============================================
// CONTEXT
// ============================================
const AppContext = createContext<AppContextValue | null>(null);

const hasSupabaseCreds = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('online');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [autoSaveLabel, setAutoSaveLabel] = useState('');
  const [notificationLog, setNotificationLog] = useState<NotificationEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatusValue>('idle');
  const [syncResult, setSyncResult] = useState<syncEngine.SyncResult | null>(null);
  const [dataVersion, setDataVersion] = useState(0);
  const [authReady, setAuthReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pendingActionRef = useRef<(() => void) | null>(null);

  // Load settings from DB on mount
  useEffect(() => {
    getSettings().then(s => {
      if (s) {
        setSettings(s);
        setThemeState(s.theme);
        document.documentElement.classList.toggle('dark', s.theme === 'dark');
        applyAccent(s.accentColor);
      }
    });
  }, []);

  // Monitor connection
  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) setConnectionStatus('offline');
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Supabase auth recovery on mount
  useEffect(() => {
    if (!hasSupabaseCreds) { setAuthReady(true); return; }

    (async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        try {
          const params = new URLSearchParams(hash.replace('#', ''));
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
          }
        } catch (err) {
          console.error('OAuth session recovery failed:', err);
        } finally {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        syncNow();
      }
    })().finally(() => setAuthReady(true));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setShowAuthModal(false);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          syncNow();
          const action = pendingActionRef.current;
          pendingActionRef.current = null;
          if (action) {
            setTimeout(action, 100);
          }
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-sync when coming back online
  useEffect(() => {
    if (connectionStatus === 'online' && user) {
      syncNow();
    }
  }, [connectionStatus]);

  // Realtime subscription — react to remote changes
  const handleRemoteChange = useCallback(async () => {
    if (!user) return;
    setSyncStatus('syncing');
    setConnectionStatus('sync-pending');
    const result = await syncEngine.fullSync();
    setSyncResult(result);
    setDataVersion(v => v + 1);
    if (result.error || result.projects.errors.length > 0 || result.tasks.errors.length > 0 || result.notes.errors.length > 0) {
      setSyncStatus('error');
      setConnectionStatus('offline');
    } else {
      setSyncStatus('success');
      setConnectionStatus('online');
    }
  }, [user]);

  useEffect(() => {
    if (!user) { syncEngine.unsubscribeAll(); return; }
    syncEngine.subscribeToChanges(handleRemoteChange);
    return () => syncEngine.unsubscribeAll();
  }, [user, handleRemoteChange]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => handleRemoteChange(), 30000);
    return () => clearInterval(interval);
  }, [user, handleRemoteChange]);

const ACCENT_PALETTES: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  violet: {
    light: { primary: '#2f3eff', 'primary-dim': '#1929d8', 'primary-container': '#8690ff', 'on-primary': '#ffffff', 'on-primary-container': '#000daa', 'primary-fixed': '#e0e0ff', 'primary-fixed-dim': '#918efa' },
    dark: { primary: '#5b66ff', 'primary-dim': '#4a55ee', 'primary-container': '#0015e6', 'on-primary': '#ffffff', 'on-primary-container': '#ffffff', 'primary-fixed': '#e0e0ff', 'primary-fixed-dim': '#bec2ff' },
  },
  cyan: {
    light: { primary: '#0891b2', 'primary-dim': '#0e7490', 'primary-container': '#67e8f9', 'on-primary': '#ffffff', 'on-primary-container': '#083344', 'primary-fixed': '#cffafe', 'primary-fixed-dim': '#06b6d4' },
    dark: { primary: '#22d3ee', 'primary-dim': '#06b6d4', 'primary-container': '#155e75', 'on-primary': '#0c0c14', 'on-primary-container': '#ffffff', 'primary-fixed': '#cffafe', 'primary-fixed-dim': '#67e8f9' },
  },
  lime: {
    light: { primary: '#4d7c0f', 'primary-dim': '#3f6212', 'primary-container': '#a3e635', 'on-primary': '#ffffff', 'on-primary-container': '#1a2e05', 'primary-fixed': '#ecfccb', 'primary-fixed-dim': '#84cc16' },
    dark: { primary: '#84cc16', 'primary-dim': '#65a30d', 'primary-container': '#3f6212', 'on-primary': '#0c0c14', 'on-primary-container': '#ffffff', 'primary-fixed': '#ecfccb', 'primary-fixed-dim': '#a3e635' },
  },
  yellow: {
    light: { primary: '#a16207', 'primary-dim': '#854d0e', 'primary-container': '#facc15', 'on-primary': '#ffffff', 'on-primary-container': '#422006', 'primary-fixed': '#fef9c3', 'primary-fixed-dim': '#eab308' },
    dark: { primary: '#eab308', 'primary-dim': '#ca8a04', 'primary-container': '#713f12', 'on-primary': '#0c0c14', 'on-primary-container': '#ffffff', 'primary-fixed': '#fef9c3', 'primary-fixed-dim': '#facc15' },
  },
  red: {
    light: { primary: '#dc2626', 'primary-dim': '#b91c1c', 'primary-container': '#fca5a5', 'on-primary': '#ffffff', 'on-primary-container': '#450a0a', 'primary-fixed': '#fee2e2', 'primary-fixed-dim': '#fa7a7a' },
    dark: { primary: '#fa7a7a', 'primary-dim': '#f87171', 'primary-container': '#991b1b', 'on-primary': '#0c0c14', 'on-primary-container': '#ffffff', 'primary-fixed': '#fee2e2', 'primary-fixed-dim': '#fca5a5' },
  },
};

const CSS_VARS = ['primary', 'primary-dim', 'primary-container', 'on-primary', 'on-primary-container', 'primary-fixed', 'primary-fixed-dim'] as const;

function applyAccent(accent: string) {
  const palette = ACCENT_PALETTES[accent] ?? ACCENT_PALETTES.violet;
  const root = document.documentElement;
  for (const key of CSS_VARS) {
    root.style.setProperty(`--color-${key}-light`, palette.light[key]);
    root.style.setProperty(`--color-${key}-dark`, palette.dark[key]);
  }
}

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
    applyAccent(settings.accentColor);
    setSettings(prev => {
      const updated = { ...prev, theme: t };
      saveSettings(updated);
      return updated;
    });
  }, [settings.accentColor]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setNotificationLog(prev => [{ id, message: toast.message, type: toast.type, timestamp: Date.now() }, ...prev].slice(0, 20));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, toast.duration ?? 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const updateSettings = useCallback((partial: Partial<UserSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...partial };
      saveSettings(updated);
      if (partial.theme) {
        setTheme(partial.theme);
      } else if (partial.accentColor) {
        applyAccent(partial.accentColor);
      }
      return updated;
    });
  }, [setTheme]);

  const clearNotifications = useCallback(() => setNotificationLog([]), []);

  const showSaved = useCallback(() => {
    setAutoSaveLabel('Saved locally');
    setTimeout(() => setAutoSaveLabel(''), 2000);
  }, []);

  const syncNow = useCallback(async () => {
    if (!hasSupabaseCreds || !user) return;
    setSyncStatus('syncing');
    setConnectionStatus('sync-pending');
    const result = await syncEngine.fullSync();
    setSyncResult(result);
    if (result.error || result.projects.errors.length > 0 || result.tasks.errors.length > 0 || result.notes.errors.length > 0) {
      setSyncStatus('error');
      setConnectionStatus('offline');
    } else {
      setSyncStatus('success');
      setConnectionStatus('online');
    }
  }, [user]);

  const signInWithUsername = useCallback(async (username: string, password: string) => {
    await supabaseSignInWithUsername(username, password);
  }, []);

  const signUpWithProfile = useCallback(async (username: string, email: string, gender: string, password: string) => {
    const result = await supabaseSignUpWithProfile(username, email, gender, password);
    if (result?.user && !result.session) {
      throw new Error('Please check your email for a confirmation link.');
    }
  }, []);

  const resetPasswordForEmail = useCallback(async (email: string) => {
    await supabaseResetPasswordForEmail(email);
  }, []);

  const signOutAction = useCallback(async () => {
    await supabaseSignOut();
    setUser(null);
    setSyncStatus('idle');
    setSyncResult(null);
  }, []);

  const requireAuth = useCallback((callback: () => void | Promise<void>) => {
    if (user) {
      callback();
    } else {
      pendingActionRef.current = callback as () => void;
      setShowAuthModal(true);
    }
  }, [user]);

  const setShowAuthModalAction = useCallback((open: boolean) => {
    if (!open) {
      pendingActionRef.current = null;
    }
    setShowAuthModal(open);
  }, []);

  const pushProjectAfterSave = useCallback(async (project: Project) => {
    if (!hasSupabaseCreds || !user) return;
    try {
      await syncEngine.pushProject(project);
    } catch {
      // silent: next full sync will handle it
    }
  }, [user]);

  const deleteRemoteProject = useCallback(async (id: string) => {
    if (!hasSupabaseCreds || !user) return;
    try {
      await syncEngine.deleteRemoteProject(id);
    } catch {
      // silent
    }
  }, [user]);

  const pushTaskAfterSave = useCallback(async (task: Task) => {
    if (!hasSupabaseCreds || !user) return;
    try {
      await syncEngine.pushTask(task);
    } catch {
      // silent
    }
  }, [user]);

  const deleteRemoteTask = useCallback(async (id: string) => {
    if (!hasSupabaseCreds || !user) return;
    try {
      await syncEngine.deleteRemoteTask(id);
    } catch {
      // silent
    }
  }, [user]);

  const pushNoteAfterSave = useCallback(async (note: Note) => {
    if (!hasSupabaseCreds || !user) return;
    try {
      await syncEngine.pushNote(note);
    } catch {
      // silent
    }
  }, [user]);

  const deleteRemoteNote = useCallback(async (id: string) => {
    if (!hasSupabaseCreds || !user) return;
    try {
      await syncEngine.deleteRemoteNote(id);
    } catch {
      // silent
    }
  }, [user]);

  const value: AppContextValue = {
    theme, connectionStatus, toasts, activePage, sidebarOpen, settings, autoSaveLabel, notificationLog,
    user, syncStatus, syncResult, isAuthenticated: !!user, dataVersion, authReady, showAuthModal,
    setTheme, toggleTheme, setConnectionStatus, addToast, removeToast,
    setActivePage, setSidebarOpen, toggleSidebar, updateSettings, showSaved, clearNotifications,
    signInWithUsername, signUpWithProfile, resetPasswordForEmail, signOut: signOutAction, syncNow, requireAuth, setShowAuthModal: setShowAuthModalAction,
    pushProjectAfterSave, deleteRemoteProject,
    pushTaskAfterSave, deleteRemoteTask,
    pushNoteAfterSave, deleteRemoteNote,
    bumpDataVersion: () => setDataVersion(v => v + 1),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
