import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Zap, Activity, FolderKanban, FileText, CheckSquare } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAllProjects, getAllTasks, getAllNotes } from '../database/db';
import type { Project, Task, Note } from '../types';
import { SkeletonStatCard, EmptyState } from '../components/Feedback';
import { Button } from '../components/Button';
import { useTranslation } from '../translations';

// ============================================
// STAT CARD
// ============================================
interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: typeof TrendingUp;
  shadowColor: string;
  bgIcon: string;
}

function StatCard({ data }: { data: StatCardData }) {
  const Icon = data.icon;
  const isPositive = data.change >= 0;

  return (
    <article
      className={`border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] p-3 md:p-5 ${data.shadowColor} transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 group`}
    >
      <div className="flex items-start justify-between mb-1 md:mb-3">
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant dark:text-[#c8c4d4]">{data.label}</p>
        <div className={`w-7 h-7 md:w-9 md:h-9 border-2 border-on-surface dark:border-[#464552] flex items-center justify-center ${data.bgIcon}`}>
          <Icon size={12} className="md:inline text-on-surface dark:text-[#e5e1ea]" />
        </div>
      </div>
      <p className="font-headline font-bold text-xl md:text-[2rem] leading-none text-on-surface dark:text-[#e5e1ea] mb-1 md:mb-2">{data.value}</p>
      <div className="flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp size={12} className="text-[#84cc16]" />
        ) : (
          <TrendingDown size={12} className="text-[#fa7a7a]" />
        )}
        <span className={`font-mono text-xs ${isPositive ? 'text-[#84cc16]' : 'text-[#fa7a7a]'}`}>
          {isPositive ? '+' : ''}{data.change}%
        </span>
        <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{data.changeLabel}</span>
      </div>
    </article>
  );
}

