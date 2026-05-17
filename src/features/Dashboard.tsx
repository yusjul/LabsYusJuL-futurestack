import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Zap, Activity, FolderKanban, FileText, CheckSquare, Download } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAllProjects, getAllTasks, getAllNotes } from '../database/db';
import type { Project, Task, Note } from '../types';
import { SkeletonStatCard } from '../components/Feedback';
import { Button } from '../components/Button';
import { exportToJSON, exportToCSV } from '../utils/export';

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
  const { setActivePage, addToast, requireAuth } = useApp();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const [exportPos, setExportPos] = useState({ top: 0, left: 0 });

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

  useEffect(() => {
    if (!exportOpen) return;
    function handleClick(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [exportOpen]);

  function toggleExport() {
    if (!exportOpen && exportRef.current) {
      const rect = exportRef.current.getBoundingClientRect();
      setExportPos({ top: rect.bottom + 4, left: Math.max(8, rect.right - 176) });
    }
    setExportOpen(o => !o);
  }

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const statCards: StatCardData[] = [
    {
      id: 'projects',
      label: 'Active Projects',
      value: activeProjects,
      change: 12,
      changeLabel: 'this month',
      icon: FolderKanban,
      shadowColor: 'shadow-card-violet',
      bgIcon: 'bg-primary-container dark:bg-[var(--color-primary-container-dark)]',
    },
    {
      id: 'tasks',
      label: 'Total Tasks',
      value: tasks.length,
      change: 8,
      changeLabel: 'this week',
      icon: CheckSquare,
      shadowColor: 'shadow-card-cyan',
      bgIcon: 'bg-[#cffafe] dark:bg-[#083344]',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completedTasks,
      change: 24,
      changeLabel: 'this week',
      icon: Activity,
      shadowColor: 'shadow-card-lime',
      bgIcon: 'bg-[#ecfccb] dark:bg-[#1a2e0d]',
    },
    {
      id: 'notes',
      label: 'Notes',
      value: notes.length,
      change: -3,
      changeLabel: 'this week',
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
            <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] uppercase tracking-widest">System Overview</span>
          </div>
          <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-3 relative">
          <div ref={exportRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={14} />}
              onClick={toggleExport}
            >
              Export
            </Button>
            {exportOpen && (
              <div
                className="fixed z-[9999] w-44 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]"
                style={{ top: exportPos.top, left: exportPos.left }}
              >
                <button
                  onClick={() => { exportToJSON(projects, tasks, notes); setExportOpen(false); addToast({ message: 'Exported as JSON', type: 'success' }); }}
                  className="w-full text-left px-4 py-3 font-mono text-sm text-on-surface dark:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#252533] border-b border-on-surface/10 dark:border-[#464552]/50 flex items-center gap-3"
                >
                  <span className="text-xs">📄</span>
                  <div>
                    <p className="font-medium">JSON</p>
                    <p className="text-[10px] text-on-surface-variant dark:text-[#c8c4d4]">All data in one file</p>
                  </div>
                </button>
                <button
                  onClick={() => { exportToCSV(projects, tasks, notes); setExportOpen(false); addToast({ message: 'Exported as CSV (3 files)', type: 'success' }); }}
                  className="w-full text-left px-4 py-3 font-mono text-sm text-on-surface dark:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#252533] border-b border-on-surface/10 dark:border-[#464552]/50 flex items-center gap-3"
                >
                  <span className="text-xs">📊</span>
                  <div>
                    <p className="font-medium">CSV</p>
                    <p className="text-[10px] text-on-surface-variant dark:text-[#c8c4d4]">Separate files per entity</p>
                  </div>
                </button>
                <button
                  onClick={() => { window.print(); setExportOpen(false); }}
                  className="w-full text-left px-4 py-3 font-mono text-sm text-on-surface dark:text-[#e5e1ea] hover:bg-surface-container dark:hover:bg-[#252533] flex items-center gap-3"
                >
                  <span className="text-xs">🖨️</span>
                  <div>
                    <p className="font-medium">PDF</p>
                    <p className="text-[10px] text-on-surface-variant dark:text-[#c8c4d4]">A4 report, ready to print</p>
                  </div>
                </button>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<FolderKanban size={14} />}
            onClick={() => requireAuth(() => setActivePage('projects'))}
          >
            New Project
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

      {/* In-progress tasks + Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
        {/* Active Projects */}
        <section aria-label="Active projects" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Active Projects</h2>
            <button
              onClick={() => setActivePage('projects')}
              className="font-mono text-xs text-primary dark:text-[var(--color-primary-fixed-dim-dark)] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
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
            <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Recent Activity</h2>
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
          <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">Task Pipeline</h2>
          <button
            onClick={() => setActivePage('kanban')}
            className="font-mono text-xs text-primary dark:text-[var(--color-primary-fixed-dim-dark)] hover:underline flex items-center gap-1"
          >
            Open Kanban <ArrowRight size={12} />
          </button>
        </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
            {([
              { label: 'Backlog', count: tasks.filter(t => t.status === 'backlog').length, color: 'bg-on-surface-variant dark:bg-[#464552]' },
              { label: 'In Progress', count: inProgressTasks, color: 'bg-[#06b6d4]' },
              { label: 'Review', count: tasks.filter(t => t.status === 'review').length, color: 'bg-[#eab308]' },
              { label: 'Done', count: completedTasks, color: 'bg-[#84cc16]' },
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
        <p className="subtitle">Developer OS · System Report</p>
        <h1>LabsYusJuL</h1>
        <div className="divider" />
        <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="version">v1.0.0</p>
        <div className="stats-summary">
          <div className="stat-item">
            <div className="num">{activeProjects}</div>
            <div className="lbl">Active Projects</div>
          </div>
          <div className="stat-item">
            <div className="num">{tasks.length}</div>
            <div className="lbl">Total Tasks</div>
          </div>
          <div className="stat-item">
            <div className="num">{completedTasks}</div>
            <div className="lbl">Completed</div>
          </div>
          <div className="stat-item">
            <div className="num">{notes.length}</div>
            <div className="lbl">Notes</div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="print-section">
        <h2 className="print-sec-title">Executive Summary</h2>
        <p className="print-sec-desc">Current system snapshot across all workspaces.</p>
        <div className="print-summary">
          <div className="print-summary-item">
            <div className="value">{activeProjects}</div>
            <div className="label">Active Projects</div>
          </div>
          <div className="print-summary-item">
            <div className="value">{tasks.length}</div>
            <div className="label">Total Tasks</div>
          </div>
          <div className="print-summary-item">
            <div className="value">{completedTasks}</div>
            <div className="label">Completed</div>
          </div>
          <div className="print-summary-item">
            <div className="value">{inProgressTasks}</div>
            <div className="label">In Progress</div>
          </div>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="print-section">
        <h2 className="print-sec-title">Task Pipeline</h2>
        <div className="print-pipeline">
          {([
            { label: 'Backlog', count: tasks.filter(t => t.status === 'backlog').length, cls: 'print-badge-backlog' },
            { label: 'In Progress', count: inProgressTasks, cls: 'print-badge-in-progress' },
            { label: 'Review', count: tasks.filter(t => t.status === 'review').length, cls: 'print-badge-review' },
            { label: 'Done', count: completedTasks, cls: 'print-badge-done' },
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
        <h2 className="print-sec-title">Projects</h2>
        <p className="print-sec-desc">All projects sorted by status and priority.</p>
        {loading ? (
          <p className="print-sec-desc">Loading...</p>
        ) : (
          <table className="print-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Tasks</th>
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
        <h2 className="print-sec-title">Tasks</h2>
        <p className="print-sec-desc">All tasks grouped by current status.</p>
        {loading ? (
          <p className="print-sec-desc">Loading...</p>
        ) : (
          <table className="print-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Project</th>
                <th>Tags</th>
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
        <h2 className="print-sec-title">Notes</h2>
        <p className="print-sec-desc">All saved notes and documentation.</p>
        <div className="print-notes">
          {notes.map(n => (
            <div key={n.id} className="print-note">
              <h3>{n.title.replace(/^#+\s*/, '')}</h3>
              <div style={{ marginBottom: '4pt' }}>
                {n.tags.map(tag => <span key={tag} className="print-tag">{tag}</span>)}
                {n.pinned && <span className="pinned-mark">★ PINNED</span>}
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
