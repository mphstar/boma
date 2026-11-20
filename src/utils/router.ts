import type { Route } from '../types';

const ROUTES: Record<string, Route> = {
  '': 'home',
  '/': 'home',
  '/katalog': 'katalog',
  '/hasil': 'hasil',
};

const routePath = (hash: string): string => hash.replace(/^#/, '') || '/';

export const normalizeRoute = (hash: string): Route => {
  const path = routePath(hash);
  if (path.startsWith('/wisata/')) return 'wisata';
  return ROUTES[path] ?? 'home';
};

export const destinationKeyFromHash = (hash: string): string | undefined => {
  const match = routePath(hash).match(/^\/wisata\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : undefined;
};

export const destinationHref = (key: string): string => `#/wisata/${encodeURIComponent(key)}`;
