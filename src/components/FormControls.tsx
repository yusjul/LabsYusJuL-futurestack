import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// ============================================
// INPUT
// ============================================
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, hint, leftIcon, rightIcon, className = '', id, ...props }: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="font-mono text-xs font-medium text-on-surface dark:text-[#e5e1ea] uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          {...props}
          className={[
            'w-full border-2 bg-surface dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea]',
            'font-body text-body-md px-3 py-2 min-h-[44px]',
            'border-on-surface dark:border-[#a8a6ff]',
            'placeholder:text-on-surface-variant dark:placeholder:text-[#777584]',
            'focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-150',
            error ? 'border-[#fa7a7a] shadow-[3px_3px_0px_0px_#fa7a7a]' : 'shadow-hard-sm',
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            className,
          ].join(' ')}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p id={`${inputId}-error`} className="text-[#fa7a7a] text-xs font-mono">{error}</p>}
      {hint && !error && <p id={`${inputId}-hint`} className="text-on-surface-variant text-xs">{hint}</p>}
    </div>
  );
}

// ============================================
// TEXTAREA
// ============================================
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className = '', id, ...props }: TextareaProps) {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="font-mono text-xs font-medium text-on-surface dark:text-[#e5e1ea] uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        {...props}
        className={[
          'w-full border-2 bg-surface dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea]',
          'font-body text-body-md px-3 py-2',
          'border-on-surface dark:border-[#a8a6ff]',
          'placeholder:text-on-surface-variant dark:placeholder:text-[#777584]',
          'focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-y transition-all duration-150',
          error ? 'border-[#fa7a7a] shadow-[3px_3px_0px_0px_#fa7a7a]' : 'shadow-hard-sm',
          className,
        ].join(' ')}
        aria-invalid={!!error}
      />
      {error && <p className="text-[#fa7a7a] text-xs font-mono">{error}</p>}
      {hint && !error && <p className="text-on-surface-variant text-xs">{hint}</p>}
    </div>
  );
}

// ============================================
// SELECT
// ============================================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="font-mono text-xs font-medium text-on-surface dark:text-[#e5e1ea] uppercase tracking-wide">
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...props}
        className={[
          'w-full border-2 bg-surface dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea]',
          'font-mono text-label-mono px-3 py-2 min-h-[44px]',
          'border-on-surface dark:border-[#a8a6ff]',
          'focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'shadow-hard-sm transition-all duration-150 cursor-pointer',
          error ? 'border-[#fa7a7a]' : '',
          className,
        ].join(' ')}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-[#fa7a7a] text-xs font-mono">{error}</p>}
    </div>
  );
}
