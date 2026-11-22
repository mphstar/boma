import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRecommendation } from '../../context/RecommendationContext';
import { DESTINATIONS } from '../../data/destinations';
import { padCount } from '../../utils/format';
import { HERO_DWELL_MS, HERO_TEXT_OUT_MS } from '../../utils/motion';
import { destinationHref } from '../../utils/router';
import { Scene } from '../ui/Scene';
import { Tags } from '../ui/Tags';

const TOTAL = DESTINATIONS.length;

const nextIndex = (index: number): number => (index + 1) % TOTAL;
const prevIndex = (index: number): number => (index - 1 + TOTAL) % TOTAL;

export function Hero() {
  const { dialogOpen } = useRecommendation();
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [dir, setDir] = useState(1);
  const [cycle, setCycle] = useState(0);
  const [autoOn, setAutoOn] = useState(true);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);

  const heroRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstScroll = useRef(true);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  const paused = dialogOpen || tabHidden;
  const current = DESTINATIONS[shown];
  const words = current.name.split(' ');

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    if (!reduce) return;
    setAutoOn(false);
    const p = pointer.current;
    cancelAnimationFrame(p.raf);
    p.raf = 0;
    p.x = p.y = p.tx = p.ty = 0;
    heroRef.current?.style.setProperty('--px', '0');
    heroRef.current?.style.setProperty('--py', '0');
  }, [reduce]);

  // Teks lama pamit dulu, baru teks baru masuk. Latar sudah bergerak sejak awal.
  useEffect(() => {
    if (active === shown) {
      setLeaving(false);
      return;
    }

    if (reduce) {
      setShown(active);
      setCycle((value) => value + 1);
      return;
    }

    setLeaving(true);
    const timer = window.setTimeout(() => {
      setShown(active);
      setLeaving(false);
      setCycle((value) => value + 1);
    }, HERO_TEXT_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [active, shown, reduce]);

  useEffect(() => {
    if (firstScroll.current) {
      firstScroll.current = false;
      return;
    }
    const card = cardRefs.current[active];
    if (!card || !trackRef.current) return;
    trackRef.current.scrollTo({
      left: Math.max(0, card.offsetLeft - 4),
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [active, reduce]);

  useEffect(() => {
    if (!autoOn || paused) return;
    const timer = window.setTimeout(() => {
      setOutgoing(active);
      setDir(1);
      setActive(nextIndex);
    }, HERO_DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoOn, paused]);

  // Setelah fade selesai, lapisan lama dilepas supaya hanya dua foto yang hidup.
  useEffect(() => {
    if (outgoing === null) return;
    const timer = window.setTimeout(() => setOutgoing(null), reduce ? 0 : 1400);
    return () => window.clearTimeout(timer);
  }, [outgoing, reduce]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (dialogOpen) return;
      if (event.key === 'ArrowRight') {
        setAutoOn(false);
        setOutgoing(active);
        setDir(1);
        setActive(nextIndex);
      }
      if (event.key === 'ArrowLeft') {
        setAutoOn(false);
        setOutgoing(active);
        setDir(-1);
        setActive(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogOpen, active]);

  useEffect(() => {
    const p = pointer.current;
    return () => cancelAnimationFrame(p.raf);
  }, []);

  const glidePointer = () => {
    const p = pointer.current;
    if (p.raf) return;

    const tick = () => {
      const node = heroRef.current;
      if (!node) {
        p.raf = 0;
        return;
      }
      p.x += (p.tx - p.x) * 0.075;
      p.y += (p.ty - p.y) * 0.075;
      const settled = Math.abs(p.tx - p.x) < 0.0004 && Math.abs(p.ty - p.y) < 0.0004;
      if (settled) {
        p.x = p.tx;
        p.y = p.ty;
      }
      node.style.setProperty('--px', p.x.toFixed(4));
      node.style.setProperty('--py', p.y.toFixed(4));
      p.raf = settled ? 0 : requestAnimationFrame(tick);
    };

    p.raf = requestAnimationFrame(tick);
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (reduce) return;
    pointer.current.tx = event.clientX / window.innerWidth - 0.5;
    pointer.current.ty = event.clientY / window.innerHeight - 0.5;
    glidePointer();
  };

  const handleMouseLeave = () => {
    if (reduce) return;
    pointer.current.tx = 0;
    pointer.current.ty = 0;
    glidePointer();
  };

  const select = (index: number, direction: number) => {
    setAutoOn(false);
    setOutgoing(active);
    setDir(direction);
    setActive(index);
  };

  const bgState = (index: number): string =>
    index === active ? 'on' : index === outgoing ? 'out' : 'idle';

  return (
    <main
      className={`hero${cycle === 0 ? ' first' : ''}`}
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--dir': dir, '--dwell': `${HERO_DWELL_MS}ms` } as CSSProperties}
    >
      <div className="bg-stack">
        {DESTINATIONS.map((destination, index) => {
          const state = bgState(index);
          return (
            <div key={destination.id} className="bg" data-state={state}>
              {state === 'idle' ? null : (
                <Scene
                  sceneKey={destination.key}
                  variant="bg"
                  portraitCard
                  priority={state === 'on'}
                  sizes="100vw"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="shade" />

      <div className="hero-in">
        <div
          className={`info ${leaving ? 'out' : 'swap'}`}
          key={cycle}
          onFocus={() => setAutoOn(false)}
        >
          <div className="kat">{current.category}</div>
          <h1>
            {words.map((word, index) => (
              <Fragment key={index}>
                <span className="w">
                  <span className="wi" style={{ '--w': index } as CSSProperties}>
                    {word}
                  </span>
                </span>
                {index < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          <p className="lead">{current.description}</p>
          <Tags
            price={current.price}
            duration={current.duration}
            activity={current.activity}
            tourist={current.tourist}
          />
          <div className="meta-row">
            <div className="px">{current.priceNote}</div>
            <div className="cta-row">
              <a className="btn ghost" href={destinationHref(current.key)}>
                Lihat detail wisata
              </a>
            </div>
          </div>
        </div>

        <div className="cwrap">
          <div className="track" ref={trackRef}>
            {DESTINATIONS.map((destination, index) => (
              <button
                key={destination.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={`ccard${index === active ? ' active' : ''}`}
                aria-current={index === active}
                aria-label={destination.name}
                style={
                  { '--k': index, '--d': Math.abs(index - active) } as CSSProperties
                }
                onClick={() => select(index, index > active ? 1 : -1)}
              >
                <Scene
                  sceneKey={destination.key}
                  sizes="(max-width: 620px) 118px, (max-width: 980px) 150px, 200px"
                />
                <div className="t">
                  <small>{destination.category}</small>
                  <h3>{destination.name}</h3>
                </div>
              </button>
            ))}
          </div>

          <div className="arrows">
            <button aria-label="Sebelumnya" onClick={() => select(prevIndex(active), -1)}>
              ‹
            </button>
            <button aria-label="Berikutnya" onClick={() => select(nextIndex(active), 1)}>
              ›
            </button>
            <button
              aria-label={autoOn ? 'Jeda putar otomatis' : 'Jalankan putar otomatis'}
              onClick={() => setAutoOn((value) => !value)}
            >
              <span className={`ico ${autoOn ? 'pause' : 'play'}`} aria-hidden="true" />
            </button>
          </div>

          <div className="count">
            <span className="count-now">
              <span className="count-roll" key={active}>
                {padCount(active)}
              </span>
            </span>
            <span className="count-line">
              {autoOn && !reduce ? (
                <span
                  className="count-fill"
                  key={`${active}:${paused}`}
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                />
              ) : null}
            </span>
            <span>{String(TOTAL).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
