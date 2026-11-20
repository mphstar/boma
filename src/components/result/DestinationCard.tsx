import type { CSSProperties } from 'react';
import type { Destination } from '../../types';
import { Scene } from '../ui/Scene';
import { Tags } from '../ui/Tags';
import { destinationHref } from '../../utils/router';

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <article className="dcard rv" style={{ '--i': index } as CSSProperties}>
      <Scene sceneKey={destination.key} />
      <div className="tx">
        <div className="tags" style={{ margin: 0 }}>
          <span>{destination.category}</span>
        </div>
        <h5>{destination.name}</h5>
        <p>{destination.description}</p>
        <Tags
          price={destination.price}
          duration={destination.duration}
          activity={destination.activity}
          tourist={destination.tourist}
        />
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--sand)' }}>{destination.priceNote}</p>
        <a className="detail-link" href={destinationHref(destination.key)}>
          Lihat informasi wisata
        </a>
      </div>
    </article>
  );
}
