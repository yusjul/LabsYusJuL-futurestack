import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { Topbar } from './components/Topbar';
import { Sidebar, MobileSidebar } from './components/Sidebar';
import { ToastContainer } from './components/Toast';
import { DashboardPage } from './features/Dashboard';
import { ProjectsPage } from './features/Projects';
import { KanbanPage } from './features/Kanban';
import { NotesPage } from './features/Notes';
import { AnalyticsPage } from './features/Analytics';
import { SettingsPage } from './features/Settings';
import { LandingPage } from './features/Landing';
import { seedDatabase } from './database/db';
import './index.css';

// ============================================
// PAGE ROUTER
// ============================================
function PageRouter() {
  const { activePage } = useApp();

  const isFullHeight = activePage === 'notes' || activePage === 'kanban';
  const isOverflowHidden = activePage === 'notes';

  return (
    <main
      id="main-content"
      className={`flex-1 md:ml-56 ${isFullHeight ? 'flex flex-col' : ''} ${isOverflowHidden ? 'overflow-hidden' : 'overflow-y-auto'}`}
    >
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'projects' && <ProjectsPage />}
      {activePage === 'kanban' && <KanbanPage />}
      {activePage === 'notes' && <NotesPage />}
      {activePage === 'analytics' && <AnalyticsPage />}
      {activePage === 'settings' && <SettingsPage />}
    </main>
  );
}

// ============================================
// APP SHELL
// ============================================
interface AppShellProps {
  onGoToLanding: () => void;
}

function AppShell({ onGoToLanding }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#12121a]">
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-[200] bg-primary text-on-primary px-4 py-2 font-mono text-sm border-2 border-on-surface"
      >
        Skip to main content
      </a>

      <Topbar onMenuClick={() => setMobileSidebarOpen(true)} onGoToLanding={onGoToLanding} />

      <div className="flex flex-1">
        <Sidebar />
        <PageRouter />
      </div>

      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <ToastContainer />
    </div>
  );
}

// ============================================
// ROOT APP
// ============================================
function AppInner() {
  const [dbReady, setDbReady] = useState(false);
  const [onLanding, setOnLanding] = useState(true);

  useEffect(() => {
    seedDatabase()
      .then(() => setDbReady(true))
      .catch(err => {
        console.error('DB seed failed:', err);
        setDbReady(true);
      });
  }, []);

  if (!dbReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#12121a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-primary dark:border-[var(--color-primary-fixed-dim-dark)] border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-label-mono text-on-surface-variant dark:text-[#777584]">Initializing FutureStack...</p>
        </div>
      </div>
    );
  }

  if (onLanding) {
    return <LandingPage onEnter={() => setOnLanding(false)} />;
  }

  return <AppShell onGoToLanding={() => setOnLanding(true)} />;
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
