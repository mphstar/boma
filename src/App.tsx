import { useEffect, useLayoutEffect } from 'react';
import { PersonalizationDialog } from './components/dialog/PersonalizationDialog';
import { Hero } from './components/home/Hero';
import { Footer } from './components/layout/Footer';
import { NavBar } from './components/layout/NavBar';
import { RecommendationProvider, useRecommendation } from './context/RecommendationContext';
import { ToastProvider } from './context/ToastContext';
import { disconnectReveal, observeReveal } from './helpers/reveal';
import { useRipple } from './helpers/ripple';
import { useHashRoute } from './hooks/useHashRoute';
import { CatalogPage } from './pages/CatalogPage';
import { DestinationPage } from './pages/DestinationPage';
import { ResultPage } from './pages/ResultPage';

function AppShell() {
  const route = useHashRoute();
  const { recommendation, openDialog } = useRecommendation();
  const activeRoute = route === 'hasil' && !recommendation ? 'home' : route;

  useEffect(() => {
    if (route === 'hasil' && !recommendation) {
      window.history.replaceState(null, '', '#/');
      openDialog();
    }
  }, [route, recommendation, openDialog]);

  useLayoutEffect(() => {
    document.body.dataset.page = activeRoute;
    window.scrollTo(0, 0);
  }, [activeRoute]);

  useEffect(() => {
    disconnectReveal();
    observeReveal();
  }, [activeRoute, recommendation]);

  useRipple();

  return (
    <>
      <NavBar route={activeRoute} />
      {activeRoute === 'home' && <Hero />}
       {activeRoute === 'katalog' && <CatalogPage />}
       {activeRoute === 'hasil' && recommendation && <ResultPage />}
       {activeRoute === 'wisata' && <DestinationPage />}
       <Footer />
      <PersonalizationDialog />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <RecommendationProvider>
        <AppShell />
      </RecommendationProvider>
    </ToastProvider>
  );
}
