import type { CSSProperties } from 'react';
import type { Destination } from '../../types';
import { Scene } from '../ui/Scene';
import { Tags } from '../ui/Tags';
import { destinationHref } from '../../utils/router';

interface CatalogCardProps {
  destination: Destination;
  index: number;
  hidden: boolean;
  recommended: boolean;
}

export function CatalogCard({ destination, index, hidden, recommended }: CatalogCardProps) {
  const className = ['card', 'rv', recommended ? 'rec' : ''].filter(Boolean).join(' ');

  return (
    <article
      className={className}
      hidden={hidden}
      style={{ '--i': index % 3 } as CSSProperties}
    >
      <a className="card-link" href={destinationHref(destination.key)} aria-label={`Lihat ${destination.name}`}>
        <div className="ph">
          <Scene
            sceneKey={destination.key}
            sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 980px) 45vw, 400px"
          />
          <em>{destination.category}</em>
          {recommended && <span className="badge">Rekomendasi untuk Anda</span>}
        </div>
        <div className="bd">
          <h3>{destination.name}</h3>
          <p>{destination.description}</p>
          <div className="card-bottom">
            <Tags
              price={destination.price}
              duration={destination.duration}
              activity={destination.activity}
              tourist={destination.tourist}
            />
            <span className="card-action">Lihat informasi</span>
          </div>
        </div>
      </a>
    </article>
  );
}
