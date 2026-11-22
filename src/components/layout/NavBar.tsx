import { useRecommendation } from '../../context/RecommendationContext';
import type { Route } from '../../types';

interface NavLink {
  label: string;
  href: string;
  route: 'home' | 'katalog' | 'jelajah';
}

export function NavBar({ route }: { route: Route }) {
  const { openDialog } = useRecommendation();

  const links: NavLink[] = [
    { label: 'Beranda', href: '#/', route: 'home' },
    { label: 'Katalog', href: '#/katalog', route: 'katalog' },
    { label: 'Jelajah', href: '#/jelajah', route: 'jelajah' },
  ];

  return (
    <nav>
      <a className="logo" href="#/">
        <img
          src="/assets/logo-mark-cream.webp"
          alt=""
          width="26"
          height="28"
          decoding="async"
        />
        BOMA
      </a>
      <div className="links">
        {links.map((link) => (
          <a
            key={link.route}
            href={link.href}
            className={(link.route === route || (route === 'wisata' && link.route === 'katalog')) ? 'act' : undefined}
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
