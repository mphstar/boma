import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useEffect, useRef, useState } from 'react';
import { LOADER_PROGRESS_MS, SHEET_COVER_MS, SHEET_EXIT_MS } from '../../utils/motion';

export type TransitionPhase = 'idle' | 'cover' | 'reveal';

const COVERED_PATH = 'M 0 100 V 0 Q 50 0 100 0 V 100 Z';
const HIDDEN_PATH = 'M 0 100 V 100 Q 50 100 100 100 V 100 Z';

const easeInOutCubic = (value: number): number =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

const waveEdge = (progress: number): { edge: number; bulge: number } => {
  const edge = 100 * (1 - easeInOutCubic(progress));
  return { edge, bulge: edge - Math.sin(progress * Math.PI) * 36 };
};

const coverPath = (progress: number): string => {
  const { edge, bulge } = waveEdge(progress);
  return `M 0 100 V ${edge.toFixed(2)} Q 50 ${bulge.toFixed(2)} 100 ${edge.toFixed(2)} V 100 Z`;
};

const exitPath = (progress: number): string => {
  const { edge, bulge } = waveEdge(progress);
  return `M 0 ${edge.toFixed(2)} Q 50 ${bulge.toFixed(2)} 100 ${edge.toFixed(2)} V 0 H 0 Z`;
};

interface TransitionOverlayProps {
  phase: TransitionPhase;
  label: string;
}

export function TransitionOverlay({ phase, label }: TransitionOverlayProps) {
  const reduce = useReducedMotion();
  const active = phase !== 'idle';
  const pathRef = useRef<SVGPathElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [loaderOn, setLoaderOn] = useState(false);

  useEffect(() => {
    if (!active) return;
    const block = (event: Event) => event.preventDefault();
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
    };
  }, [active]);

  useEffect(() => {
    const setProgress = (value: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${value})`;
      if (counterRef.current) counterRef.current.textContent = `${Math.round(value * 100)}%`;
    };

    if (reduce) {
      setLoaderOn(phase === 'cover');
      return;
    }

    const path = pathRef.current;
    if (!path) return;

    let raf = 0;
    let cancelled = false;

    const frame = (
      duration: number,
      paint: (progress: number) => void,
      done?: () => void,
    ) => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        paint(progress);
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          done?.();
        }
      };
      raf = requestAnimationFrame(tick);
    };

    if (phase === 'cover') {
      setLoaderOn(false);
      setProgress(0);
      path.setAttribute('d', HIDDEN_PATH);
      frame(
        SHEET_COVER_MS,
        (progress) => path.setAttribute('d', coverPath(progress)),
        () => {
          path.setAttribute('d', COVERED_PATH);
          setLoaderOn(true);
          frame(LOADER_PROGRESS_MS, setProgress);
        },
      );
    } else if (phase === 'reveal') {
      setLoaderOn(false);
      frame(
        SHEET_EXIT_MS,
        (progress) => path.setAttribute('d', exitPath(progress)),
        () => path.setAttribute('d', HIDDEN_PATH),
      );
    } else {
      setLoaderOn(false);
      setProgress(0);
      path.setAttribute('d', HIDDEN_PATH);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [phase, reduce]);

  return (
    <div className={`transition-overlay ${phase}`}>
      <div className="to-stage" aria-hidden="true">
        {reduce ? (
          <div className="to-bg" />
        ) : (
          <svg className="to-liquid" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path ref={pathRef} d={HIDDEN_PATH} />
          </svg>
        )}

        <div className={`to-loader${loaderOn ? ' on' : ''}`}>
          <div className="to-mark">
            <span className="to-ping" />
            <span className="to-word">SAI-Agro</span>
          </div>
          <span className="to-route">{label}</span>
          <div className="to-progress">
            <div className="to-track">
              <span className="to-bar" ref={barRef} />
            </div>
            <div className="to-meta">
              <span>Memuat</span>
              <span ref={counterRef}>0%</span>
            </div>
          </div>
        </div>
      </div>

      <p className="to-sr" role="status">
        {phase === 'cover' ? `Menyiapkan ${label}` : ''}
      </p>
    </div>
  );
}