import { useEffect, useState } from 'react';
import type { Route } from '../types';
import { normalizeRoute } from '../utils/router';

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => normalizeRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => setRoute(normalizeRoute(window.location.hash));
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}
