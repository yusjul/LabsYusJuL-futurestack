import { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Pin, Search, Trash2, Tag, Clock, FileText } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { getAllNotes, saveNote, deleteNote } from '../database/db';
import type { Note } from '../types';
import { Button } from '../components/Button';
import { EmptyState } from '../components/Feedback';
import { Modal } from '../components/Overlays';
import DOMPurify from 'dompurify';

// ============================================
// NOTE CARD
// ============================================
function NoteCard({ note, active, onClick, onDelete, onPin }: {
  note: Note;
  active: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
  onPin: (note: Note) => void;
}) {
  const preview = note.content.replace(/[#*`\[\]]/g, '').slice(0, 120);

  return (
    <article
      className={[
        'border-2 p-4 cursor-pointer transition-all duration-150',
        'group',
        active
          ? 'border-primary dark:border-[var(--color-primary-fixed-dim-dark)] bg-primary-fixed/20 dark:bg-[var(--color-primary-container-dark)]/20 shadow-hard-violet'
          : 'border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff] hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[4px_4px_0px_0px_#a8a6ff]',
      ].join(' ')}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-pressed={active}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-headline font-semibold text-sm text-on-surface dark:text-[#e5e1ea] line-clamp-1 flex-1">{note.title}</h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => { e.stopPropagation(); onPin(note); }}
            aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
            className="p-1 hover:bg-surface-container dark:hover:bg-[#252533] min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            <Pin size={12} className={note.pinned ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)] fill-current' : ''} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(note.id); }}
            aria-label="Delete note"
            className="p-1 hover:bg-[#ffdad6] dark:hover:bg-[#3d1515] min-h-[32px] min-w-[32px] flex items-center justify-center"
          >
            <Trash2 size={12} className="text-error" />
          </button>
        </div>
      </div>

      <p className="font-body text-xs text-on-surface-variant dark:text-[#777584] line-clamp-3 mb-3">{preview}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map(tag => (
            <span key={tag} className="flex items-center gap-0.5 font-mono text-[10px] px-1.5 py-0.5 border border-on-surface-variant/40 dark:border-[#464552] text-on-surface-variant dark:text-[#777584]">
              <Tag size={8} />
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 font-mono text-[10px] text-on-surface-variant dark:text-[#464552]">
          <Clock size={8} />
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {note.pinned && (
        <div className="mt-2">
          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-primary text-on-primary">PINNED</span>
        </div>
      )}
    </article>
  );
}

// ============================================
// MARKDOWN RENDERER (Simple)
// ============================================
function MarkdownView({ content }: { content: string }) {
  const html = content
    .replace(/^### (.+)$/gm, '<h3 class="font-headline text-headline-sm text-on-surface dark:text-[#e5e1ea] mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-headline text-headline-sm text-on-surface dark:text-[#e5e1ea] mt-6 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-headline text-headline-md text-on-surface dark:text-[#e5e1ea] mt-0 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="font-mono text-xs bg-surface-container dark:bg-[#252533] px-1.5 py-0.5 border border-on-surface/20 dark:border-[#464552]">$1</code>')
    .replace(/```[\s\S]*?```/g, match => {
      const code = match.replace(/```[\w]*\n?/, '').replace(/```$/, '');
      return `<pre class="font-mono text-xs bg-surface-container dark:bg-[#252533] p-4 border-2 border-on-surface dark:border-[#464552] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#464552] overflow-x-auto my-3">${code}</pre>`;
    })
    .replace(/^- \[x\] (.+)$/gm, '<li class="flex items-start gap-2 mb-1"><span class="mt-0.5 text-[#84cc16]">✓</span><span class="line-through text-on-surface-variant dark:text-[#777584]">$1</span></li>')
    .replace(/^- \[ \] (.+)$/gm, '<li class="flex items-start gap-2 mb-1"><span class="mt-0.5 text-on-surface-variant dark:text-[#464552]">○</span><span>$1</span></li>')
    .replace(/^- (.+)$/gm, '<li class="mb-1 pl-4 relative before:absolute before:left-0 before:content-[\'·\']">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/^(?!<[h|l|p|c|u|o|p])/gm, '');

  return (
    <div
      className="prose prose-sm max-w-none font-body text-body-md text-on-surface dark:text-[#e5e1ea] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<p class="mb-3">${html}</p>`) }}
    />
  );
}

// ============================================
// NOTES PAGE
// ============================================
export function NotesPage() {
  const { addToast, showSaved, dataVersion } = useApp();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getAllNotes().then(n => {
      const sorted = [...n].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
      setNotes(sorted);
      if (sorted.length > 0) setActiveNote(sorted[0]);
      setLoading(false);
    });
  }, [dataVersion]);

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  async function handleSave(note: Note) {
    await saveNote(note);
    const updated = await getAllNotes();
    const sorted = [...updated].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    setNotes(sorted);
    setActiveNote(note);
    showSaved();
  }

  const autoSave = useCallback((note: Note) => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSave(note);
    }, 1200);
  }, []);

  function handleContentChange(value: string) {
    setEditContent(value);
    if (!activeNote) return;
    const updated: Note = {
      ...activeNote,
      title: editTitle,
      content: value,
      updatedAt: new Date().toISOString(),
    };
    autoSave(updated);
  }

  function handleTitleChange(value: string) {
    setEditTitle(value);
    if (!activeNote) return;
    const updated: Note = {
      ...activeNote,
      title: value,
      content: editContent,
      updatedAt: new Date().toISOString(),
    };
    autoSave(updated);
  }

  async function createNote() {
    const now = new Date().toISOString();
    const note: Note = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: '# New Note\n\nStart writing...',
      tags: [],
      pinned: false,
      createdAt: now,
      updatedAt: now,
    };
    await handleSave(note);
    setActiveNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(true);
  }

  async function handlePin(note: Note) {
    const updated = { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() };
    await handleSave(updated);
    addToast({ message: updated.pinned ? 'Note pinned' : 'Note unpinned', type: 'info' });
  }

  async function confirmDelete() {
    if (!noteToDelete) return;
    await deleteNote(noteToDelete);
    const updated = notes.filter(n => n.id !== noteToDelete);
    setNotes(updated);
    if (activeNote?.id === noteToDelete) {
      setActiveNote(updated[0] ?? null);
    }
    setDeleteModalOpen(false);
    setNoteToDelete(null);
    addToast({ message: 'Note deleted', type: 'info' });
  }

  return (
    <div className="flex-1 flex overflow-hidden min-h-0">
      {/* Note list sidebar */}
      <aside
        className={[
          'border-r-2 border-on-surface dark:border-[#a8a6ff]',
          'bg-surface dark:bg-[#12121a]',
          'flex flex-col overflow-hidden',
          activeNote && !isEditing ? 'hidden md:flex md:w-80 lg:w-96' : '',
          !activeNote ? 'flex w-full md:w-80 lg:w-96' : 'flex w-full md:w-80 lg:w-96',
          activeNote ? 'hidden sm:flex sm:w-72 md:w-80' : 'flex w-full',
        ].join(' ')}
        aria-label="Notes list"
      >
        {/* Search */}
        <div className="p-4 border-b-2 border-on-surface dark:border-[#464552] flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#777584]" />
            <input
              type="search"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search notes"
              className="w-full pl-9 pr-3 py-2 border-2 border-on-surface dark:border-[#464552] bg-surface-container dark:bg-[#1e1e2a] text-on-surface dark:text-[#e5e1ea] font-body text-body-sm focus:outline-none focus:border-[var(--color-primary-fixed-dim-light)] min-h-[44px]"
            />
          </div>
          <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={createNote} aria-label="New note">
            <span className="hidden sm:inline">New</span>
          </Button>
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-2 border-on-surface dark:border-[#464552] p-4 space-y-2 shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#464552]">
                <div className="h-4 skeleton w-2/3" />
                <div className="h-3 skeleton" />
                <div className="h-3 skeleton w-3/4" />
              </div>
            ))
          ) : filteredNotes.length === 0 ? (
            <EmptyState
              icon={<FileText size={24} />}
              title="No notes found"
              description={search ? 'Try a different search.' : 'Create your first note.'}
              action={<Button variant="primary" size="sm" onClick={createNote}>+ New Note</Button>}
            />
          ) : (
            filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                active={activeNote?.id === note.id}
                onClick={() => { setActiveNote(note); setIsEditing(false); }}
                onDelete={id => { setNoteToDelete(id); setDeleteModalOpen(true); }}
                onPin={handlePin}
              />
            ))
          )}
        </div>
      </aside>

      {/* Note editor / viewer — full width on mobile */}
      <main className="flex-1 flex flex-col overflow-hidden bg-surface dark:bg-[#1e1e2a] w-full">
        {activeNote ? (
          <>
            {/* Editor toolbar */}
            <div className="flex items-center justify-between px-6 py-3 border-b-2 border-on-surface dark:border-[#464552] gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {/* Back button mobile */}
                <button
                  className="sm:hidden p-2 border-2 border-on-surface dark:border-[#a8a6ff] mr-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  onClick={() => setActiveNote(null)}
                  aria-label="Back to notes"
                >
                  ←
                </button>
                {isEditing ? (
                  <input
                    value={editTitle}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="font-headline font-bold text-headline-sm text-on-surface dark:text-[#e5e1ea] bg-transparent border-b-2 border-[var(--color-primary-fixed-dim-light)] w-full max-w-md focus:outline-none"
                    aria-label="Note title"
                  />
                ) : (
                  <h1 className="font-headline font-bold text-headline-sm text-on-surface dark:text-[#e5e1ea] truncate">{activeNote.title}</h1>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant={isEditing ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      const updated = { ...activeNote, title: editTitle, content: editContent, updatedAt: new Date().toISOString() };
                      handleSave(updated);
                      addToast({ message: 'Note saved', type: 'success' });
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handlePin(activeNote)} aria-label={activeNote.pinned ? 'Unpin' : 'Pin'}>
                  <Pin size={14} className={activeNote.pinned ? 'fill-current text-primary dark:text-[var(--color-primary-fixed-dim-dark)]' : ''} />
                </Button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={e => handleContentChange(e.target.value)}
                  className="w-full h-full p-6 font-mono text-sm text-on-surface dark:text-[#e5e1ea] bg-surface dark:bg-[#1e1e2a] resize-none focus:outline-none leading-relaxed"
                  placeholder="Write your note in Markdown..."
                  aria-label="Note content editor"
                />
              ) : (
                <div className="p-6 max-w-4xl">
                  <MarkdownView content={activeNote.content} />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-2 border-t border-on-surface/10 dark:border-[#464552]/50 flex-shrink-0">
              <div className="flex gap-1 flex-wrap">
                {activeNote.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] px-1.5 py-0.5 border border-on-surface-variant/40 dark:border-[#464552] text-on-surface-variant dark:text-[#777584]">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs text-on-surface-variant dark:text-[#464552]">
                {new Date(activeNote.updatedAt).toLocaleString()}
              </span>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={<FileText size={32} />}
              title="Select a note"
              description="Choose a note from the list or create a new one."
              action={<Button variant="primary" onClick={createNote} icon={<Plus size={14} />}>New Note</Button>}
            />
          </div>
        )}
      </main>

      {/* Delete confirmation */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Note?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
          </>
        }
      >
        <p className="font-body text-body-md text-on-surface dark:text-[#e5e1ea]">This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
