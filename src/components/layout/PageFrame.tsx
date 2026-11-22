import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { disconnectReveal, observeReveal } from '../../helpers/reveal';
import { resetScrollToTop } from '../../helpers/scroll';
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
    resetScrollToTop();
  }, [route, hash, recommendation]);

  useEffect(() => {
    let frame = 0;
    let timer = 0;

    // Browser bisa memulihkan posisi scroll setelah commit; paksa sekali lagi.
    const settle = () => resetScrollToTop();
    frame = window.requestAnimationFrame(settle);
    timer = window.setTimeout(settle, 60);

    const handleShow = (event: PageTransitionEvent) => {
      if (event.persisted) settle();
    };
    window.addEventListener('pageshow', handleShow);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener('pageshow', handleShow);
    };
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
