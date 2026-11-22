import { useEffect, useState } from 'react';
import type { Route } from '../types';
import { normalizeRoute } from '../utils/router';

export interface HashRoute {
  route: Route;
  hash: string;
}

export function useHashRoute(): HashRoute {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return { route: normalizeRoute(hash), hash };
}
