import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Recommendation } from '../types';

interface RecommendationContextValue {
  recommendation: Recommendation | null;
  dialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  setRecommendation: (recommendation: Recommendation) => void;
}

const RecommendationContext = createContext<RecommendationContextValue | null>(null);

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [recommendation, setRecommendationState] = useState<Recommendation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const setRecommendation = useCallback((value: Recommendation) => setRecommendationState(value), []);

  const value = useMemo(
    () => ({ recommendation, dialogOpen, openDialog, closeDialog, setRecommendation }),
    [recommendation, dialogOpen, openDialog, closeDialog, setRecommendation],
  );

  return <RecommendationContext.Provider value={value}>{children}</RecommendationContext.Provider>;
}

export function useRecommendation(): RecommendationContextValue {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
}
