import { useState } from 'react';
import { User, Palette, Bell, Database, Zap, Shield, Sun, Moon, RefreshCw, Cloud, CloudOff, LogOut, CheckCircle, BookOpen, FileText, ChevronDown, FolderKanban, CheckSquare, Activity, BarChart3, MessageSquare, Columns3, Trash2, Download, Sprout } from 'lucide-react';
import { useTranslation } from '../translations';
import { useApp } from '../store/AppContext';
import { Input } from '../components/FormControls';
import { Button } from '../components/Button';
import { seedDatabase, getAllProjects, getAllTasks, getAllNotes } from '../database/db';
import { exportToJSON } from '../utils/export';

// ============================================
// SETTINGS SECTION WRAPPER
// ============================================
function SettingsSection({ title, description, children }: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]">
      <div className="px-6 py-4 border-b-2 border-on-surface dark:border-[#464552]">
        <h2 className="font-headline font-semibold text-headline-sm text-on-surface dark:text-[#e5e1ea]">{title}</h2>
        {description && <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">{description}</p>}
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </section>
  );
}

// ============================================
// TOGGLE SWITCH
// ============================================
function Toggle({ checked, onChange, id, label }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <label htmlFor={id} className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea] cursor-pointer flex-1">
        {label}
      </label>
      <button
        role="switch"
        id={id}
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={[
          'relative w-11 h-6 border-2 border-on-surface dark:border-[#a8a6ff] transition-all duration-200',
          'focus:outline-none focus:shadow-[0_0_0_2px_var(--color-primary-fixed-dim-light)] min-h-[44px] min-w-[44px] flex items-center',
          checked ? 'bg-primary dark:bg-[var(--color-primary-dark)]' : 'bg-surface-container dark:bg-[#252533]',
        ].join(' ')}
      >
        <span
          className={[
            'absolute w-4 h-4 bg-on-primary dark:bg-white border border-on-surface dark:border-[#464552] transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

// ============================================
// AUTH FORM
// ============================================
// ============================================
// SETTINGS PAGE
// ============================================
export function SettingsPage() {
  const { t } = useTranslation();
  const { settings, updateSettings, theme, addToast, user, isAuthenticated, syncStatus, syncNow, signOut, syncResult, setShowAuthModal, clearAllLocalData, setFreshStart, freshStart, requireAuth } = useApp();
  const settingsTabs = [
    { id: 'profile', label: t('settings.tab_profile'), icon: <User size={14} /> },
    { id: 'appearance', label: t('settings.tab_appearance'), icon: <Palette size={14} /> },
    { id: 'notifications', label: t('settings.tab_notifications'), icon: <Bell size={14} /> },
    { id: 'documentation', label: t('settings.tab_documentation'), icon: <BookOpen size={14} /> },
    { id: 'data', label: t('settings.tab_data'), icon: <Database size={14} /> },
    { id: 'about', label: t('settings.tab_about'), icon: <Zap size={14} /> },
  ];
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const displayName = user?.email
    ? settings.name || user.email.split('@')[0]
    : settings.name;
  const isYusjul = (user?.email ?? settings.email ?? settings.name).toLowerCase().includes('yusjul');
  const [profileForm, setProfileForm] = useState({ name: user?.email ? displayName : settings.name, email: user?.email ?? settings.email });

  function handleSaveProfile() {
    updateSettings({ name: profileForm.name, email: profileForm.email });
    addToast({ message: t('settings.profile_toast_saved'), type: 'success' });
  }

  function handleTheme(themeMode: 'light' | 'dark') {
    updateSettings({ theme: themeMode });
    addToast({ message: `${t('settings.appearance_toast_theme')} ${themeMode} mode`, type: 'info' });
  }

  async function handleClearData() {
    await clearAllLocalData();
    setFreshStart(true);
    addToast({ message: t('settings.data_toast_cleared'), type: 'success' });
  }

  async function handleLoadDemoData() {
    await seedDatabase(true);
    setFreshStart(false);
    addToast({ message: t('settings.data_toast_demo_loaded'), type: 'success' });
  }

  function handleSyncNow() {
    syncNow();
    addToast({ message: t('settings.data_toast_syncing'), type: 'info' });
  }

  async function handleSignOut() {
    await signOut();
    addToast({ message: t('settings.data_toast_signed_out'), type: 'info' });
  }

  return (
    <div className="flex-1 px-3 py-2 md:px-8 md:py-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-3 md:mb-8">
        <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">{t('settings.title')}</h1>
        <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4] mt-1">{t('settings.subtitle')}</p>
      </div>

      {/* Layout: Tabs on desktop, dropdown-like tabs on mobile */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Tab nav — converts to scrollable tabs on mobile */}
        <nav
          className="md:w-48 flex-shrink-0"
          aria-label="Settings sections"
        >
          {/* Mobile: horizontal scrollable tabs */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto gap-2 pb-2">
              {settingsTabs.slice(0, 5).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-2 px-3 py-2 min-h-[44px] whitespace-nowrap font-mono text-xs border-2 transition-all',
                    activeTab === tab.id
                      ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff] shadow-hard-sm'
                      : 'bg-surface dark:bg-[#1e1e2a] text-on-surface-variant dark:text-[#c8c4d4] border-on-surface dark:border-[#464552]',
                  ].join(' ')}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-2 px-3 py-2 min-h-[44px] whitespace-nowrap font-mono text-xs border-2 border-on-surface dark:border-[#464552] bg-surface dark:bg-[#1e1e2a] text-on-surface-variant dark:text-[#c8c4d4] hover:bg-error/10 hover:border-error hover:text-error transition-all"
                >
                  <LogOut size={14} />
                  {t('settings.data_cloud_sign_out')}
                </button>
              )}
              {settingsTabs.slice(5).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'flex items-center gap-2 px-3 py-2 min-h-[44px] whitespace-nowrap font-mono text-xs border-2 transition-all',
                    activeTab === tab.id
                      ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff] shadow-hard-sm'
                      : 'bg-surface dark:bg-[#1e1e2a] text-on-surface-variant dark:text-[#c8c4d4] border-on-surface dark:border-[#464552]',
                  ].join(' ')}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: vertical nav */}
          <div className="hidden md:flex flex-col gap-1">
            {settingsTabs.slice(0, 5).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-3 px-4 py-2.5 min-h-[44px] font-mono text-sm text-left transition-all border-2',
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]'
                    : 'text-on-surface-variant dark:text-[#c8c4d4] border-transparent hover:bg-surface-container dark:hover:bg-[#1e1e2a] hover:border-on-surface dark:hover:border-[#464552]',
                ].join(' ')}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-3 px-4 py-2.5 min-h-[44px] font-mono text-sm text-left transition-all border-2 text-on-surface-variant dark:text-[#c8c4d4] border-transparent hover:bg-error/10 hover:border-error hover:text-error hover:shadow-[2px_2px_0px_0px_#fa7a7a]"
              >
                <LogOut size={14} />
                {t('settings.data_cloud_sign_out')}
              </button>
            )}
            {settingsTabs.slice(5).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-3 px-4 py-2.5 min-h-[44px] font-mono text-sm text-left transition-all border-2',
                  activeTab === tab.id
                    ? 'bg-primary text-on-primary border-on-surface dark:border-[#a8a6ff] shadow-hard-sm dark:shadow-[2px_2px_0px_0px_#a8a6ff]'
                    : 'text-on-surface-variant dark:text-[#c8c4d4] border-transparent hover:bg-surface-container dark:hover:bg-[#1e1e2a] hover:border-on-surface dark:hover:border-[#464552]',
                ].join(' ')}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40" onClick={() => setShowLogoutConfirm(false)}>
            <div className="border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#1e1e2a] shadow-hard dark:shadow-[8px_8px_0px_0px_#a8a6ff] p-6 w-80 animate-[pop_150ms_ease-out]" onClick={e => e.stopPropagation()}>
              <p className="font-headline font-bold text-lg text-on-surface dark:text-[#e5e1ea] mb-6">
                {t('settings.data_sign_out_confirm')}
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
                  {t('common.cancel')}
                </Button>
                <Button variant="danger" onClick={() => { handleSignOut(); setShowLogoutConfirm(false); }}>
                  <LogOut size={14} />
                  {t('settings.data_cloud_sign_out')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-6">

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <SettingsSection title={t('settings.profile_title')} description={t('settings.profile_desc')}>
              <div className="flex items-center gap-5 pb-4 border-b border-on-surface/10 dark:border-[#464552]/50">
                <div className="w-16 h-16 bg-primary-container dark:bg-[var(--color-primary-container-dark)] border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center font-mono font-bold text-xl text-on-primary-container dark:text-white shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]">
                  {(user?.email ?? settings.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-headline font-semibold text-on-surface dark:text-[#e5e1ea]">{displayName}</p>
                  <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{user?.email ?? settings.email}</p>
                  {isYusjul && <span className="font-mono text-xs px-2 py-0.5 bg-primary text-on-primary mt-1 inline-block">{t('settings.profile_pro_plan')}</span>}
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 dark:bg-[var(--color-primary-container-dark)]/10 border border-primary/20 dark:border-[var(--color-primary-fixed-dim-dark)]/20">
                  <Cloud size={14} className="text-[#84cc16]" />
                  <span className="font-mono text-xs text-on-surface dark:text-[#e5e1ea]">{t('settings.profile_connected')} <strong>{user?.email}</strong></span>
                </div>
              )}
              <Input
                label={t('settings.profile_display_name')}
                value={profileForm.name}
                onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
              />
              <Input
                label={t('settings.profile_email')}
                type="email"
                value={profileForm.email}
                onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                disabled={isAuthenticated}
              />
              {isYusjul && <Input label={t('settings.profile_role')} value={t('settings.profile_role_value')} disabled />}
              <div className="flex gap-3 pt-2">
                <Button variant="primary" onClick={handleSaveProfile}>{t('settings.profile_save')}</Button>
                <Button variant="outline" onClick={() => setProfileForm({ name: settings.name, email: settings.email })}>{t('settings.profile_reset')}</Button>
              </div>
            </SettingsSection>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <SettingsSection title={t('settings.appearance_title')} description={t('settings.appearance_desc')}>
              {/* Theme selection */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-on-surface-variant dark:text-[#c8c4d4] mb-3">{t('settings.appearance_theme')}</p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'light', label: t('settings.appearance_light'), icon: Sun },
                    { value: 'dark', label: t('settings.appearance_dark'), icon: Moon },
                  ] as const).map(opt => {
                    const Icon = opt.icon;
                    const isActive = theme === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleTheme(opt.value)}
                        className={[
                          'flex flex-col items-center gap-3 p-4 border-2 min-h-[80px] transition-all',
                          isActive
                            ? 'border-primary bg-primary/5 dark:bg-[var(--color-primary-container-dark)]/20 shadow-hard-violet'
                            : 'border-on-surface dark:border-[#464552] bg-surface dark:bg-[#252533] hover:border-[var(--color-primary-fixed-dim-light)]',
                        ].join(' ')}
                        aria-pressed={isActive}
                      >
                        <Icon size={20} className={isActive ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)]' : 'text-on-surface-variant dark:text-[#c8c4d4]'} />
                        <span className={`font-mono text-xs ${isActive ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold' : 'text-on-surface-variant dark:text-[#c8c4d4]'}`}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Toggle
                id="compact-mode"
                label={t('settings.appearance_compact')}
                checked={settings.compactMode}
                onChange={v => updateSettings({ compactMode: v })}
              />

              {/* Accent color */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-on-surface-variant dark:text-[#c8c4d4] mb-3">{t('settings.appearance_accent')}</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { value: 'violet', color: '#918efa' },
                    { value: 'cyan', color: '#06b6d4' },
                    { value: 'lime', color: '#84cc16' },
                    { value: 'yellow', color: '#eab308' },
                    { value: 'red', color: '#fa7a7a' },
                  ].map(acc => (
                    <button
                      key={acc.value}
                      onClick={() => updateSettings({ accentColor: acc.value })}
                      className={`w-11 h-11 border-2 transition-transform hover:scale-110 ${settings.accentColor === acc.value ? 'border-on-surface dark:border-[#e5e1ea] scale-110' : 'border-transparent'}`}
                      style={{ background: acc.color }}
                      aria-label={`${acc.value} accent`}
                      aria-pressed={settings.accentColor === acc.value}
                    />
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-on-surface-variant dark:text-[#c8c4d4] mb-3">{t('settings.appearance_language')}</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { value: 'en' as const, label: t('settings.appearance_language_en'), flag: '🇬🇧' },
                    { value: 'id' as const, label: t('settings.appearance_language_id'), flag: '🇮🇩' },
                  ].map(lang => (
                    <button
                      key={lang.value}
                      onClick={() => updateSettings({ language: lang.value })}
                      className={`flex items-center gap-2 px-4 py-2 border-2 transition-all min-h-[44px] ${settings.language === lang.value ? 'border-primary bg-primary/5 dark:bg-[var(--color-primary-container-dark)]/20 shadow-hard-violet' : 'border-on-surface dark:border-[#464552] bg-surface dark:bg-[#252533] hover:border-[var(--color-primary-fixed-dim-light)]'}`}
                      aria-pressed={settings.language === lang.value}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className={`font-mono text-xs ${settings.language === lang.value ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold' : 'text-on-surface-variant dark:text-[#c8c4d4]'}`}>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </SettingsSection>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <SettingsSection title={t('settings.notif_title')} description={t('settings.notif_desc')}>
              <Toggle
                id="notifs-enable"
                label={t('settings.notif_enable')}
                checked={settings.notifications}
                onChange={v => updateSettings({ notifications: v })}
              />
              <Toggle
                id="notifs-autosave"
                label={t('settings.notif_autosave')}
                checked={settings.autoSave}
                onChange={v => updateSettings({ autoSave: v })}
              />
              <Toggle
                id="notifs-tasks"
                label={t('settings.notif_tasks')}
                checked={true}
                onChange={() => addToast({ message: 'Notification settings saved', type: 'info' })}
              />
              <Toggle
                id="notifs-updates"
                label={t('settings.notif_updates')}
                checked={false}
                onChange={() => addToast({ message: 'Notification settings saved', type: 'info' })}
              />
              </SettingsSection>
          )}

          {/* DOCUMENTATION TAB */}
          {activeTab === 'documentation' && (
            <>
              <SettingsSection title={t('settings.docs_quickstart_title')} description={t('settings.docs_quickstart_desc')}>
                <div className="space-y-4">
                  {[
                    { step: '1', title: t('settings.docs_step1_title'), desc: t('settings.docs_step1_desc'), icon: <FolderKanban size={16} /> },
                    { step: '2', title: t('settings.docs_step2_title'), desc: t('settings.docs_step2_desc'), icon: <CheckSquare size={16} /> },
                    { step: '3', title: t('settings.docs_step3_title'), desc: t('settings.docs_step3_desc'), icon: <FileText size={16} /> },
                    { step: '4', title: t('settings.docs_step4_title'), desc: t('settings.docs_step4_desc'), icon: <Activity size={16} /> },
                    { step: '5', title: t('settings.docs_step5_title'), desc: t('settings.docs_step5_desc'), icon: <Cloud size={16} /> },
                  ].map(item => (
                    <div key={item.step} className="flex gap-4 p-3 border border-on-surface/20 dark:border-[#464552]/50">
                      <div className="w-8 h-8 bg-primary text-on-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {item.icon}
                          <h4 className="font-headline font-semibold text-sm text-on-surface dark:text-[#e5e1ea]">{item.title}</h4>
                        </div>
                        <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SettingsSection>

              <SettingsSection title={t('settings.docs_feature_title')} description={t('settings.docs_feature_desc')}>
                {[
                  {
                    title: 'Dashboard',
                    icon: <Activity size={14} />,
                    content: 'Dashboard adalah pusat kendali FutureStack. Menampilkan 4 kartu statistik (Total Projects, Active Tasks, Notes, Completion Rate), project terbaru, aktivitas terakhir, dan tombol ekspor PDF/CSV.',
                  },
                  {
                    title: 'Projects',
                    icon: <FolderKanban size={14} />,
                    content: 'Kelola project dengan status (active/draft/archived), prioritas (critical/high/medium/low), progress bar, dan filter pencarian. Setiap project punya task count dan warna aksen khas.',
                  },
                  {
                    title: 'Kanban Board',
                    icon: <Columns3 size={14} />,
                    content: 'Drag-and-drop task management dengan 5 kolom: Backlog → To Do → In Progress → Review → Done. Task bisa dipindah antar status, diedit, dan dihapus.',
                  },
                  {
                    title: 'Notes',
                    icon: <FileText size={14} />,
                    content: 'Markdown editor dengan live preview, auto-save, pinning, tagging, dan search. Mendukung heading, bold, italic, code blocks, checklist, dan bullet list.',
                  },
                  {
                    title: 'Analytics',
                    icon: <BarChart3 size={14} />,
                    content: 'Visualisasi data dengan Recharts: tasks completed per minggu, project progress, aktivitas harian, dan velocity trend. Data real-time dari IndexedDB.',
                  },
                  {
                    title: 'AI Chat Assistant',
                    icon: <MessageSquare size={14} />,
                    content: 'Chatbot pintar yang bisa menjawab pertanyaan, membuat project/task/notes via perintah bahasa alami, dan memberikan tips coding. Mendukung mode offline dengan 200+ respons pattern.',
                  },
                ].map(feature => (
                  <div key={feature.title} className="border border-on-surface/20 dark:border-[#464552]/50">
                    <button
                      onClick={() => setExpandedFeature(expandedFeature === feature.title ? null : feature.title)}
                      className="w-full flex items-center gap-3 px-4 py-3 min-h-[44px] text-left hover:bg-surface-container dark:hover:bg-[#252533] transition-colors"
                    >
                      {feature.icon}
                      <span className="flex-1 font-headline font-semibold text-sm text-on-surface dark:text-[#e5e1ea]">{feature.title}</span>
                      <ChevronDown size={14} className={`text-on-surface-variant transition-transform ${expandedFeature === feature.title ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFeature === feature.title && (
                      <div className="px-4 pb-4 pt-1">
                        <p className="font-body text-body-sm text-on-surface-variant dark:text-[#c8c4d4]">{feature.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </SettingsSection>

            </>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <>
              {/* Cloud Sync Section */}
              <SettingsSection title={t('settings.data_cloud_title')} description={t('settings.data_cloud_desc')}>
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#84cc16]/10 border border-[#84cc16]/30">
                      <CheckCircle size={16} className="text-[#84cc16]" />
                      <div>
                        <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">Connected as <strong>{user?.email}</strong></p>
                        <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">
                          {syncStatus === 'syncing' ? t('settings.data_cloud_syncing') :
                           syncStatus === 'success' ? t('settings.data_cloud_success') :
                           syncStatus === 'error' ? t('settings.data_cloud_error') :
                           t('settings.data_cloud_ready')}
                        </p>
                      </div>
                    </div>

                    {syncResult && (
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {['projects', 'tasks', 'notes'].map(table => {
                          const r = syncResult[table as keyof typeof syncResult] as { synced: number; errors: string[] };
                          return (
                            <div key={table} className="border border-on-surface/20 dark:border-[#464552]/50 p-2">
                              <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4] uppercase">{table}</p>
                              <p className="font-headline font-bold text-lg text-on-surface dark:text-[#e5e1ea]">{r.synced}</p>
                              <p className="font-mono text-[10px] text-on-surface-variant dark:text-[#c8c4d4]">{t('settings.data_cloud_synced')}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="primary" icon={<RefreshCw size={14} />} onClick={handleSyncNow} disabled={syncStatus === 'syncing'}>
                        {syncStatus === 'syncing' ? t('settings.data_cloud_syncing') : t('settings.data_cloud_sync_now')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#eab308]/10 border border-[#eab308]/30">
                      <CloudOff size={16} className="text-[#eab308]" />
                      <div>
                        <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">{t('settings.data_cloud_not_connected')}</p>
                        <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t('settings.data_cloud_not_connected_desc')}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 min-h-[48px] border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] font-body text-body-md font-medium text-on-surface dark:text-[#e5e1ea] shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
                    >
                      {t('settings.data_cloud_sign_in')}
                    </button>
                  </div>
                )}
              </SettingsSection>

              <SettingsSection title={t('settings.data_local_title')} description={t('settings.data_local_desc')}>
                <div className="space-y-3">
                  {[
                    { label: t('settings.data_local_projects'), icon: <Zap size={14} />, value: t('settings.data_local_offline') },
                    { label: t('settings.data_local_tasks'), icon: <Zap size={14} />, value: t('settings.data_local_offline') },
                    { label: t('settings.data_local_notes'), icon: <Zap size={14} />, value: t('settings.data_local_offline') },
                    { label: t('settings.data_local_settings'), icon: <Shield size={14} />, value: t('settings.data_local_encrypted') },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-on-surface/10 dark:border-[#464552]/50 last:border-0">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">{item.label}</span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{item.value}</span>
                    </div>
                  ))}
                </div>
              <Toggle
                id="auto-save"
                label={t('settings.data_autosave')}
                checked={settings.autoSave}
                onChange={v => updateSettings({ autoSave: v })}
              />
              </SettingsSection>
              <SettingsSection title={t('settings.data_danger_title')} description={t('settings.data_danger_desc')}>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <Button variant="danger" icon={<Trash2 size={14} />} onClick={handleClearData}>{t('settings.data_clear_all')}</Button>
                  <Button variant="outline" icon={<Sprout size={14} />} onClick={handleLoadDemoData}>{t('settings.data_load_demo')}</Button>
                  <Button variant="outline" icon={<Download size={14} />} onClick={() => requireAuth(async () => { const [projs, tasks, notes] = await Promise.all([getAllProjects(), getAllTasks(), getAllNotes()]); exportToJSON(projs, tasks, notes); addToast({ message: t('settings.data_toast_export'), type: 'success' }); })}>{t('settings.data_export')}</Button>
                </div>
                {freshStart && (
                  <div className="flex items-center gap-2 p-3 bg-[#eab308]/10 border border-[#eab308]/30 mt-3">
                    <Sprout size={14} className="text-[#eab308]" />
                    <p className="font-mono text-xs text-on-surface dark:text-[#e5e1ea]">
                      {t('settings.data_fresh_notice')}
                    </p>
                  </div>
                )}
              </SettingsSection>
            </>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <SettingsSection title={t('settings.about_title')}>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-on-surface/10 dark:border-[#464552]/50">
                  <div className="w-12 h-12 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]">
                    <Zap size={20} className="text-on-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface dark:text-[#e5e1ea]">FutureStack v1.0.0</h3>
                    <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{t('settings.about_build')}: {new Date().toISOString().split('T')[0]}</p>
                  </div>
                </div>
                {([
                  [t('settings.about_framework'), 'React 19 + TypeScript'],
                  [t('settings.about_bundler'), 'Vite 8'],
                  [t('settings.about_styling'), 'Tailwind CSS v3'],
                  [t('settings.about_database'), 'IndexedDB (via idb)'],
                  [t('settings.about_cloud'), 'Supabase'],
                  [t('settings.about_charts'), 'Recharts'],
                  [t('settings.about_icons'), 'Lucide React'],
                  [t('settings.about_design'), 'Neo-Brutalism System'],
                ] as const).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-on-surface/10 dark:border-[#464552]/30 last:border-0">
                    <span className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">{key}</span>
                    <span className="font-mono text-xs text-on-surface dark:text-[#e5e1ea] font-medium">{val}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="font-mono text-xs text-on-surface-variant dark:text-[#c8c4d4]">
                    {t('settings.about_footer')}
                  </p>
                </div>
              </div>
            </SettingsSection>
          )}

        </div>
      </div>
    </div>
  );
}
