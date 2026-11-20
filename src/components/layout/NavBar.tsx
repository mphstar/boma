import { useRecommendation } from '../../context/RecommendationContext';
import type { Route } from '../../types';

interface NavLink {
  label: string;
  href: string;
  route: 'home' | 'katalog';
}

export function NavBar({ route }: { route: Route }) {
  const { openDialog } = useRecommendation();

  const links: NavLink[] = [
    { label: 'Beranda', href: '#/', route: 'home' },
    { label: 'Katalog', href: '#/katalog', route: 'katalog' },
  ];

  return (
    <nav>
      <a className="logo" href="#/">
        <i />BOMA
      </a>
      <div className="links">
        {links.map((link) => (
          <a
            key={link.route}
            href={link.href}
            className={link.route === route ? 'act' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
      <button className="nav-cta" onClick={openDialog}>
        Cari rekomendasi
      </button>
    </nav>
  );
}
