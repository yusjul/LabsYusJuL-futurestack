import { useState, useEffect } from 'react';
import { Plus, Search, Folder, Archive, FileEdit, Tag, Trash2, MoreVertical, CalendarDays } from 'lucide-react';
import { useTranslation } from '../translations';
import { useApp } from '../store/AppContext';
import { getAllProjects, getAllTasks, saveProject, deleteProject, deleteTask } from '../database/db';
import { addTombstone } from '../database/sync';
import type { Project, ProjectStatus, Task } from '../types';
import { Button } from '../components/Button';
import { Input, Select } from '../components/FormControls';
import { Modal } from '../components/Overlays';
import { EmptyState, SkeletonCard } from '../components/Feedback';
import { Dropdown } from '../components/Navigation';

// ============================================
// COLOR ACCENT SYSTEM
// ============================================
const colorMap: Record<string, { shadow: string; badge: string; icon: string }> = {
  violet: {
    shadow: 'shadow-card-violet',
    badge: 'bg-primary-container dark:bg-[var(--color-primary-container-dark)] text-on-primary-container dark:text-white',
    icon: 'bg-primary-container dark:bg-[var(--color-primary-container-dark)]',
  },
  cyan: {
    shadow: 'shadow-card-cyan',
    badge: 'bg-[#cffafe] dark:bg-[#083344] text-[#083344] dark:text-[#cffafe]',
    icon: 'bg-[#cffafe] dark:bg-[#083344]',
  },
  lime: {
    shadow: 'shadow-card-lime',
    badge: 'bg-[#ecfccb] dark:bg-[#1a2e0d] text-[#3f6212] dark:text-[#84cc16]',
    icon: 'bg-[#ecfccb] dark:bg-[#1a2e0d]',
  },
  yellow: {
    shadow: 'shadow-card-yellow',
    badge: 'bg-tertiary-fixed dark:bg-[#574500] text-on-tertiary-fixed dark:text-[#ffe086]',
    icon: 'bg-tertiary-fixed dark:bg-[#574500]',
  },
};

const priorityBadge: Record<string, string> = {
  critical: 'bg-error text-on-error border-error',
  high: 'border-[#fa7a7a] text-[#fa7a7a]',
  medium: 'border-[#eab308] text-[#eab308]',
  low: 'border-on-surface-variant text-on-surface-variant dark:border-[#777584] dark:text-[#c8c4d4]',
};

// ============================================
// DATE CATEGORY
// ============================================
function getDateCategory(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (dateDay.getTime() === today.getTime()) return 'today';
  if (dateDay.getTime() === yesterday.getTime()) return 'yesterday';

  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  if (dateDay >= monday) return 'this_week';

  const lastMonday = new Date(monday);
  lastMonday.setDate(lastMonday.getDate() - 7);

  if (dateDay >= lastMonday) return 'last_week';

  return 'older';
}

const CATEGORY_ORDER = ['today', 'yesterday', 'this_week', 'last_week', 'older'] as const;

