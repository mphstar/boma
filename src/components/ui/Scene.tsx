import { useMemo } from 'react';
import { PHOTOS, type PhotoVariant } from '../../data/photos';
import { buildSceneSvg } from '../../utils/scene';

interface SceneProps {
  sceneKey: string;
  variant?: PhotoVariant;
  priority?: boolean;
  sizes?: string;
  /** Latar penuh layar: potret memakai foto kartu supaya tidak ter-zoom berlebihan. */
  portraitCard?: boolean;
}

export function Scene({
  sceneKey,
  variant = 'card',
  priority = false,
  sizes = '100vw',
  portraitCard = false,
}: SceneProps) {
  const entry = PHOTOS[sceneKey];
  const photo = entry?.[variant];
  const markup = useMemo(() => (photo ? '' : buildSceneSvg(sceneKey)), [photo, sceneKey]);

  if (!photo) {
    return <div className="scene" aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />;
  }

  const image = (
    <img
      className="scene"
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );

  if (!portraitCard || variant === 'card' || !entry) return image;

  return (
    <picture>
      <source media="(orientation: portrait)" srcSet={entry.card.srcSet} sizes={sizes} />
      {image}
    </picture>
  );
}
