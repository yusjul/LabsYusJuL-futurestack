import { useApp } from '../store/AppContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { Toast } from '../types';

const toastConfig = {
  success: { icon: CheckCircle, borderColor: 'border-[#84cc16]', shadowColor: 'shadow-[4px_4px_0px_0px_#84cc16]' },
  error: { icon: AlertCircle, borderColor: 'border-[#fa7a7a]', shadowColor: 'shadow-[4px_4px_0px_0px_#fa7a7a]' },
  info: { icon: Info, borderColor: 'border-primary dark:border-[var(--color-primary-fixed-dim-dark)]', shadowColor: 'shadow-hard' },
  warning: { icon: AlertTriangle, borderColor: 'border-[#eab308]', shadowColor: 'shadow-[4px_4px_0px_0px_#eab308]' },
};

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useApp();
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        'toast-enter flex items-start gap-3 px-4 py-3 min-w-[280px] max-w-sm',
        'bg-surface dark:bg-[#1e1e2a]',
        'border-2', config.borderColor, config.shadowColor,
      ].join(' ')}
    >
      <Icon size={18} className="flex-shrink-0 mt-0.5" />
      <p className="flex-1 font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        className="flex-shrink-0 p-0.5 hover:opacity-70 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
