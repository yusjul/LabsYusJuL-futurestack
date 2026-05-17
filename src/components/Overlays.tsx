import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

// ============================================
// MODAL
// ============================================
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Modal({ open, onClose, title, children, size = 'md', footer }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/30 dark:bg-black/50 backdrop-blur-sm modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={[
          'relative w-full modal-panel',
          'bg-surface dark:bg-[#1e1e2a]',
          'border-2 border-on-surface dark:border-[#a8a6ff]',
          'shadow-hard-lg dark:shadow-[8px_8px_0px_0px_#a8a6ff]',
          sizeStyles[size],
        ].join(' ')}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-on-surface dark:border-[#464552]">
            <h2 id="modal-title" className="font-headline text-headline-sm text-on-surface dark:text-[#e5e1ea]">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 hover:bg-surface-container dark:hover:bg-[#252533] transition-colors duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-fixed-dim-light)]"
            >
              <X size={18} />
            </button>
          </div>
        )}
        {/* Body */}
        <div className="px-6 py-4">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t-2 border-on-surface dark:border-[#464552] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// DRAWER
// ============================================
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

export function Drawer({ open, onClose, title, children, side = 'right', width = 'w-80' }: DrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/20 dark:bg-black/40 drawer-overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={[
          'absolute top-0 bottom-0 flex flex-col',
          'bg-surface dark:bg-[#1e1e2a]',
          'border-2 border-on-surface dark:border-[#a8a6ff]',
          side === 'right' ? 'right-0 drawer-panel' : 'left-0 drawer-panel-left',
          width,
        ].join(' ')}
        role="dialog"
        aria-modal="true"
      >
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-on-surface dark:border-[#464552]">
            <h2 className="font-headline text-headline-sm text-on-surface dark:text-[#e5e1ea]">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="p-1.5 hover:bg-surface-container dark:hover:bg-[#252533] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
