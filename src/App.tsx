import { useEffect, useRef, useState } from 'react';
import { PersonalizationDialog } from './components/dialog/PersonalizationDialog';
import { Hero } from './components/home/Hero';
import { Footer } from './components/layout/Footer';
import { NavBar } from './components/layout/NavBar';
import { PageFrame } from './components/layout/PageFrame';
import { TransitionOverlay, type TransitionPhase } from './components/layout/TransitionOverlay';
import { RecommendationProvider, useRecommendation } from './context/RecommendationContext';
import { ToastProvider } from './context/ToastContext';
import { byKey } from './data/destinations';
import { useRipple } from './helpers/ripple';
import { useHashRoute } from './hooks/useHashRoute';
import { AdminApp } from './pages/admin/AdminApp';
import { CatalogPage } from './pages/CatalogPage';
import { DestinationPage } from './pages/DestinationPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { ResultPage } from './pages/ResultPage';
import type { Route } from './types';
import { isAdminHash } from './utils/adminRouter';
import { explorerPayloadFromHash } from './utils/explorer';
import { AUTO_DIALOG_DELAY_MS, TRANSITION_COVER_MS, TRANSITION_HOLD_MS, TRANSITION_REVEAL_MS } from './utils/motion';
import { destinationKeyFromHash } from './utils/router';

interface PageView {
  key: string;
  route: Route;
  hash: string;
}

function AppShell() {
  const { route, hash } = useHashRoute();
  const { recommendation, dialogOpen, openDialog } = useRecommendation();
  const activeRoute = route === 'hasil' && !recommendation ? 'home' : route;
  const destinationKey = destinationKeyFromHash(hash);
  const pageKey = activeRoute === 'wisata' ? `wisata:${destinationKey ?? ''}` : activeRoute;
  const pageLabel =
    activeRoute === 'home'
      ? 'Beranda'
      : activeRoute === 'katalog'
        ? 'Katalog wisata'
        : activeRoute === 'hasil'
          ? 'Rekomendasi'
          : activeRoute === 'jelajah'
            ? 'Jelajah SAI-Agro'
            : (destinationKey && byKey(destinationKey)?.name) || 'Detail wisata';

  const [shownView, setShownView] = useState<PageView>(() => ({
    key: pageKey,
    route: activeRoute,
    hash,
  }));
  const shownDestinationKey = destinationKeyFromHash(shownView.hash);

  const [transition, setTransition] = useState<TransitionPhase>('idle');
  const autoDialogDone = useRef(false);
  const lastPageKey = useRef(pageKey);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (lastPageKey.current === pageKey) return;
    lastPageKey.current = pageKey;

    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setTransition('cover');

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coverMs = reduceMotion ? 300 : TRANSITION_COVER_MS;
    const holdMs = reduceMotion ? 380 : TRANSITION_HOLD_MS;
    const revealMs = reduceMotion ? 420 : TRANSITION_REVEAL_MS;
    const nextView: PageView = { key: pageKey, route: activeRoute, hash };

    timers.current.push(
      // Ganti halaman saat tirai sudah menutup penuh, bukan saat masih terbuka.
      window.setTimeout(() => setShownView(nextView), coverMs + 120),
      window.setTimeout(() => setTransition('reveal'), coverMs + holdMs),
      window.setTimeout(() => setTransition('idle'), coverMs + holdMs + revealMs),
    );

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [pageKey]);

  // Jaring pengaman: tirai transisi tidak boleh tertinggal menutup layar.
  useEffect(() => {
    if (transition === 'idle') return;
    const failsafe = window.setTimeout(() => setTransition('idle'), 2600);
    return () => window.clearTimeout(failsafe);
  }, [transition]);

  useEffect(() => {
    if (route === 'hasil' && !recommendation) {
      window.history.replaceState(null, '', '#/');
      openDialog();
    }
  }, [route, recommendation, openDialog]);

  // Dialog rekomendasi tampil sendiri sekali per muat halaman, setelah hero sempat bernapas.
  useEffect(() => {
    if (dialogOpen) {
      autoDialogDone.current = true;
      return;
    }
    if (autoDialogDone.current) return;
    if (activeRoute !== 'home' || recommendation) return;

    let timer = 0;

    const arm = () => {
      if (document.hidden) return;
      timer = window.setTimeout(() => {
        timer = 0;
        autoDialogDone.current = true;
        openDialog();
      }, AUTO_DIALOG_DELAY_MS);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(timer);
        timer = 0;
      } else if (!timer) {
        arm();
      }
    };

    arm();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [activeRoute, recommendation, dialogOpen, openDialog]);

  useRipple();

  return (
    <>
      <NavBar route={shownView.route} />
      <PageFrame
        key={shownView.key}
        route={shownView.route}
        hash={shownView.hash}
        recommendation={recommendation}
        busy={transition !== 'idle'}
      >
        {shownView.route === 'home' && <Hero />}
        {shownView.route === 'katalog' && <CatalogPage />}
        {shownView.route === 'hasil' && recommendation && <ResultPage />}
        {shownView.route === 'jelajah' && (
          <ExplorerPage scanPayload={explorerPayloadFromHash(hash)} />
        )}
        {shownView.route === 'wisata' && <DestinationPage destinationKey={shownDestinationKey} />}
      </PageFrame>
      <TransitionOverlay phase={transition} label={pageLabel} />
      <Footer />
      <PersonalizationDialog />
    </>
  );
}

function SiteShell() {
  return (
    <ToastProvider>
      <RecommendationProvider>
        <AppShell />
      </RecommendationProvider>
    </ToastProvider>
  );
}

export default function App() {
  const { hash } = useHashRoute();

  if (isAdminHash(hash)) {
    return (
      <ToastProvider>
        <AdminApp />
      </ToastProvider>
    );
  }

  return <SiteShell />;
}
