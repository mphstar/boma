import { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { AdminTopBar } from '../../components/admin/layout/AdminTopBar';
import { LogoutDialog } from '../../components/admin/layout/LogoutDialog';
import { resetScrollToTop } from '../../helpers/scroll';
import { StatsRow } from '../../components/admin/ui/StatsRow';
import { AdminProvider } from '../../context/AdminProvider';
import { useAdmin } from '../../context/AdminContext';
import type { AdminTheme } from '../../types/admin';
import { CatalogPage } from './CatalogPage';
import { ChatPage } from './ChatPage';
import { DashboardPage } from './DashboardPage';
import { GuidesPage } from './GuidesPage';
import { HelpPage } from './HelpPage';
import { LoggedOutScreen } from './LoggedOutScreen';
import { OrdersPage } from './OrdersPage';
import { QrDebugPage } from './QrDebugPage';
import { ReportsPage } from './ReportsPage';
import { SchedulePage } from './SchedulePage';
import { SettingsPage } from './SettingsPage';

export function AdminApp() {
  return (
    <AdminProvider>
      <AdminShell />
    </AdminProvider>
  );
}

function AdminShell() {
  const { page, navigate } = useAdmin();
  const [theme, setTheme] = useState<AdminTheme>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'BOMA Gunung Pasang | Dashboard Admin';
    // `data-page` milik dashboard; halaman situs akan memasang nilainya sendiri.
    document.body.dataset.page = 'admin';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    resetScrollToTop();
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const handleChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', handleChange);
    return () => desktop.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const toggleTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = theme ?? (prefersDark ? 'dark' : 'light');
    setTheme(current === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`admin${menuOpen ? ' menu' : ''}`} data-theme={theme ?? undefined}>
      {loggedOut ? (
        <LoggedOutScreen
          onLogin={() => {
            setLoggedOut(false);
            navigate('wisata');
          }}
        />
      ) : (
        <>
          <div className="app">
            <AdminSidebar onLogout={() => setConfirmLogout(true)} />
            <main>
              <AdminTopBar
                menuOpen={menuOpen}
                onToggleMenu={() => setMenuOpen((current) => !current)}
                onToggleTheme={toggleTheme}
              />
              {(page === 'dash' || page === 'wisata') && <StatsRow />}
              <div className="page">
                {page === 'dash' && <DashboardPage />}
                {page === 'wisata' && <CatalogPage />}
                {page === 'pesanan' && <OrdersPage />}
                {page === 'chat' && <ChatPage />}
                {page === 'jadwal' && <SchedulePage />}
                {page === 'pemandu' && <GuidesPage />}
                {page === 'lap' && <ReportsPage />}
                {page === 'qr' && <QrDebugPage />}
                {page === 'set' && <SettingsPage />}
                {page === 'help' && <HelpPage />}
              </div>
            </main>
          </div>
          <div className="ov" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          {confirmLogout && (
            <LogoutDialog
              onCancel={() => setConfirmLogout(false)}
              onConfirm={() => {
                setConfirmLogout(false);
                setLoggedOut(true);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
