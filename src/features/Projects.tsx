import { useState, useEffect } from 'react';
import { Plus, Search, Folder, Archive, FileEdit, Tag, Trash2, MoreVertical } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAllProjects, saveProject, deleteProject } from '../database/db';
import type { Project, ProjectStatus } from '../types';
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
  low: 'border-on-surface-variant text-on-surface-variant dark:border-[#777584] dark:text-[#777584]',
};

// ============================================
// PROJECT CARD
// ============================================
function ProjectCard({ project, onEdit, onDelete }: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  const colors = colorMap[project.color] || colorMap.violet;

  return (
    <article
      className={[
        'border-2 border-on-surface dark:border-[#a8a6ff]',
        'bg-surface dark:bg-[#1e1e2a] p-3 md:p-5 flex flex-col gap-3 md:gap-4',
        colors.shadow,
        'transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 border-2 border-on-surface dark:border-[#464552] flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
          <Folder size={18} className="text-on-surface dark:text-[#e5e1ea]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea] truncate">{project.name}</h3>
          <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] line-clamp-2 mt-0.5">{project.description}</p>
        </div>
        <Dropdown
          trigger={
            <button
              aria-label={`More options for ${project.name}`}
              className="p-1.5 hover:bg-surface-container dark:hover:bg-[#252533] border border-transparent hover:border-on-surface dark:hover:border-[#464552] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <MoreVertical size={14} />
            </button>
          }
          items={[
            { id: 'edit', label: 'Edit Project', icon: <FileEdit size={14} /> },
            { id: 'archive', label: 'Archive', icon: <Archive size={14} /> },
            { id: 'divider', label: '', divider: true },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={14} />, danger: true },
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
          <span key={tag} className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 border border-on-surface-variant dark:border-[#464552] text-on-surface-variant dark:text-[#777584]">
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">Progress</span>
          <span className="font-mono text-xs font-bold text-on-surface dark:text-[#e5e1ea]">{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-surface-container dark:bg-[#252533] border border-on-surface/30 dark:border-[#464552]">
          <div
            className="h-full bg-primary dark:bg-[var(--color-primary-fixed-dim-dark)] transition-all duration-500"
            style={{ width: `${project.progress}%` }}
            role="progressbar"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] mt-1">
          {project.completedTasks}/{project.taskCount} tasks
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
      title={project ? 'Edit Project' : 'New Project'}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!form.name}>
            {project ? 'Save Changes' : 'Create Project'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Project Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="My Awesome Project"
        />
        <div className="flex flex-col gap-1">
          <label className="font-mono text-xs uppercase tracking-wide text-on-surface dark:text-[#e5e1ea]">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={3}
            placeholder="What does this project do?"
            className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] text-on-surface dark:text-[#e5e1ea] px-3 py-2 font-body text-body-sm shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] focus:shadow-[3px_3px_0px_0px_var(--color-primary-fixed-dim-light)] resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as ProjectStatus }))}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
          <Select
            label="Priority"
            value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value as Project['priority'] }))}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'critical', label: 'Critical' },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Color"
            value={form.color}
            onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
            options={[
              { value: 'violet', label: 'Violet' },
              { value: 'cyan', label: 'Cyan' },
              { value: 'lime', label: 'Lime' },
              { value: 'yellow', label: 'Yellow' },
            ]}
          />
          <Input
            label="Progress %"
            type="number"
            min="0"
            max="100"
            value={form.progress}
            onChange={e => setForm(f => ({ ...f, progress: e.target.value }))}
          />
        </div>
        <Input
          label="Tags (comma separated)"
          value={form.tags}
          onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
          placeholder="react, typescript, vite"
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
  const { addToast, showSaved, pushProjectAfterSave, deleteRemoteProject } = useApp();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    getAllProjects().then(p => { setProjects(p); setLoading(false); });
  }, []);

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  async function handleSave(project: Project) {
    await saveProject(project);
    pushProjectAfterSave(project);
    const updated = await getAllProjects();
    setProjects(updated);
    setModalOpen(false);
    setEditingProject(null);
    showSaved();
    addToast({ message: `Project "${project.name}" saved`, type: 'success' });
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    deleteRemoteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast({ message: 'Project deleted', type: 'info' });
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
          <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">Projects</h1>
          <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] mt-1">
            {projects.length} total · {projects.filter(p => p.status === 'active').length} active
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={14} />}
          onClick={() => { setEditingProject(null); setModalOpen(true); }}
        >
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search projects"
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
                  : 'bg-surface dark:bg-[#1e1e2a] text-on-surface-variant dark:text-[#777584] border-on-surface dark:border-[#464552] hover:bg-surface-container dark:hover:bg-[#252533]',
              ].join(' ')}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Folder size={28} />}
          title={search ? 'No projects found' : 'No projects yet'}
          description={search ? 'Try a different search term.' : 'Create your first project to get started.'}
          action={
            <Button variant="primary" icon={<Plus size={14} />} onClick={() => { setEditingProject(null); setModalOpen(true); }}>
              Create Project
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
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