// ============================================
// ACTIVITY ITEM
// ============================================
function ActivityItem({ title, meta, type }: { title: string; meta: string; type: string }) {
  const typeConfig: Record<string, { color: string; label: string }> = {
    project: { color: 'bg-primary', label: 'PROJECT' },
    task: { color: 'bg-[#06b6d4]', label: 'TASK' },
    note: { color: 'bg-[#84cc16]', label: 'NOTE' },
  };
  const cfg = typeConfig[type] || typeConfig.task;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-on-surface/10 dark:border-[#464552]/50 last:border-0">
      <div className={`w-2 h-2 mt-1.5 rounded-full ${cfg.color} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea] truncate">{title}</p>
        <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] mt-0.5">{meta}</p>
      </div>
      <span className={`font-mono text-[10px] px-1.5 py-0.5 border border-on-surface dark:border-[#464552] text-on-surface-variant dark:text-[#c8c4d4]`}>{cfg.label}</span>
    </div>
  );
}

// ============================================
// PROJECT MINI CARD
// ============================================
function ProjectMini({ project }: { project: Project }) {
  const colorMap: Record<string, string> = {
    violet: 'shadow-card-violet',
    cyan: 'shadow-card-cyan',
    lime: 'shadow-card-lime',
    yellow: 'shadow-card-yellow',
  };
  const progressColor: Record<string, string> = {
    violet: 'bg-primary',
    cyan: 'bg-[#06b6d4]',
    lime: 'bg-[#84cc16]',
    yellow: 'bg-[#eab308]',
  };

  const { setActivePage } = useApp();

  return (
    <article
      className={`border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] p-4 ${colorMap[project.color] || 'shadow-hard'} cursor-pointer hover:-translate-y-0.5 transition-transform duration-150`}
      onClick={() => setActivePage('projects')}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setActivePage('projects')}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-headline font-semibold text-sm text-on-surface dark:text-[#e5e1ea]">{project.name}</p>
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] uppercase">{project.status}</span>
        </div>
        <span className="font-mono text-xs text-on-surface dark:text-[#e5e1ea] font-bold">{project.progress}%</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-2 bg-surface-container dark:bg-[#252533] border border-on-surface dark:border-[#464552]">
        <div
          className={`h-full ${progressColor[project.color] || 'bg-primary'} transition-all duration-500`}
          style={{ width: `${project.progress}%` }}
          role="progressbar"
          aria-valuenow={project.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${project.name} progress: ${project.progress}%`}
        />
      </div>
      <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] mt-2">
        {project.completedTasks}/{project.taskCount} tasks
      </p>
    </article>
  );
}

// ============================================
// DASHBOARD PAGE
// ============================================
export function DashboardPage() {
  const { t } = useTranslation();
  const { setActivePage, requireAuth } = useApp();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [p, t, n] = await Promise.all([getAllProjects(), getAllTasks(), getAllNotes()]);
      setProjects(p);
      setTasks(t);
      setNotes(n);
      setLoading(false);
    }
    load();
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const statCards: StatCardData[] = [
    {
      id: 'projects',
      label: t('dashboard.stat_active_projects'),
      value: activeProjects,
      change: 12,
      changeLabel: t('dashboard.stat_this_month'),
      icon: FolderKanban,
      shadowColor: 'shadow-card-violet',
      bgIcon: 'bg-primary-container dark:bg-[var(--color-primary-container-dark)]',
    },
    {
      id: 'tasks',
      label: t('dashboard.stat_total_tasks'),
      value: tasks.length,
      change: 8,
      changeLabel: t('dashboard.stat_this_week'),
      icon: CheckSquare,
      shadowColor: 'shadow-card-cyan',
      bgIcon: 'bg-[#cffafe] dark:bg-[#083344]',
    },
    {
      id: 'completed',
      label: t('dashboard.stat_completed'),
      value: completedTasks,
      change: 24,
      changeLabel: t('dashboard.stat_this_week'),
      icon: Activity,
      shadowColor: 'shadow-card-lime',
      bgIcon: 'bg-[#ecfccb] dark:bg-[#1a2e0d]',
    },
    {
      id: 'notes',
      label: t('dashboard.stat_notes'),
      value: notes.length,
      change: -3,
      changeLabel: t('dashboard.stat_this_week'),
      icon: FileText,
      shadowColor: 'shadow-card-yellow',
      bgIcon: 'bg-tertiary-fixed dark:bg-[#574500]',
    },
  ];

  return (
    <>
    <div className="flex-1 px-3 py-2 md:px-8 md:py-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3 md:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-primary dark:text-[var(--color-primary-fixed-dim-dark)]" />
            <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-widest">{t('dashboard.badge')}</span>
          </div>
          <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">
            {t('dashboard.title')}
          </h1>
        </div>
        <div className="flex gap-3 relative">
          <Button
            variant="primary"
            size="sm"
            icon={<FolderKanban size={14} />}
            onClick={() => requireAuth(() => setActivePage('projects'))}
          >
            {t('dashboard.new_project')}
          </Button>
        </div>
      </div>

      {/* Stat Cards — 2 col mobile, 4 col desktop */}
      <section aria-label="Key metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
          : statCards.map(card => <StatCard key={card.id} data={card} />)
        }
      </section>

      {/* Empty state for fresh start */}
      {!loading && projects.length === 0 && tasks.length === 0 && notes.length === 0 && (
        <EmptyState
          icon={<Zap size={24} />}
          title={t('dashboard.empty_title')}
          description={t('dashboard.empty_desc')}
          action={
            <div className="flex gap-3">
              <Button variant="primary" icon={<FolderKanban size={14} />} onClick={() => setActivePage('projects')}>
                {t('dashboard.empty_action_project')}
              </Button>
              <Button variant="outline" icon={<FileText size={14} />} onClick={() => setActivePage('settings')}>
                {t('dashboard.empty_action_docs')}
              </Button>
            </div>
          }
        />
      )}

      {/* In-progress tasks + Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
        {/* Active Projects */}
        <section aria-label="Active projects" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">{t('dashboard.active_projects')}</h2>
            <button
              onClick={() => setActivePage('projects')}
              className="font-mono text-xs text-primary dark:text-[var(--color-primary-fixed-dim-dark)] hover:underline flex items-center gap-1"
            >
              {t('dashboard.view_all')} <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border-2 border-on-surface dark:border-[#464552] p-4 shadow-hard dark:shadow-[4px_4px_0px_0px_#464552]">
                    <div className="h-4 skeleton mb-3 w-2/3" />
                    <div className="h-2 skeleton mb-2" />
                    <div className="h-3 skeleton w-1/3" />
                  </div>
                ))
              : projects.filter(p => p.status === 'active').slice(0, 4).map(p => (
                  <ProjectMini key={p.id} project={p} />
                ))
            }
          </div>
        </section>

        {/* Recent activity */}
        <section aria-label="Recent activity" className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]">
          <div className="px-3 md:px-5 py-2 md:py-4 border-b-2 border-on-surface dark:border-[#464552] flex items-center justify-between">
            <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">{t('dashboard.recent_activity')}</h2>
            <Activity size={14} className="text-on-surface-variant dark:text-[#c8c4d4]" />
          </div>
          <div className="px-3 md:px-5 py-2">
            {loading ? (
              <div className="space-y-2 py-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 skeleton rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 skeleton" />
                      <div className="h-2 skeleton w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {projects.slice(0, 2).map(p => (
                  <ActivityItem key={`p-${p.id}`} title={p.name} meta={`Updated · ${p.status}`} type="project" />
                ))}
                {tasks.slice(0, 3).map(t => (
                  <ActivityItem key={`t-${t.id}`} title={t.title} meta={`${t.status} · ${t.priority}`} type="task" />
                ))}
                {notes.slice(0, 2).map(n => (
                  <ActivityItem key={`n-${n.id}`} title={n.title} meta="Note updated" type="note" />
                ))}
              </>
            )}
          </div>
        </section>
      </div>

      {/* Task progress bar section */}
      <section
        aria-label="Task progress"
        className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] p-3 md:p-5 shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-3 mb-3 md:mb-5">
          <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">{t('dashboard.task_pipeline')}</h2>
          <button
            onClick={() => setActivePage('kanban')}
            className="font-mono text-xs text-primary dark:text-[var(--color-primary-fixed-dim-dark)] hover:underline flex items-center gap-1"
          >
            {t('dashboard.open_kanban')} <ArrowRight size={12} />
          </button>
        </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {([
              { label: t('dashboard.backlog'), count: tasks.filter(t => t.status === 'backlog').length, color: 'bg-on-surface-variant dark:bg-[#464552]' },
              { label: t('dashboard.in_progress'), count: inProgressTasks, color: 'bg-[#06b6d4]' },
              { label: t('dashboard.review'), count: tasks.filter(t => t.status === 'review').length, color: 'bg-[#eab308]' },
              { label: t('dashboard.done'), count: completedTasks, color: 'bg-[#84cc16]' },
            ] as const).map(col => (
              <div key={col.label} className="text-center p-2 md:p-3 border border-on-surface/20 dark:border-[#464552]">
                <div className={`w-6 h-6 md:w-8 md:h-8 ${col.color} mx-auto mb-1 md:mb-2 flex items-center justify-center border border-on-surface dark:border-[#464552]`}>
                  <span className="font-mono text-xs md:text-sm font-bold text-white dark:text-[#12121a]">{col.count}</span>
                </div>
                <p className="font-mono text-[10px] md:text-xs text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-wide">{col.label}</p>
              </div>
            ))}
        </div>
      </section>
    </div>

    {/* ============================================
        PRINT-ONLY: PDF Report Cover + Data
        ============================================ */}
    <div className="print-only" aria-hidden="true">
      {/* COVER PAGE */}
      <div className="print-cover">
        <p className="subtitle">{t('dashboard.print_subtitle')}</p>
        <h1>{t('dashboard.print_brand')}</h1>
        <div className="divider" />
        <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="version">{t('dashboard.print_version')}</p>
        <div className="stats-summary">
          <div className="stat-item">
            <div className="num">{activeProjects}</div>
            <div className="lbl">{t('dashboard.stat_active_projects')}</div>
          </div>
          <div className="stat-item">
            <div className="num">{tasks.length}</div>
            <div className="lbl">{t('dashboard.stat_total_tasks')}</div>
          </div>
          <div className="stat-item">
            <div className="num">{completedTasks}</div>
            <div className="lbl">{t('dashboard.stat_completed')}</div>
          </div>
          <div className="stat-item">
            <div className="num">{notes.length}</div>
            <div className="lbl">{t('dashboard.stat_notes')}</div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="print-section">
        <h2 className="print-sec-title">{t('dashboard.print_exec_summary')}</h2>
        <p className="print-sec-desc">{t('dashboard.print_exec_desc')}</p>
        <div className="print-summary">
          <div className="print-summary-item">
            <div className="value">{activeProjects}</div>
            <div className="label">{t('dashboard.stat_active_projects')}</div>
          </div>
          <div className="print-summary-item">
            <div className="value">{tasks.length}</div>
            <div className="label">{t('dashboard.stat_total_tasks')}</div>
          </div>
          <div className="print-summary-item">
            <div className="value">{completedTasks}</div>
            <div className="label">{t('dashboard.stat_completed')}</div>
          </div>
          <div className="print-summary-item">
            <div className="value">{inProgressTasks}</div>
            <div className="label">{t('dashboard.in_progress')}</div>
          </div>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="print-section">
        <h2 className="print-sec-title">{t('dashboard.task_pipeline')}</h2>
        <div className="print-pipeline">
          {([
            { label: t('dashboard.backlog'), count: tasks.filter(t => t.status === 'backlog').length, cls: 'print-badge-backlog' },
            { label: t('dashboard.in_progress'), count: inProgressTasks, cls: 'print-badge-in-progress' },
            { label: t('dashboard.review'), count: tasks.filter(t => t.status === 'review').length, cls: 'print-badge-review' },
            { label: t('dashboard.done'), count: completedTasks, cls: 'print-badge-done' },
          ] as const).map(col => (
            <div key={col.label} className="print-pipeline-item">
              <div className="count">{col.count}</div>
              <div className="label">{col.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS TABLE */}
      <div className="print-section page-break">
        <h2 className="print-sec-title">{t('dashboard.print_section_projects')}</h2>
        <p className="print-sec-desc">{t('dashboard.print_section_projects_desc')}</p>
        {loading ? (
          <p className="print-sec-desc">{t('common.loading_ellipsis')}</p>
        ) : (
          <table className="print-table">
            <thead>
              <tr>
                <th>{t('dashboard.print_name')}</th>
                <th>{t('dashboard.print_status')}</th>
                <th>{t('dashboard.print_priority')}</th>
                <th>{t('dashboard.print_progress')}</th>
                <th>{t('dashboard.tasks_label')}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td><span className={`print-badge print-badge-${p.status}`}>{p.status}</span></td>
                  <td><span className={`print-badge print-badge-${p.priority}`}>{p.priority}</span></td>
                  <td>
                    <div className="print-progress-bar">
                      <span className="print-progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                    <div className="print-progress-text">{p.progress}%</div>
                  </td>
                  <td>{p.completedTasks}/{p.taskCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* TASKS TABLE */}
      <div className="print-section page-break">
        <h2 className="print-sec-title">{t('dashboard.print_section_tasks')}</h2>
        <p className="print-sec-desc">{t('dashboard.print_section_tasks_desc')}</p>
        {loading ? (
          <p className="print-sec-desc">{t('common.loading_ellipsis')}</p>
        ) : (
          <table className="print-table">
            <thead>
              <tr>
                <th>{t('dashboard.print_title')}</th>
                <th>{t('dashboard.print_status')}</th>
                <th>{t('dashboard.print_priority')}</th>
                <th>{t('dashboard.print_project')}</th>
                <th>{t('dashboard.print_tags')}</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => {
                const project = projects.find(p => p.id === t.projectId);
                return (
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td><span className={`print-badge print-badge-${t.status}`}>{t.status}</span></td>
                    <td><span className={`print-badge print-badge-${t.priority}`}>{t.priority}</span></td>
                    <td style={{ color: '#666', fontSize: '7.5pt' }}>{project?.name || '—'}</td>
                    <td>{t.tags.map(tag => <span key={tag} className="print-tag">{tag}</span>)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* NOTES */}
      <div className="print-section page-break">
        <h2 className="print-sec-title">{t('dashboard.print_section_notes')}</h2>
        <p className="print-sec-desc">{t('dashboard.print_section_notes_desc')}</p>
        <div className="print-notes">
          {notes.map(n => (
            <div key={n.id} className="print-note">
              <h3>{n.title.replace(/^#+\s*/, '')}</h3>
              <div style={{ marginBottom: '4pt' }}>
                {n.tags.map(tag => <span key={tag} className="print-tag">{tag}</span>)}
                {n.pinned && <span className="pinned-mark">★ {t('dashboard.print_pinned')}</span>}
              </div>
              <p>
                {n.content
                  .replace(/^#+\s.*$/gm, '')
                  .replace(/[`*_\[\]]/g, '')
                  .replace(/\n{2,}/g, '\n')
                  .split('\n')
                  .slice(0, 6)
                  .filter(Boolean)
                  .join(' ')
                  .slice(0, 200)}
                {n.content.length > 200 ? '…' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="print-footer">
        <span>LabsYusJuL Report · Generated {new Date().toISOString().slice(0, 10)} · Page </span>
        <span className="page-number" />
      </div>
    </div>
    </>
  );
}
