import { useState, useEffect, useRef } from 'react';
import { Menu, Sun, Moon, Bell, Search, Zap, Wifi, WifiOff, RefreshCw, Columns3, FolderKanban, FileText, CheckCircle, AlertCircle, Info, AlertTriangle, Trash2, History, X } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useTranslation } from '../translations';
import { getAllTasks, getAllNotes, getAllProjects } from '../database/db';
import type { Task, Note, Project } from '../types';

const MIN_QUERY = 2;

function highlightText(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + q.length)}</strong>
      {text.slice(idx + q.length)}
    </>
  );
}

interface TopbarProps {
  onMenuClick: () => void;
  onGoToLanding: () => void;
}

const notifyIcon = { success: CheckCircle, error: AlertCircle, info: Info, warning: AlertTriangle };
const notifyColor = { success: 'text-[#84cc16]', error: 'text-[#fa7a7a]', info: 'text-primary', warning: 'text-[#eab308]' };

const HISTORY_KEY = 'fs_search_history';

function loadHistory(): string[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

function saveHistory(h: string[]) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); } catch { }
}

function addToHistory(query: string) {
  if (!query.trim()) return;
  const h = loadHistory().filter(item => item !== query.trim());
  h.unshift(query.trim());
  if (h.length > 10) h.length = 10;
  saveHistory(h);
}

function removeFromHistory(query: string) {
  saveHistory(loadHistory().filter(item => item !== query));
}

function clearHistory() {
  saveHistory([]);
}

