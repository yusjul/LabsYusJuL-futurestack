import {
  LayoutDashboard, FolderKanban, Columns3, FileText,
  BarChart3, Settings, ChevronRight, Zap, X
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { ActivePage } from '../types';

const navItems: { id: ActivePage; label: string; icon: typeof LayoutDashboard; shortcut: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: '1' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, shortcut: '2' },
  { id: 'kanban', label: 'Kanban', icon: Columns3, shortcut: '3' },
  { id: 'notes', label: 'Notes', icon: FileText, shortcut: '4' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, shortcut: '5' },
  { id: 'settings', label: 'Settings', icon: Settings, shortcut: '6' },
];

// ============================================
// DESKTOP SIDEBAR
// ============================================
export function Sidebar() {
  const { activePage, setActivePage } = useApp();

  return (
    <aside
      className={[
        'hidden md:flex flex-col w-56',
        'bg-surface dark:bg-[#12121a]',
        'border-r-2 border-on-surface dark:border-[#a8a6ff]',
        'fixed left-0 top-16 bottom-0 overflow-y-auto z-30',
      ].join(' ')}
      aria-label="Main navigation"
    >
      {/* Brand accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-tertiary" />

      <nav className="flex-1 py-4 px-2">
        <p className="px-3 mb-2 font-mono text-xs text-on-surface-variant dark:text-[#777584] uppercase tracking-widest">
          Navigation
        </p>
        <ul role="list" className="space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px]',
                    'font-mono text-sm font-medium',
                    'transition-all duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed-dim-light)] focus:ring-inset',
                    isActive
                      ? 'bg-primary text-on-primary border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]'
                      : 'text-on-surface-variant dark:text-[#c8c4d4] hover:bg-surface-container dark:hover:bg-[#1e1e2a] hover:text-on-surface dark:hover:text-[#e5e1ea] border-2 border-transparent',
                  ].join(' ')}
                >
                  <Icon size={16} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight size={14} />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System info */}
      <div className="px-4 py-4 border-t-2 border-on-surface dark:border-[#464552]">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={12} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)]" />
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">FutureStack v1.0</span>
        </div>
        <div className="font-mono text-xs text-on-surface-variant dark:text-[#464552]">
          Build: {new Date().toISOString().split('T')[0]}
        </div>
      </div>
    </aside>
  );
}

// ============================================
// MOBILE SIDEBAR DRAWER
// ============================================
interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const { activePage, setActivePage } = useApp();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-on-surface/20 drawer-overlay" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <aside
        className="absolute left-0 top-0 bottom-0 w-72 bg-surface dark:bg-[#12121a] border-r-2 border-on-surface dark:border-[#a8a6ff] drawer-panel-left flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-on-surface dark:border-[#464552]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center">
              <Zap size={12} className="text-on-primary" />
            </div>
            <span className="font-headline font-bold text-headline-sm text-on-surface dark:text-[#e5e1ea]">FutureStack</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-surface-container dark:hover:bg-[#1e1e2a]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />

        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul role="list" className="space-y-0.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => { setActivePage(item.id); onClose(); }}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'w-full flex items-center gap-3 px-4 py-3 min-h-[44px]',
                      'font-mono text-sm font-medium',
                      'transition-all duration-150',
                      isActive
                        ? 'bg-primary text-on-primary border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]'
                        : 'text-on-surface-variant dark:text-[#c8c4d4] hover:bg-surface-container dark:hover:bg-[#1e1e2a] hover:text-on-surface dark:hover:text-[#e5e1ea] border-2 border-transparent',
                    ].join(' ')}
                  >
                    <Icon size={18} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="font-mono text-xs opacity-40">⌘{item.shortcut}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
