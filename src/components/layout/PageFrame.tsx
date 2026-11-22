import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { disconnectReveal, observeReveal } from '../../helpers/reveal';
import type { Recommendation, Route } from '../../types';

interface PageFrameProps {
  route: Route;
  hash: string;
  recommendation: Recommendation | null;
  busy: boolean;
  children: ReactNode;
}

export function PageFrame({ route, hash, recommendation, busy, children }: PageFrameProps) {
  useLayoutEffect(() => {
    document.body.dataset.page = route;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previousBehavior;
  }, [route, hash, recommendation]);

  useEffect(() => {
    disconnectReveal();
    observeReveal();
    if (route === 'hasil' && recommendation) {
      document.getElementById('hasil')?.focus({ preventScroll: true });
    }
  }, [route, hash, recommendation]);

  return (
    <div className="page-frame" aria-busy={busy}>
      {children}
    </div>
  );
}