// ============================================
// PROJECT CARD
// ============================================
function ProjectCard({ project, onEdit, onDelete, taskStats }: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  taskStats?: { total: number; done: number };
}) {
  const { t } = useTranslation();
  const { highlightQuery } = useApp();
  const colors = colorMap[project.color] || colorMap.violet;
  const total = taskStats?.total ?? project.taskCount;
  const done = taskStats?.done ?? project.completedTasks;
  const progress = total > 0 ? Math.round((done / total) * 100) : project.progress;
  const isHighlighted = highlightQuery && (
    project.name.toLowerCase().includes(highlightQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(highlightQuery.toLowerCase())
  );

  return (
    <article
      className={[
        'border-2 border-on-surface dark:border-[#a8a6ff]',
        'bg-surface dark:bg-[#1e1e2a] p-3 md:p-5 flex flex-col gap-3 md:gap-4',
        colors.shadow,
        'transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5',
        isHighlighted ? 'ring-[3px] ring-[var(--color-primary)] dark:ring-[var(--color-primary-fixed-dim-dark)] bg-primary/10 dark:bg-[var(--color-primary-fixed-dim-dark)]/10 shadow-[0_0_12px_var(--color-primary)] dark:shadow-[0_0_12px_var(--color-primary-fixed-dim-dark)] animate-pulse' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 border-2 border-on-surface dark:border-[#464552] flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
          <Folder size={18} className="text-on-surface dark:text-[#e5e1ea]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea] truncate">{project.name}</h3>
          <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] line-clamp-2 mt-0.5">{project.description}</p>
        </div>
        <Dropdown
          trigger={
            <button
              aria-label={`${t('projects.more_options')} ${project.name}`}
              className="p-1.5 hover:bg-surface-container dark:hover:bg-[#252533] border border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <MoreVertical size={14} />
            </button>
          }
          items={[
            { id: 'edit', label: t('projects.edit'), icon: <FileEdit size={14} /> },
            { id: 'archive', label: t('projects.archive'), icon: <Archive size={14} /> },
            { id: 'divider', label: '', divider: true },
            { id: 'delete', label: t('projects.delete'), icon: <Trash2 size={14} />, danger: true },
          ]}
          onSelect={id => {
            if (id === 'edit') onEdit(project);
            if (id === 'delete') onDelete(project.id);
            if (id === 'archive') onEdit({ ...project, status: 'archived' });
          }}
          align="right"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5" aria-label="Tags">
        {project.tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 border border-on-surface-variant dark:border-[#464552] text-on-surface-variant dark:text-[#c8c4d4]">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">Progress</span>
          <span className="font-mono text-xs font-bold text-on-surface dark:text-[#e5e1ea]">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-surface-container dark:bg-[#252533] border border-on-surface/30 dark:border-[#464552]">
          <div
            className="h-full bg-primary dark:bg-[var(--color-primary-fixed-dim-dark)] transition-all duration-500"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] mt-1">
          {done}/{total} tasks
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-on-surface/10 dark:border-[#464552]/50">
        <span className={`font-mono text-xs px-2 py-0.5 border ${priorityBadge[project.priority]}`}>
          {project.priority.toUpperCase()}
        </span>
        <span className={`font-mono text-xs px-2 py-0.5 rounded-sm ${colors.badge}`}>
          {project.status.toUpperCase()}
        </span>
      </div>
    </article>
  );
}

// ============================================
// PROJECT FORM MODAL
// ============================================
const defaultForm = {
  name: '', description: '', status: 'active' as ProjectStatus,
  priority: 'medium' as Project['priority'], tags: '', color: 'violet', progress: '0',
};

function ProjectModal({ open, project, onClose, onSave }: {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
  const { t } = useTranslation();
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description,
        status: project.status,
        priority: project.priority,
        tags: project.tags.join(', '),
        color: project.color,
        progress: String(project.progress),
      });
    } else {
      setForm(defaultForm);
    }
  }, [project, open]);

  function handleSubmit() {
    const now = new Date().toISOString();
    const saved: Project = {
      id: project?.id ?? `proj-${Date.now()}`,
      name: form.name,
      description: form.description,
      status: form.status,
      priority: form.priority,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      color: form.color,
      progress: Number(form.progress) || 0,
      taskCount: project?.taskCount ?? 0,
      completedTasks: project?.completedTasks ?? 0,
      createdAt: project?.createdAt ?? now,
      updatedAt: now,
    };
    onSave(saved);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project ? t('projects.edit') : t('projects.new')}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!form.name}>
            {project ? t('projects.save_changes') : t('projects.create_project')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label={t('projects.name_label')}
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder={t('projects.name_placeholder')}
        />
        <div className="flex flex-col gap-1">
          <label className="font-mono text-xs uppercase tracking-wide text-on-surface dark:text-[#e5e1ea]">{t('projects.desc_label')}</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder={t('projects.desc_placeholder')}
            className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] px-3 py-2 font-body text-body-sm shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)] resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={t('projects.status_label')}
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as ProjectStatus }))}
            options={[
              { value: 'active', label: t('projects.status_active') },
              { value: 'draft', label: t('projects.status_draft') },
              { value: 'archived', label: t('projects.status_archived') },
            ]}
          />
          <Select
            label={t('projects.priority_label')}
            value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value as Project['priority'] }))}
            options={[
              { value: 'low', label: t('projects.priority_low') },
              { value: 'medium', label: t('projects.priority_medium') },
              { value: 'high', label: t('projects.priority_high') },
              { value: 'critical', label: t('projects.priority_critical') },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={t('projects.color_label')}
            value={form.color}
            onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
            options={[
              { value: 'violet', label: t('projects.color_violet') },
              { value: 'cyan', label: t('projects.color_cyan') },
              { value: 'lime', label: t('projects.color_lime') },
              { value: 'yellow', label: t('projects.color_yellow') },
            ]}
          />
          <Input
            label={t('projects.progress_label')}
            type="number"
            min="0"
            max="100"
            value={form.progress}
            onChange={e => setForm(f => ({ ...f, progress: e.target.value }))}
          />
        </div>
        <Input
          label={t('projects.tags_label')}
          value={form.tags}
          onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
          placeholder={t('projects.tags_placeholder')}
          leftIcon={<Tag size={14} />}
        />
      </div>
    </Modal>
  );
}

