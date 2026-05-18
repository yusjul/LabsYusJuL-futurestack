import {
  LayoutDashboard, FolderKanban, Columns3, FileText,
  BarChart3, Settings, ChevronRight, ChevronLeft, Zap, X
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { useTranslation } from '../translations';
import type { ActivePage } from '../types';

function useNavItems() {
  const { t } = useTranslation();
  const items: { id: ActivePage; label: string; icon: typeof LayoutDashboard; shortcut: string }[] = [
    { id: 'dashboard', label: t('sidebar.dashboard'), icon: LayoutDashboard, shortcut: '1' },
    { id: 'projects', label: t('sidebar.projects'), icon: FolderKanban, shortcut: '2' },
    { id: 'kanban', label: t('sidebar.kanban'), icon: Columns3, shortcut: '3' },
    { id: 'notes', label: t('sidebar.notes'), icon: FileText, shortcut: '4' },
    { id: 'analytics', label: t('sidebar.analytics'), icon: BarChart3, shortcut: '5' },
    { id: 'settings', label: t('sidebar.settings'), icon: Settings, shortcut: '6' },
  ];
  return items;
}

// ============================================
// DESKTOP SIDEBAR
// ============================================
export function Sidebar() {
  const { activePage, setActivePage, settings, updateSettings } = useApp();
  const { t } = useTranslation();
  const navItems = useNavItems();
  const collapsed = settings.sidebarCollapsed;

  function toggle() {
    updateSettings({ sidebarCollapsed: !collapsed });
  }

  return (
    <aside
      className={[
        'hidden md:flex flex-col',
        collapsed ? 'w-16' : 'w-56',
        'bg-surface dark:bg-[#12121a]',
        'border-r-2 border-on-surface dark:border-[#a8a6ff]',
        'fixed left-0 top-16 bottom-0 overflow-y-auto overflow-x-hidden z-30',
        'transition-all duration-200',
      ].join(' ')}
      aria-label={t('sidebar.navigation')}
    >
      {/* Brand accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-tertiary" />

      <nav className="flex-1 py-4 px-2">
        {/* Header row: label + toggle */}
        <div className={`flex items-center mb-2 ${collapsed ? 'justify-center' : 'px-3 justify-between'}`}>
          {!collapsed && (
            <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-widest">
              {t('sidebar.navigation')}
            </p>
          )}
          <button
            onClick={toggle}
            aria-label={collapsed ? t('topbar.toggle_sidebar') : 'Collapse sidebar'}
            className="p-1 min-h-[28px] min-w-[28px] flex items-center justify-center rounded hover:bg-surface-container dark:hover:bg-[#1e1e2a] text-on-surface-variant dark:text-[#c8c4d4] hover:text-on-surface dark:hover:text-[#e5e1ea] transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

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
                    'w-full flex items-center min-h-[44px]',
                    'font-mono text-sm font-medium',
                    'transition-all duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed-dim-light)] focus:ring-inset',
                    collapsed ? 'justify-center px-0' : 'gap-3 px-3',
                    isActive
                      ? 'bg-primary text-on-primary border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]'
                      : 'text-on-surface-variant dark:text-[#c8c4d4] hover:bg-surface-container dark:hover:bg-[#1e1e2a] hover:text-on-surface dark:hover:text-[#e5e1ea] border-2 border-transparent',
                  ].join(' ')}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isActive && <ChevronRight size={14} />}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* System info — only when expanded */}
      {!collapsed && (
        <div className="px-4 py-4 border-t-2 border-on-surface dark:border-[#464552]">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={12} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)]" />
            <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t('sidebar.system_info')}</span>
          </div>
          <div className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">
            {t('sidebar.build')}: {new Date().toISOString().split('T')[0]}
          </div>
        </div>
      )}
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
  const { t } = useTranslation();
  const navItems = useNavItems();

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
            <span className="font-headline font-bold text-headline-sm text-on-surface dark:text-[#e5e1ea]">{t('sidebar.brand')}</span>
          </div>
          <button
            onClick={onClose}
            aria-label={t('sidebar.close_menu')}
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
