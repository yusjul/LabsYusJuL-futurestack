import { useState, useRef, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

// ============================================
// TABS
// ============================================
interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div role="tablist" className={`flex border-b-2 border-on-surface dark:border-[#a8a6ff] ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={[
            'relative flex items-center gap-2 px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider',
            'min-h-[44px] transition-all duration-150',
            'focus:outline-none focus:bg-surface-container dark:focus:bg-[#252533]',
            activeTab === tab.id
              ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)]'
              : 'text-on-surface-variant dark:text-[#c8c4d4] hover:text-on-surface dark:hover:text-[#e5e1ea]',
          ].join(' ')}
        >
          {tab.icon}
          {tab.label}
          {/* Active underline */}
          <span
            className={[
              'absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-[var(--color-primary-fixed-dim-dark)]',
              'transition-transform duration-150 origin-left',
              activeTab === tab.id ? 'scale-x-100' : 'scale-x-0',
            ].join(' ')}
          />
        </button>
      ))}
    </div>
  );
}

// ============================================
// DROPDOWN
// ============================================
interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (id: string) => void;
  align?: 'left' | 'right';
}

export function Dropdown({ trigger, items, onSelect }: DropdownProps) {
  const [menuState, setMenuState] = useState<{ top: number; right: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(() => setMenuState(null));
  closeRef.current = () => setMenuState(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) {
        closeRef.current();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!menuState) return;
    function handleReposition() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuState({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
      }
    }
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('resize', handleReposition);
    return () => {
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('resize', handleReposition);
    };
  }, [menuState]);

  return (
    <div ref={ref} className="relative inline-block">
      <div ref={triggerRef} onClick={() => {
        if (menuState) { setMenuState(null); return; }
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          setMenuState({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
        }
      }} className="cursor-pointer">
        {trigger}
      </div>
      {menuState && createPortal(
        <div ref={menuRef}
          style={{ position: 'fixed', top: menuState.top, right: menuState.right, zIndex: 9999 }}
          className="min-w-[180px] bg-surface dark:bg-[#1e1e2a] border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff] animate-[pop_150ms_ease-out]"
          role="menu"
        >
          {items.map(item => (
            item.divider ? (
              <hr key={item.id} className="border-t-2 border-on-surface dark:border-[#464552] my-1" />
            ) : (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => { onSelect(item.id); setMenuState(null); }}
                className={[
                  'w-full flex items-center gap-3 px-4 py-2.5 font-mono text-xs text-left',
                  'transition-colors duration-100 min-h-[44px]',
                  item.danger
                    ? 'text-error hover:bg-[#ffdad6] dark:hover:bg-[#3d1515]'
                    : 'text-on-surface dark:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#252533]',
                ].join(' ')}
              >
                {item.icon}
                {item.label}
              </button>
            )
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

// ============================================
// TOOLTIP
// ============================================
interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionStyles: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={[
            'absolute z-50 px-2 py-1 font-mono text-xs whitespace-nowrap pointer-events-none',
            'bg-on-surface dark:bg-[#e5e1ea] text-surface dark:text-[#1b1b22]',
            'border border-on-surface dark:border-[#e5e1ea]',
            'animate-[fadeIn_100ms_ease-out]',
            positionStyles[position],
          ].join(' ')}
        >
          {content}
        </div>
      )}
    </div>
  );
}

// ============================================
// SELECT DROPDOWN (Custom styled)
// ============================================
interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
}

export function SelectDropdown({ value, onChange, options, label, className = '' }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && <p className="font-mono text-xs uppercase tracking-wide mb-1 text-on-surface-variant dark:text-[#c8c4d4]">{label}</p>}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          'w-full flex items-center justify-between px-3 py-2 min-h-[44px]',
          'border-2 border-on-surface dark:border-[#a8a6ff]',
          'bg-surface dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea]',
          'font-mono text-sm shadow-hard-sm cursor-pointer',
          'focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)]',
        ].join(' ')}
      >
        <span>{selected?.label ?? 'Select...'}</span>
        <ChevronDown size={16} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute z-50 top-full left-0 right-0 mt-0.5 bg-surface dark:bg-[#1e1e2a] border-2 border-on-surface dark:border-[#a8a6ff] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff] animate-[pop_150ms_ease-out]"
        >
          {options.map(opt => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={[
                'w-full text-left px-3 py-2.5 font-mono text-sm min-h-[44px]',
                'transition-colors duration-100',
                opt.value === value
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface dark:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#252533]',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
