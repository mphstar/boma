import { useAdmin } from '../../../context/AdminContext';
import { ADMIN_PRIMARY_NAV, ADMIN_SECONDARY_NAV } from '../../../data/admin';
import type { AdminNavItem } from '../../../types/admin';
import { adminHref } from '../../../utils/adminRouter';
import { AdminIcon } from '../ui/AdminIcon';

function SidebarLink({ item, active }: { item: AdminNavItem; active: boolean }) {
  return (
    <a
      role="button"
      tabIndex={0}
      href={adminHref(item.page)}
      className={active ? 'on' : undefined}
      aria-current={active ? 'page' : undefined}
      onKeyDown={(event) => {
        if (event.key === ' ') {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    >
      <AdminIcon name={item.icon} />
      <span>{item.label}</span>
    </a>
  );
}

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const { page } = useAdmin();

  return (
    <aside>
      <div className="logo">
        <span className="logo-mark" aria-hidden="true">
          <img
            className="is-ink"
            src="/assets/logo-mark.png"
            alt=""
            width="26"
            height="28"
            decoding="async"
          />
          <img
            className="is-cream"
            src="/assets/logo-mark-cream.webp"
            alt=""
            width="26"
            height="28"
            decoding="async"
          />
        </span>
        <div>
          SAI-Agro
        </div>
      </div>

      <div className="nav">
        {ADMIN_PRIMARY_NAV.map((item) => (
          <SidebarLink key={item.page} item={item} active={page === item.page} />
        ))}
      </div>

      <div className="sp" />

      <div className="nav bt">
        {ADMIN_SECONDARY_NAV.map((item) => (
          <SidebarLink key={item.page} item={item} active={page === item.page} />
        ))}
        <button type="button" className="nav-logout" onClick={onLogout}>
          <AdminIcon name="out" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