function SearchPanel() {
  const { setActivePage, setHighlightQuery } = useApp();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  function open() {
    setIsOpen(true);
    setQuery('');
    setShowDropdown(false);
    loadedRef.current = false;
    setHighlightQuery('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function close() {
    setIsOpen(false);
    setQuery('');
    setShowDropdown(false);
    loadedRef.current = false;
  }

  function loadSearchData() {
    loadedRef.current = true;
    setHistory(loadHistory());
    Promise.all([getAllTasks(), getAllNotes(), getAllProjects()]).then(([t, n, p]) => {
      setTasks(t); setNotes(n); setProjects(p);
    });
  }

  // Listen for Ctrl+K
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) close(); else open();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const q = query.toLowerCase();
  const matchedTasks = tasks.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  const matchedNotes = notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  const matchedProjects = projects.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  const hasResults = matchedTasks.length + matchedNotes.length + matchedProjects.length > 0;
  const showResults = query.length >= MIN_QUERY;

  function select(page: 'kanban' | 'notes' | 'projects') {
    setHighlightQuery(query);
    setActivePage(page);
    close();
  }

  function onHistoryClick(item: string) {
    setQuery(item);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function onHistoryRemove(item: string, e: React.MouseEvent) {
    e.stopPropagation();
    removeFromHistory(item);
    setHistory(loadHistory());
  }

  function onClearHistory() {
    clearHistory();
    setHistory([]);
  }

  const inputClasses = 'flex items-center gap-2 px-3 py-2 border-2 min-h-[44px] transition-all duration-200 ease-out cursor-pointer overflow-hidden' +
    (isOpen
      ? ' w-72 border-[var(--color-primary-fixed-dim-light)] dark:border-[var(--color-primary-fixed-dim-dark)] bg-surface dark:bg-[#252533]'
      : ' w-44 border-on-surface dark:border-[#464552] bg-surface-container dark:bg-[#1e1e2a] hover:border-[var(--color-primary-fixed-dim-light)]');

  const dropdownClasses = 'absolute right-0 top-full mt-1 z-50 w-[480px] max-w-[90vw] bg-surface/80 dark:bg-[#1e1e2a]/80 backdrop-blur-sm border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff] transition-all duration-200 ease-out origin-top-right p-4 max-h-[70vh] overflow-y-auto' +
    (isOpen && showDropdown ? ' opacity-100 scale-100' : ' opacity-0 scale-95 pointer-events-none');

  return (
    <div ref={wrapperRef} className="relative">
      {/* Expanding input */}
      <div
        onClick={() => { if (!isOpen) open(); }}
        className={inputClasses}
      >
        <Search size={14} className="flex-shrink-0 text-on-surface-variant dark:text-[#c8c4d4]" />
        {isOpen ? (
          <input ref={inputRef} value={query} onChange={e => {
            const val = e.target.value;
            setQuery(val);
            if (val.length >= 1) {
              if (!loadedRef.current) {
                loadedRef.current = true;
                setShowDropdown(true);
                loadSearchData();
              } else {
                setShowDropdown(true);
              }
            } else {
              setShowDropdown(false);
            }
          }}
            onKeyDown={e => {
              if (e.key === 'Escape') close();
              if (e.key === 'Enter' && query.trim()) {
                addToHistory(query);
                setHistory(loadHistory());
                setQuery('');
              }
            }}
            placeholder={t('topbar.search_placeholder')}
            className="flex-1 bg-transparent text-on-surface dark:text-[#e5e1ea] font-body text-body-sm focus:outline-none border-none p-0"
          />
        ) : (
          <>
            <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] whitespace-nowrap">{t('topbar.search_button')}</span>
            <kbd className="ml-auto font-mono text-xs bg-surface-container-high dark:bg-[#252533] px-1.5 py-0.5 border border-outline dark:border-[#464552]">⌘K</kbd>
          </>
        )}
      </div>

      {/* Dropdown results */}
      <div className={dropdownClasses}>
          {!query && history.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-[11px] text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-wider flex items-center gap-1.5">
                  <History size={12} /> Search History
                </p>
                <button onClick={onClearHistory}
                  className="font-mono text-[10px] text-on-surface-variant dark:text-[#777584] hover:text-red-500 transition-colors flex items-center gap-1">
                  <Trash2 size={10} /> Clear All
                </button>
              </div>
              <div className="space-y-1">
                {history.map(item => (
                  <button key={item} onClick={() => onHistoryClick(item)}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-surface-container dark:hover:bg-[#252533] font-mono text-sm text-on-surface dark:text-[#e5e1ea] min-h-[44px] border-b border-on-surface/10 dark:border-[#464552]/30 group">
                    <History size={12} className="flex-shrink-0 text-on-surface-variant dark:text-[#777584]" />
                    <span className="truncate flex-1">{item}</span>
                    <button onClick={(e) => onHistoryRemove(item, e)}
                      className="p-1 text-on-surface-variant dark:text-[#777584] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && !hasResults && (
            <div className="py-8 text-center">
              <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t('topbar.no_results')}</p>
            </div>
          )}

          {showResults && matchedProjects.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[11px] text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-wider mb-2">{t('topbar.section_projects')}</p>
              {matchedProjects.slice(0, 5).map(p => (
                <button key={p.id} onClick={() => select('projects')} className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-surface-container dark:hover:bg-[#252533] font-mono text-sm text-on-surface dark:text-[#e5e1ea] min-h-[44px] border-b border-on-surface/10 dark:border-[#464552]/30">
                  <FolderKanban size={14} className="flex-shrink-0 text-primary dark:text-[var(--color-primary-fixed-dim-dark)]" />
                  <span className="truncate">{highlightText(p.name, query)}</span>
                  <span className="ml-auto font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{p.status}</span>
                </button>
              ))}
            </div>
          )}
          {showResults && matchedTasks.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[11px] text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-wider mb-2">{t('topbar.section_tasks')}</p>
              {matchedTasks.slice(0, 5).map(t => (
                <button key={t.id} onClick={() => select('kanban')} className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-surface-container dark:hover:bg-[#252533] font-mono text-sm text-on-surface dark:text-[#e5e1ea] min-h-[44px] border-b border-on-surface/10 dark:border-[#464552]/30">
                  <Columns3 size={14} className="flex-shrink-0 text-[#06b6d4]" />
                  <span className="truncate">{highlightText(t.title, query)}</span>
                  <span className="ml-auto font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t.status}</span>
                </button>
              ))}
            </div>
          )}
          {showResults && matchedNotes.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[11px] text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-wider mb-2">{t('topbar.section_notes')}</p>
              {matchedNotes.slice(0, 5).map(n => (
                <button key={n.id} onClick={() => select('notes')} className="w-full text-left flex items-center gap-3 px-3 py-2 hover:bg-surface-container dark:hover:bg-[#252533] font-mono text-sm text-on-surface dark:text-[#e5e1ea] min-h-[44px] border-b border-on-surface/10 dark:border-[#464552]/30">
                  <FileText size={14} className="flex-shrink-0 text-[#84cc16]" />
                  <span className="truncate">{highlightText(n.title, query)}</span>
                  <span className="ml-auto font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{n.tags?.join(', ')}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notificationLog, clearNotifications, addToast } = useApp();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node) && notifBtnRef.current && !notifBtnRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

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
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-on-surface dark:text-[#e5e1ea]">{t('topbar.notifications')}</span>
        {notificationLog.length > 0 && (
          <button onClick={clearAll} className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] hover:text-on-surface dark:hover:text-[#e5e1ea] flex items-center gap-1 min-h-[32px] px-2">
            <Trash2 size={12} />
            {t('topbar.clear_notifications')}
          </button>
        )}
      </div>
      <div className="max-h-72 overflow-y-auto">
        {notificationLog.length === 0 ? (
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] text-center py-8">{t('topbar.no_notifications')}</p>
        ) : (
          notificationLog.slice(0, 15).map(n => {
            const Icon = notifyIcon[n.type];
            return (
              <div key={n.id} className="flex items-start gap-3 px-4 py-3 border-b border-on-surface/20 dark:border-[#464552]/20">
                <Icon size={14} className={`mt-0.5 flex-shrink-0 ${notifyColor[n.type]}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">{n.message}</p>
                  <p className="font-mono text-[10px] text-on-surface-variant dark:text-[#c8c4d4] mt-0.5">
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
  const { theme, toggleTheme, connectionStatus, activePage, autoSaveLabel, addToast, setActivePage, notificationLog, user, requireAuth, highlightQuery, setHighlightQuery } = useApp();
  const { t } = useTranslation();
  const connectionConfig = {
    online: { icon: Wifi, label: t('topbar.online'), color: 'text-[#84cc16]', dotClass: 'bg-[#84cc16] animate-pulse-dot' },
    offline: { icon: WifiOff, label: t('topbar.offline'), color: 'text-[#fa7a7a]', dotClass: 'bg-[#fa7a7a]' },
    'sync-pending': { icon: RefreshCw, label: t('topbar.syncing'), color: 'text-[#eab308]', dotClass: 'bg-[#eab308] animate-pulse-dot' },
  };
  const conn = connectionConfig[connectionStatus];
  const [notifOpen, setNotifOpen] = useState(false);
  const notifBtnRef = useRef<HTMLButtonElement>(null);

  const pageLabels: Record<string, string> = {
    dashboard: t('sidebar.dashboard'),
    projects: t('sidebar.projects'),
    kanban: t('sidebar.kanban'),
    notes: t('sidebar.notes'),
    analytics: t('sidebar.analytics'),
    settings: t('sidebar.settings'),
  };

  // Auto-clear highlight after 3s
  useEffect(() => {
    if (!highlightQuery) return;
    const timer = setTimeout(() => setHighlightQuery(''), 3000);
    return () => clearTimeout(timer);
  }, [highlightQuery, setHighlightQuery]);

  return (
    <header className="sticky top-0 z-40 bg-surface dark:bg-[#12121a] border-b-2 border-on-surface dark:border-[#a8a6ff] h-16 flex items-center px-3 md:px-6 gap-3 md:gap-4 min-w-0">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        aria-label={t('topbar.open_menu')}
        className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] hover:bg-surface-container dark:hover:bg-[#1e1e2a] transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Logo + brand (mobile only) — compact */}
      <button onClick={onGoToLanding} className="md:hidden flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0">
        <div className="w-7 h-7 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center">
          <Zap size={13} className="text-on-primary" />
        </div>
        <span className="font-headline font-bold text-sm text-on-surface dark:text-[#e5e1ea]">{t('sidebar.brand')}</span>
      </button>

      {/* Desktop: Brand */}
      <button onClick={onGoToLanding} className="hidden md:flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]">
          <Zap size={14} className="text-on-primary" />
        </div>
        <div>
          <p className="font-headline font-bold text-sm text-on-surface dark:text-[#e5e1ea] leading-tight">{t('sidebar.brand')}</p>
          <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] leading-tight">
            {pageLabels[activePage] ?? activePage}
          </p>
        </div>
      </button>

      {/* Breadcrumb / Page label (desktop) */}
      <div className="hidden md:flex items-center gap-2 font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] ml-2">
        <span>/</span>
        <span className="text-on-surface dark:text-[#e5e1ea] font-medium">{pageLabels[activePage]}</span>
      </div>

      <div className="flex-1" />

      {/* Search (desktop) */}
      <div className="hidden md:block">
        <SearchPanel />
      </div>

      {/* Auto-save indicator */}
      {autoSaveLabel && (
        <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[#84cc16] animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
          {autoSaveLabel}
        </span>
      )}

      {/* Connection icon */}
      <div
        className={`hidden sm:flex items-center justify-center ${conn.color}`}
        aria-label={`Connection status: ${conn.label}`}
        title={conn.label}
      >
        <conn.icon size={16} />
      </div>



      {/* Notifications */}
      <div className="relative">
        <button
          ref={notifBtnRef}
          onClick={() => setNotifOpen(v => !v)}
          aria-label={t('topbar.notifications')}
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
        aria-label={theme === 'light' ? t('topbar.switch_theme') : t('topbar.switch_theme_light')}
        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center border-2 border-on-surface dark:border-[#a8a6ff] hover:bg-surface-container dark:hover:bg-[#1e1e2a] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] transition-all duration-150"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </button>

      {/* Avatar — desktop only */}
      <button
        aria-label={t('topbar.user_menu')}
        onClick={() => setActivePage('settings')}
        className="hidden md:flex w-9 h-9 bg-primary-container dark:bg-[var(--color-primary-container-dark)] border-2 border-on-surface dark:border-[#a8a6ff] items-center justify-center font-mono text-xs font-bold text-on-primary-container dark:text-white shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[4px_4px_0px_0px_#a8a6ff] transition-all duration-150"
      >
        {user?.email?.charAt(0).toUpperCase() ?? '?'}
      </button>

    </header>
  );
}