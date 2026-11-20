import type { ActivityLevel, Duration, PriceLevel, TouristType } from '../../types';

interface TagsProps {
  price: PriceLevel;
  duration: Duration;
  activity: ActivityLevel;
  tourist: TouristType;
}

export function Tags({ price, duration, activity, tourist }: TagsProps) {
  return (
    <div className="tags">
      <span className="pr">{price}</span>
      <span>{duration}</span>
      <span>{activity}</span>
      <span>{tourist}</span>
    </div>
  );
}
