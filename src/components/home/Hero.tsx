import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { useRecommendation } from '../../context/RecommendationContext';
import { DESTINATIONS } from '../../data/destinations';
import { padCount } from '../../utils/format';
import { destinationHref } from '../../utils/router';
import { Scene } from '../ui/Scene';
import { Tags } from '../ui/Tags';

const TOTAL = DESTINATIONS.length;

const nextIndex = (index: number): number => (index + 1) % TOTAL;
const prevIndex = (index: number): number => (index - 1 + TOTAL) % TOTAL;

export function Hero() {
  const { dialogOpen, openDialog } = useRecommendation();
  const [active, setActive] = useState(0);
  const [swapKey, setSwapKey] = useState(0);
  const autoPlay = useRef(true);
  const bgStackRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeDestination = DESTINATIONS[active];

  useEffect(() => {
    setSwapKey((key) => key + 1);
    const card = cardRefs.current[active];
    if (card && trackRef.current) {
      trackRef.current.scrollTo({ left: Math.max(0, card.offsetLeft - 4), behavior: 'smooth' });
    }
  }, [active]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!autoPlay.current || dialogOpen || document.hidden) return;
      setActive(nextIndex);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [dialogOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (dialogOpen) return;
      if (event.key === 'ArrowRight') {
        autoPlay.current = false;
        setActive(nextIndex);
      }
      if (event.key === 'ArrowLeft') {
        autoPlay.current = false;
        setActive(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogOpen]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    if (bgStackRef.current) {
      bgStackRef.current.style.transform = `translate(${-x * 24}px,${-y * 14}px)`;
    }
  };

  const select = (index: number) => {
    autoPlay.current = false;
    setActive(index);
  };

  return (
    <main className="hero" id="home" onMouseMove={handleMouseMove}>
      <div className="bg-stack" ref={bgStackRef}>
        {DESTINATIONS.map((destination, index) => (
          <div key={destination.id} className={`bg${index === active ? ' on' : ''}`}>
            <Scene sceneKey={destination.key} />
          </div>
        ))}
      </div>
      <div className="shade" />

      <div className="hero-in">
        <div className="info swap" key={swapKey}>
          <div className="kat">{activeDestination.category}</div>
          <h1>{activeDestination.name}</h1>
          <p className="lead">{activeDestination.description}</p>
          <Tags
            price={activeDestination.price}
            duration={activeDestination.duration}
            activity={activeDestination.activity}
            tourist={activeDestination.tourist}
          />
          <div className="px">{activeDestination.priceNote}</div>
          <div className="cta-row">
            <button className="btn primary" onClick={openDialog}>
              Cari rekomendasi
            </button>
            <a className="btn ghost" href={destinationHref(activeDestination.key)}>
              Lihat informasi wisata
            </a>
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
                onClick={() => select(index)}
              >
                <Scene sceneKey={destination.key} />
                <div className="t">
                  <small>{destination.category}</small>
                  <h3>{destination.name}</h3>
                </div>
              </button>
            ))}
          </div>

          <div className="arrows">
            <button aria-label="Sebelumnya" onClick={() => select(prevIndex(active))}>
              ‹
            </button>
            <button aria-label="Berikutnya" onClick={() => select(nextIndex(active))}>
              ›
            </button>
          </div>

          <div className="count">
            <span>{padCount(active)}</span>
            <i />
            <span>{String(TOTAL).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
