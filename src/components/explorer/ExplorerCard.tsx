import type { CSSProperties } from 'react';
import type { Destination } from '../../types';
import { formatUnlockDate } from '../../utils/explorer';
import { destinationHref } from '../../utils/router';
import { Scene } from '../ui/Scene';

interface ExplorerCardProps {
  destination: Destination;
  index: number;
  unlockedAt?: string;
}

export function ExplorerCard({ destination, index, unlockedAt }: ExplorerCardProps) {
  const unlocked = Boolean(unlockedAt);

  return (
    <article
      className={`explorer-card rv ${unlocked ? 'is-unlocked' : 'is-locked'}`}
      style={{ '--i': index % 3 } as CSSProperties}
    >
      <div className="explorer-media">
        <Scene
          sceneKey={destination.key}
          sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 980px) 45vw, 400px"
        />
        <span className="explorer-num">{String(index + 1).padStart(2, '0')}</span>
        <span className={`explorer-state ${unlocked ? 'is-open' : 'is-locked'}`}>
          {unlocked ? 'Terbuka' : 'Terkunci'}
        </span>
        {!unlocked && (
          <span className="explorer-lock" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="10" width="16" height="11" rx="2.5" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2" />
            </svg>
          </span>
        )}
      </div>

      <div className="explorer-card-body">
        <p className="explorer-cat">{destination.category}</p>
        <h3>{destination.name}</h3>

        {unlocked ? (
          <>
            <p className="explorer-desc">{destination.description}</p>
            <div className="explorer-card-foot">
              <span className="explorer-date">Dibuka {formatUnlockDate(unlockedAt ?? '')}</span>
              <a className="explorer-link" href={destinationHref(destination.key)}>
                Lihat wisata <span aria-hidden="true">→</span>
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="explorer-desc explorer-desc-locked">
              Wilayah ini masih tersegel. Temukan QR code di lokasi untuk membukanya.
            </p>
            <div className="explorer-card-foot">
              <span className="explorer-date">QR tersembunyi di area wisata</span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
