import { GUIDE_CARDS } from '../../data/method';

export function GuideCards() {
  return (
    <div className="info3 rv">
      {GUIDE_CARDS.map((card) => (
        <div key={card.title}>
          <b>{card.title}</b>
          <span>{card.description}</span>
        </div>
      ))}
    </div>
  );
}
