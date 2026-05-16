// ============================================
// LOADING SKELETON COMPONENTS
// ============================================

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export function Skeleton({ className = '', height = 'h-4', width = 'w-full' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton rounded ${height} ${width} ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="border-2 border-on-surface dark:border-[#464552] p-5 space-y-3 shadow-hard dark:shadow-[4px_4px_0px_0px_#464552]">
      <div className="flex items-center gap-3">
        <Skeleton height="h-10" width="w-10" />
        <div className="flex-1 space-y-2">
          <Skeleton height="h-4" width="w-2/3" />
          <Skeleton height="h-3" width="w-1/3" />
        </div>
      </div>
      <Skeleton height="h-3" />
      <Skeleton height="h-3" width="w-4/5" />
      <Skeleton height="h-3" width="w-3/5" />
      <div className="flex gap-2 mt-4">
        <Skeleton height="h-6" width="w-16" />
        <Skeleton height="h-6" width="w-20" />
      </div>
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="border-2 border-on-surface dark:border-[#464552] p-5 shadow-hard dark:shadow-[4px_4px_0px_0px_#464552]">
      <div className="flex justify-between mb-4">
        <Skeleton height="h-3" width="w-20" />
        <Skeleton height="h-8" width="w-8" />
      </div>
      <Skeleton height="h-8" width="w-24" className="mb-2" />
      <Skeleton height="h-3" width="w-32" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center p-3 border-b border-on-surface/20 dark:border-[#464552]/50">
          <Skeleton height="h-4" width="w-4" />
          <Skeleton height="h-4" width="w-48" />
          <Skeleton height="h-4" width="w-20" className="ml-auto" />
          <Skeleton height="h-4" width="w-16" />
        </div>
      ))}
    </div>
  );
}

// ============================================
// EMPTY STATE
// ============================================
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && (
        <div className="w-16 h-16 border-2 border-on-surface dark:border-[#464552] flex items-center justify-center mb-6 text-on-surface-variant dark:text-[#c8c4d4] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#464552]">
          {icon}
        </div>
      )}
      <h3 className="font-headline text-headline-sm text-on-surface dark:text-[#e5e1ea] mb-2">{title}</h3>
      {description && (
        <p className="font-body text-body-md text-on-surface-variant dark:text-[#c8c4d4] max-w-xs mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
