import { useState, useEffect, useRef } from 'react';
import { Menu, Sun, Moon, Bell, Search, Plus, Zap, Wifi, WifiOff, RefreshCw, Columns3, FolderKanban, FileText, CheckCircle, AlertCircle, Info, AlertTriangle, Trash2, CloudOff } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Modal } from './Overlays';
import { Dropdown } from './Navigation';
import { getAllTasks, getAllNotes, getAllProjects } from '../database/db';
import type { Task, Note, Project } from '../types';

interface TopbarProps {
  onMenuClick: () => void;
  onGoToLanding: () => void;
}

const connectionConfig = {
  online: { icon: Wifi, label: 'Online', color: 'text-[#84cc16]', dotClass: 'bg-[#84cc16] animate-pulse-dot' },
  offline: { icon: WifiOff, label: 'Offline', color: 'text-[#fa7a7a]', dotClass: 'bg-[#fa7a7a]' },
  'sync-pending': { icon: RefreshCw, label: 'Syncing', color: 'text-[#eab308]', dotClass: 'bg-[#eab308] animate-pulse-dot' },
};

const notifyIcon = { success: CheckCircle, error: AlertCircle, info: Info, warning: AlertTriangle };
const notifyColor = { success: 'text-[#84cc16]', error: 'text-[#fa7a7a]', info: 'text-primary', warning: 'text-[#eab308]' };

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setActivePage } = useApp();
  const [query, setQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      Promise.all([getAllTasks(), getAllNotes(), getAllProjects()]).then(([t, n, p]) => {
        setTasks(t); setNotes(n); setProjects(p);
      });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const q = query.toLowerCase();
  const matchedTasks = tasks.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  const matchedNotes = notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  const matchedProjects = projects.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  const hasResults = matchedTasks.length + matchedNotes.length + matchedProjects.length > 0;

  function select(page: 'kanban' | 'notes' | 'projects') {
    setActivePage(page);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Search" size="lg">
      <input
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search tasks, notes, projects..."
        className="w-full border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] px-4 py-3 font-body text-body-md shadow-hard-sm focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] mb-4"
      />
      {query && !hasResults && (
        <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] text-center py-8">No results found</p>
      )}
      {query && hasResults && (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {matchedTasks.length > 0 && (
            <div>
              <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] uppercase tracking-widest mb-2">Tasks</p>
              {matchedTasks.slice(0, 5).map(t => (
                <button key={t.id} onClick={() => select('kanban')} className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] hover:bg-surface-container dark:hover:bg-[#252533] border border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-all text-left">
                  <Columns3 size={14} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea] truncate">{t.title}</p>
                    {t.description && <p className="font-body text-xs text-on-surface-variant dark:text-[#777584] truncate">{t.description}</p>}
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant dark:text-[#464552] flex-shrink-0">{t.status}</span>
                </button>
              ))}
            </div>
          )}
          {matchedProjects.length > 0 && (
            <div>
              <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] uppercase tracking-widest mb-2">Projects</p>
              {matchedProjects.slice(0, 5).map(p => (
                <button key={p.id} onClick={() => select('projects')} className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] hover:bg-surface-container dark:hover:bg-[#252533] border border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-all text-left">
                  <FolderKanban size={14} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea] truncate">{p.name}</p>
                    {p.description && <p className="font-body text-xs text-on-surface-variant dark:text-[#777584] truncate">{p.description}</p>}
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant dark:text-[#464552] flex-shrink-0">{p.status}</span>
                </button>
              ))}
            </div>
          )}
          {matchedNotes.length > 0 && (
            <div>
              <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] uppercase tracking-widest mb-2">Notes</p>
              {matchedNotes.slice(0, 5).map(n => (
                <button key={n.id} onClick={() => select('notes')} className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] hover:bg-surface-container dark:hover:bg-[#252533] border border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-all text-left">
                  <FileText size={14} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)] flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea] truncate">{n.title}</p>
                    <p className="font-body text-xs text-on-surface-variant dark:text-[#777584] truncate">{n.tags.join(', ')}</p>
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant dark:text-[#464552] flex-shrink-0">{n.pinned ? '📌' : ''}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notificationLog, clearNotifications, addToast } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  function clearAll() {
    clearNotifications();
    addToast({ message: 'Notifications cleared', type: 'info' });
    onClose();
  }

  return (
    <div
      ref={ref}
      className={`absolute right-0 top-full mt-1 z-50 w-80 bg-surface dark:bg-[#1e1e2a] border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff] animate-[pop_150ms_ease-out] ${open ? '' : 'hidden'}`}
      role="menu"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-on-surface dark:border-[#464552]">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface dark:text-[#e5e1ea]">Notifications</span>
        {notificationLog.length > 0 && (
          <button onClick={clearAll} className="font-mono text-xs text-on-surface-variant dark:text-[#777584] hover:text-on-surface dark:hover:text-[#e5e1ea] flex items-center gap-1 min-h-[32px] px-2">
            <Trash2 size={12} />
            Clear
          </button>
        )}
      </div>
      <div className="max-h-72 overflow-y-auto">
        {notificationLog.length === 0 ? (
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#464552] text-center py-8">No notifications yet</p>
        ) : (
          notificationLog.slice(0, 15).map(n => {
            const Icon = notifyIcon[n.type];
            return (
              <div key={n.id} className="flex items-start gap-3 px-4 py-3 border-b border-on-surface/20 dark:border-[#464552]/20">
                <Icon size={14} className={`mt-0.5 flex-shrink-0 ${notifyColor[n.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">{n.message}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant dark:text-[#777584] mt-0.5">
                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function Topbar({ onMenuClick, onGoToLanding }: TopbarProps) {
  const { theme, toggleTheme, connectionStatus, activePage, autoSaveLabel, addToast, setActivePage, notificationLog, user, isAuthenticated } = useApp();
  const conn = connectionConfig[connectionStatus];
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifBtnRef = useRef<HTMLButtonElement>(null);

  const pageLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    projects: 'Projects',
    kanban: 'Kanban Board',
    notes: 'Notes',
    analytics: 'Analytics',
    settings: 'Settings',
  };

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-surface dark:bg-[#12121a] border-b-2 border-on-surface dark:border-[#a8a6ff] h-16 flex items-center px-3 md:px-6 gap-3 md:gap-4 min-w-0">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] hover:bg-surface-container dark:hover:bg-[#1e1e2a] transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Logo + brand (mobile only) — compact */}
      <button onClick={onGoToLanding} className="md:hidden flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0">
        <div className="w-7 h-7 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center">
          <Zap size={13} className="text-on-primary" />
        </div>
        <span className="font-headline font-bold text-sm text-on-surface dark:text-[#e5e1ea]">LabsYusJuL</span>
      </button>

      {/* Desktop: Brand */}
      <button onClick={onGoToLanding} className="hidden md:flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]">
          <Zap size={14} className="text-on-primary" />
        </div>
        <div>
          <p className="font-headline font-bold text-sm text-on-surface dark:text-[#e5e1ea] leading-tight">LabsYusJuL</p>
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] leading-tight">
            {pageLabels[activePage] ?? activePage}
          </p>
        </div>
      </button>

      {/* Breadcrumb / Page label (desktop) */}
      <div className="hidden md:flex items-center gap-2 font-mono text-xs text-on-surface-variant dark:text-[#777584] ml-2">
        <span>/</span>
        <span className="text-on-surface dark:text-[#e5e1ea] font-medium">{pageLabels[activePage]}</span>
      </div>

      <div className="flex-1" />

      {/* Search (desktop) */}
      <button
        onClick={() => setSearchOpen(true)}
        aria-label="Search (Ctrl+K)"
        className="hidden md:flex items-center gap-2 px-3 py-2 border-2 border-on-surface dark:border-[#464552] bg-surface-container dark:bg-[#1e1e2a] hover:border-[var(--color-primary-fixed-dim-light)] transition-colors duration-150 min-h-[44px]"
      >
        <Search size={14} className="text-on-surface-variant dark:text-[#777584]" />
        <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">Search...</span>
        <kbd className="ml-4 font-mono text-xs bg-surface-container-high dark:bg-[#252533] px-1.5 py-0.5 border border-outline dark:border-[#464552]">
          ⌘K
        </kbd>
      </button>

      {/* Auto-save indicator */}
      {autoSaveLabel && (
        <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[#84cc16] animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
          {autoSaveLabel}
        </span>
      )}

      {/* Connection badge */}
      <div
        className={`hidden sm:flex items-center gap-1.5 font-mono text-xs ${conn.color}`}
        aria-label={`Connection status: ${conn.label}`}
        title={conn.label}
      >
        <span className={`w-2 h-2 rounded-full ${conn.dotClass}`} />
        <span className="hidden lg:inline">{conn.label}</span>
      </div>

      {/* New button — desktop only */}
      <div className="hidden md:block">
      <Dropdown
        trigger={
          <button
            aria-label="Create new item"
            className="flex items-center gap-1.5 px-3 py-2 bg-primary text-on-primary border-2 border-on-surface dark:border-[#a8a6ff] font-mono text-xs font-medium shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:shadow-hard dark:hover:shadow-[4px_4px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 min-h-[44px]"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New</span>
          </button>
        }
        items={[
          { id: 'task', label: 'New Task', icon: <Columns3 size={12} /> },
          { id: 'project', label: 'New Project', icon: <FolderKanban size={12} /> },
          { id: 'note', label: 'New Note', icon: <FileText size={12} /> },
        ]}
        onSelect={id => {
          if (id === 'task') { setActivePage('kanban'); addToast({ message: 'Add a new task in Kanban', type: 'info' }); }
          if (id === 'project') { setActivePage('projects'); addToast({ message: 'Add a new project', type: 'info' }); }
          if (id === 'note') { setActivePage('notes'); addToast({ message: 'Create a new note', type: 'info' }); }
        }}
        align="right"
      />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          ref={notifBtnRef}
          onClick={() => setNotifOpen(v => !v)}
          aria-label="Notifications"
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-surface-container dark:hover:bg-[#1e1e2a] border-2 border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-all duration-150 relative"
        >
          <Bell size={16} />
          {notificationLog.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error animate-pulse" />
          )}
        </button>
        <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] hover:bg-surface-container dark:hover:bg-[#1e1e2a] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all duration-150"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      {/* Avatar / Sync status — desktop only */}
      <button
        aria-label={isAuthenticated ? 'User menu' : 'Sign in to sync'}
        onClick={() => setActivePage('settings')}
        className={[
          'hidden md:flex w-9 h-9 border-2 border-on-surface dark:border-[#a8a6ff] items-center justify-center font-mono text-xs font-bold shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[4px_4px_0px_0px_#a8a6ff] transition-all duration-150',
          isAuthenticated ? 'bg-primary-container dark:bg-[var(--color-primary-container-dark)] text-on-primary-container dark:text-white' : 'bg-surface dark:bg-[#1e1e2a] text-on-surface-variant dark:text-[#777584]',
        ].join(' ')}
      >
        {isAuthenticated ? (user?.email?.charAt(0).toUpperCase() ?? '?') : <CloudOff size={14} />}
      </button>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}