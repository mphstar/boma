import { useMemo } from 'react';
import { PHOTOS } from '../../data/photos';
import { buildSceneSvg } from '../../utils/scene';

interface SceneProps {
  sceneKey: string;
}

export function Scene({ sceneKey }: SceneProps) {
  const markup = useMemo(() => buildSceneSvg(sceneKey), [sceneKey]);
  const photo = PHOTOS[sceneKey];

  if (photo) {
    return <img className="scene" src={photo} alt="" loading="lazy" />;
  }

  return <div className="scene" aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />;
}
