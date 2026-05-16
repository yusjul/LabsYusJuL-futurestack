import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary border-on-surface hover:bg-primary-dim dark:bg-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-dim-dark)]',
  secondary: 'bg-surface-container text-on-surface border-on-surface hover:bg-surface-container-high dark:bg-[#252533] dark:text-[#e5e1ea] dark:border-[#a8a6ff]',
  ghost: 'bg-transparent text-on-surface border-transparent hover:bg-surface-container dark:hover:bg-[#252533]',
  danger: 'bg-error text-on-error border-on-surface hover:bg-[#9a1414]',
  outline: 'bg-surface text-on-surface border-on-surface hover:bg-surface-container dark:bg-[#1e1e2a] dark:text-[#e5e1ea] dark:border-[#a8a6ff]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'outline',
  size = 'md',
  loading = false,
  disabled,
  icon,
  iconRight,
  fullWidth,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-mono font-medium',
        'border-2 transition-all duration-150',
        'shadow-hard active:shadow-hard-pressed active:translate-x-1 active:translate-y-1',
        'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#1b1b22] dark:hover:shadow-[6px_6px_0px_0px_#a8a6ff]',
        'focus-visible:outline-none focus-visible:border-[var(--color-primary-fixed-dim-light)] focus-visible:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)]',
        variantStyles[variant],
        sizeStyles[size],
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        fullWidth ? 'w-full' : '',
        'min-h-[44px]',
        className,
      ].join(' ')}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
