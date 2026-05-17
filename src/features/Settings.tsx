import { useState } from 'react';
import { User, Palette, Bell, Database, Zap, Shield, Sun, Moon, RefreshCw, Cloud, CloudOff, LogOut, CheckCircle } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Input } from '../components/FormControls';
import { Button } from '../components/Button';

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
        {description && <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] mt-1">{description}</p>}
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
const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: <User size={14} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={14} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={14} /> },
  { id: 'data', label: 'Data & Storage', icon: <Database size={14} /> },
  { id: 'about', label: 'About', icon: <Zap size={14} /> },
];

export function SettingsPage() {
  const { settings, updateSettings, theme, addToast, user, isAuthenticated, syncStatus, syncNow, signOut, syncResult, setShowAuthModal } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const displayName = user?.email
    ? user.email.charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)
    : settings.name;
  const [profileForm, setProfileForm] = useState({ name: user?.email ? displayName : settings.name, email: user?.email ?? settings.email });

  function handleSaveProfile() {
    updateSettings({ name: profileForm.name, email: profileForm.email });
    addToast({ message: 'Profile saved successfully', type: 'success' });
  }

  function handleTheme(t: 'light' | 'dark') {
    updateSettings({ theme: t });
    addToast({ message: `Switched to ${t} mode`, type: 'info' });
  }

  function handleClearData() {
    addToast({ message: 'Data clearing is disabled in demo mode', type: 'warning' });
  }

  function handleSyncNow() {
    syncNow();
    addToast({ message: 'Syncing with cloud...', type: 'info' });
  }

  async function handleSignOut() {
    await signOut();
    addToast({ message: 'Signed out', type: 'info' });
  }

  return (
    <div className="flex-1 px-3 py-2 md:px-8 md:py-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-3 md:mb-8">
        <h1 className="font-headline font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface dark:text-[#e5e1ea]">Settings</h1>
        <p className="font-body text-body-sm text-on-surface-variant dark:text-[#777584] mt-1">Configure your FutureStack workspace</p>
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
              {settingsTabs.map(tab => (
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
            {settingsTabs.map(tab => (
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

        {/* Content */}
        <div className="flex-1 space-y-6">

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <SettingsSection title="Profile" description="Your personal information">
              <div className="flex items-center gap-5 pb-4 border-b border-on-surface/10 dark:border-[#464552]/50">
                <div className="w-16 h-16 bg-primary-container dark:bg-[var(--color-primary-container-dark)] border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center font-mono font-bold text-xl text-on-primary-container dark:text-white shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]">
                  {(user?.email ?? settings.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-headline font-semibold text-on-surface dark:text-[#e5e1ea]">{displayName}</p>
                  <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">{user?.email ?? settings.email}</p>
                  <span className="font-mono text-xs px-2 py-0.5 bg-primary text-on-primary mt-1 inline-block">PRO PLAN</span>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 dark:bg-[var(--color-primary-container-dark)]/10 border border-primary/20 dark:border-[var(--color-primary-fixed-dim-dark)]/20">
                  <Cloud size={14} className="text-[#84cc16]" />
                  <span className="font-mono text-xs text-on-surface dark:text-[#e5e1ea]">Connected as <strong>{user?.email}</strong></span>
                  <button onClick={handleSignOut} className="ml-auto font-mono text-xs text-[#fa7a7a] hover:underline min-h-[32px] px-2 flex items-center gap-1">
                    <LogOut size={12} /> Sign Out
                  </button>
                </div>
              )}
              <Input
                label="Display Name"
                value={profileForm.name}
                onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                value={profileForm.email}
                onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
              />
              <Input label="Role" value="Developer" disabled />
              <div className="flex gap-3 pt-2">
                <Button variant="primary" onClick={handleSaveProfile}>Save Profile</Button>
                <Button variant="outline" onClick={() => setProfileForm({ name: settings.name, email: settings.email })}>Reset</Button>
              </div>
            </SettingsSection>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <SettingsSection title="Appearance" description="Customize the look and feel">
              {/* Theme selection */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-on-surface-variant dark:text-[#777584] mb-3">Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'light', label: 'Light Mode', icon: Sun },
                    { value: 'dark', label: 'Dark Mode', icon: Moon },
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
                        <Icon size={20} className={isActive ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)]' : 'text-on-surface-variant dark:text-[#777584]'} />
                        <span className={`font-mono text-xs ${isActive ? 'text-primary dark:text-[var(--color-primary-fixed-dim-dark)] font-bold' : 'text-on-surface-variant dark:text-[#777584]'}`}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Toggle
                id="compact-mode"
                label="Compact Mode — Reduced spacing and smaller elements"
                checked={settings.compactMode}
                onChange={v => updateSettings({ compactMode: v })}
              />

              {/* Accent color */}
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-on-surface-variant dark:text-[#777584] mb-3">Accent Color</p>
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
            </SettingsSection>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <SettingsSection title="Notifications" description="Control when and how you receive alerts">
              <Toggle
                id="notifs-enable"
                label="Enable notifications"
                checked={settings.notifications}
                onChange={v => updateSettings({ notifications: v })}
              />
              <Toggle
                id="notifs-autosave"
                label="Auto-save indicator"
                checked={settings.autoSave}
                onChange={v => updateSettings({ autoSave: v })}
              />
              <Toggle
                id="notifs-tasks"
                label="Task due date reminders"
                checked={true}
                onChange={() => addToast({ message: 'Notification settings saved', type: 'info' })}
              />
              <Toggle
                id="notifs-updates"
                label="System update alerts"
                checked={false}
                onChange={() => addToast({ message: 'Notification settings saved', type: 'info' })}
              />
            </SettingsSection>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <>
              {/* Cloud Sync Section */}
              <SettingsSection title="Cloud Sync" description="Sign in to sync data across your devices">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#84cc16]/10 border border-[#84cc16]/30">
                      <CheckCircle size={16} className="text-[#84cc16]" />
                      <div>
                        <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">Connected as <strong>{user?.email}</strong></p>
                        <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">
                          {syncStatus === 'syncing' ? 'Syncing...' :
                           syncStatus === 'success' ? 'Last sync: all up to date' :
                           syncStatus === 'error' ? 'Sync failed. Check connection.' :
                           'Ready to sync'}
                        </p>
                      </div>
                    </div>

                    {syncResult && (
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {['projects', 'tasks', 'notes'].map(table => {
                          const r = syncResult[table as keyof typeof syncResult] as { synced: number; errors: string[] };
                          return (
                            <div key={table} className="border border-on-surface/20 dark:border-[#464552]/50 p-2">
                              <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584] uppercase">{table}</p>
                              <p className="font-headline font-bold text-lg text-on-surface dark:text-[#e5e1ea]">{r.synced}</p>
                              <p className="font-mono text-[10px] text-on-surface-variant dark:text-[#777584]">synced</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="primary" icon={<RefreshCw size={14} />} onClick={handleSyncNow} disabled={syncStatus === 'syncing'}>
                        {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
                      </Button>
                      <Button variant="outline" icon={<LogOut size={14} />} onClick={handleSignOut}>Sign Out</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-[#eab308]/10 border border-[#eab308]/30">
                      <CloudOff size={16} className="text-[#eab308]" />
                      <div>
                        <p className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">Not connected to cloud</p>
                        <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">Data is stored locally only. Sign in to sync across devices.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 min-h-[48px] border-2 border-on-surface dark:border-[#a8a6ff] bg-surface dark:bg-[#252533] font-body text-body-md font-medium text-on-surface dark:text-[#e5e1ea] shadow-hard-sm dark:shadow-[3px_3px_0px_0px_#a8a6ff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard dark:hover:shadow-[5px_5px_0px_0px_#a8a6ff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150"
                    >
                      Sign In with Email
                    </button>
                  </div>
                )}
              </SettingsSection>

              <SettingsSection title="Local Storage" description="Data stored in your browser's IndexedDB">
                <div className="space-y-3">
                  {[
                    { label: 'Projects', icon: <Zap size={14} />, value: 'Stored offline' },
                    { label: 'Tasks', icon: <Zap size={14} />, value: 'Stored offline' },
                    { label: 'Notes', icon: <Zap size={14} />, value: 'Stored offline' },
                    { label: 'Settings', icon: <Shield size={14} />, value: 'Encrypted locally' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-on-surface/10 dark:border-[#464552]/50 last:border-0">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-body text-body-sm text-on-surface dark:text-[#e5e1ea]">{item.label}</span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Toggle
                  id="auto-save"
                  label="Auto-save on changes"
                  checked={settings.autoSave}
                  onChange={v => updateSettings({ autoSave: v })}
                />
              </SettingsSection>
              <SettingsSection title="Danger Zone" description="Irreversible actions">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="danger" onClick={handleClearData}>Clear All Data</Button>
                  <Button variant="outline" onClick={() => addToast({ message: 'Export started...', type: 'info' })}>Export Data</Button>
                </div>
              </SettingsSection>
            </>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <SettingsSection title="About FutureStack">
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-on-surface/10 dark:border-[#464552]/50">
                  <div className="w-12 h-12 bg-primary border-2 border-on-surface dark:border-[#a8a6ff] flex items-center justify-center shadow-hard dark:shadow-[4px_4px_0px_0px_#a8a6ff]">
                    <Zap size={20} className="text-on-primary" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface dark:text-[#e5e1ea]">FutureStack v1.0.0</h3>
                    <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">Build: {new Date().toISOString().split('T')[0]}</p>
                  </div>
                </div>
                {[
                  ['Framework', 'React 19 + TypeScript'],
                  ['Bundler', 'Vite 8'],
                  ['Styling', 'Tailwind CSS v3'],
                  ['Database', 'IndexedDB (via idb)'],
                  ['Cloud Sync', 'Supabase'],
                  ['Charts', 'Recharts'],
                  ['Icons', 'Lucide React'],
                  ['Design', 'Neo-Brutalism System'],
                ].map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-on-surface/10 dark:border-[#464552]/30 last:border-0">
                    <span className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">{key}</span>
                    <span className="font-mono text-xs text-on-surface dark:text-[#e5e1ea] font-medium">{val}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <p className="font-mono text-xs text-on-surface-variant dark:text-[#777584]">
                    Built by LabsYusJuL · Offline-first PWA
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