// ============================================
// PROJECTS PAGE
// ============================================
export function ProjectsPage() {
  const { t } = useTranslation();
  const { addToast, showSaved, pushProjectAfterSave, deleteRemoteProject, deleteRemoteTask, bumpDataVersion, dataVersion, requireAuth } = useApp();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    Promise.all([getAllProjects(), getAllTasks()]).then(([p, t]) => {
      setProjects(p); setTasks(t); setLoading(false);
    });
  }, [dataVersion]);

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const taskStatsMap = new Map<string, { total: number; done: number }>();
  for (const t of tasks) {
    if (!t.projectId) continue;
    const prev = taskStatsMap.get(t.projectId) ?? { total: 0, done: 0 };
    taskStatsMap.set(t.projectId, { total: prev.total + 1, done: prev.done + (t.status === 'done' ? 1 : 0) });
  }

  async function handleSave(project: Project) {
    requireAuth(async () => {
      await saveProject(project);
      pushProjectAfterSave(project);
      const updated = await getAllProjects();
      setProjects(updated);
      setModalOpen(false);
      setEditingProject(null);
      showSaved();
      addToast({ message: `Project "${project.name}" saved`, type: 'success' });
    });
  }

  async function handleDelete(id: string) {
    requireAuth(async () => {
      // Hapus semua tasks dalam project ini
      const allTasks = await getAllTasks();
      const projectTasks = allTasks.filter(t => t.projectId === id);
      for (const t of projectTasks) {
        addTombstone(t.id);
        await deleteTask(t.id);
        deleteRemoteTask(t.id);
      }
      addTombstone(id);
      await deleteProject(id);
      deleteRemoteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      bumpDataVersion();
      addToast({ message: `Project + ${projectTasks.length} tasks deleted`, type: 'warning' });
    });
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setModalOpen(true);
  }

  return (
    <div className="flex-1 px-3 py-2 md:px-8 md:py-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-3 md:mb-8">
        <div>
          <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">{t('projects.title')}</h1>
          <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">
            {projects.length} {t('projects.subtitle')} · {projects.filter(p => p.status === 'active').length} active
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={14} />}
          onClick={() => requireAuth(() => { setEditingProject(null); setModalOpen(true); })}
        >
          {t('projects.new')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#c8c4d4]" />
          <input
            type="search"
            placeholder={t('projects.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label={t('projects.search_aria')}
            className="w-full pl-9 pr-4 py-2 border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea] font-body text-body-sm shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)] min-h-[44px]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['all', 'active', 'draft', 'archived'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={[
                'px-3 py-2 font-mono text-xs border-2 min-h-[44px] whitespace-nowrap transition-all duration-150',
                filterStatus === status
                  ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]'
                  : 'bg-surface dark:bg-[#1e1e2a] text-on-surface-variant dark:text-[#c8c4d4] border-on-surface dark:border-[#464552] hover:bg-surface-container dark:hover:bg-[#252533]',
              ].join(' ')}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grouped by recency */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Folder size={28} />}
          title={search ? t('projects.empty_title_search') : t('projects.empty_title')}
          description={search ? t('projects.empty_desc_search') : t('projects.empty_desc')}
          action={
            <Button variant="primary" icon={<Plus size={14} />} onClick={() => requireAuth(() => { setEditingProject(null); setModalOpen(true); })}>
              {t('projects.create')}
            </Button>
          }
        />
      ) : (
        (() => {
          const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          const grouped: Record<string, Project[]> = {};
          for (const p of sorted) {
            const cat = getDateCategory(p.createdAt);
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(p);
          }
          return CATEGORY_ORDER.map(cat => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            return (
              <section key={cat} className="mb-6 md:mb-8 last:mb-0">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <CalendarDays size={16} className="text-on-surface-variant dark:text-[#777584]" />
                  <h2 className="font-headline font-bold text-headline-sm text-on-surface dark:text-[#e5e1ea]">{t(`projects.${cat}`)}</h2>
                  <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">({items.length})</span>
                  <div className="flex-1 h-px bg-on-surface/10 dark:bg-[#464552]/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  {items.map(project => (
                    <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} taskStats={taskStatsMap.get(project.id)} />
                  ))}
                </div>
              </section>
            );
          });
        })()
      )}

      <ProjectModal
        open={modalOpen}
        project={editingProject}
        onClose={() => { setModalOpen(false); setEditingProject(null); }}
        onSave={handleSave}
      />
    </div>
  );
}
