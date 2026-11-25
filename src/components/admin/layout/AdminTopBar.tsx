import { useEffect, useRef, useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { AdminIcon } from '../ui/AdminIcon';
import { NotificationPanel } from './NotificationPanel';

interface AdminTopBarProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onToggleTheme: () => void;
}

export function AdminTopBar({ menuOpen, onToggleMenu, onToggleTheme }: AdminTopBarProps) {
  const { page, navigate, search, setSearch, unreadCount } = useAdmin();
  const [panelOpen, setPanelOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    if (menuOpen) setPanelOpen(false);
  }, [menuOpen]);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (page !== 'wisata') navigate('wisata');
  };

  return (
    <div className="top">
      <button
        type="button"
        className="ib burger"
        aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <AdminIcon name="menu" size={22} strokeWidth={2} />
      </button>

      <div className="search">
        <AdminIcon name="search" size={16} strokeWidth={2} />
        <input
          ref={searchRef}
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          placeholder="Cari wisata…"
          aria-label="Cari wisata"
        />
        <kbd>⌘ K</kbd>
      </div>

      <button type="button" className="ib" title="Ganti tema" aria-label="Ganti tema" onClick={onToggleTheme}>
        <AdminIcon name="moon" size={19} strokeWidth={2} />
      </button>

      <button
        type="button"
        className="ib"
        ref={bellRef}
        title="Notifikasi"
        aria-label="Notifikasi"
        aria-expanded={panelOpen}
        onClick={() => setPanelOpen((current) => !current)}
      >
        <AdminIcon name="bell" size={19} strokeWidth={2} />
        {unreadCount > 0 && <b>{unreadCount}</b>}
      </button>

      <div className="user">
        <div className="av">AD</div>
        <div>
          Admin SAI-Agro
          <small>@admin_saiagro</small>
        </div>
      </div>

      <NotificationPanel open={panelOpen} bellRef={bellRef} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
