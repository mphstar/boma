import { useState } from 'react';
import { VISIT_DAYS, VISIT_VALUES } from '../../../data/admin';

const WIDTH = 520;
const HEIGHT = 200;
const MAX = 300;
const SLOT = (WIDTH - 60) / 6;

export function VisitChart() {
  const [active, setActive] = useState<number | null>(null);

  const points = VISIT_VALUES.map((value, index) => ({
    x: 40 + (index * (WIDTH - 60)) / 6,
    y: HEIGHT - 30 - (value / MAX) * (HEIGHT - 50),
    value,
    day: VISIT_DAYS[index],
  }));
  const line = points.map((point) => `${point.x},${point.y}`).join(' ');
  const first = points[0];
  const last = points[points.length - 1];
  const activePoint = active === null ? null : points[active];

  return (
    <div className="chart" onMouseLeave={() => setActive(null)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Grafik kunjungan 7 hari"
      >
        {[0, 100, 200, 300].map((value) => {
          const y = HEIGHT - 30 - (value / MAX) * (HEIGHT - 50);
          return (
            <g key={value}>
              <line x1={35} x2={WIDTH - 10} y1={y} y2={y} stroke="var(--line)" />
              <text x={30} y={y + 4} fontSize={10} textAnchor="end" fill="var(--muted)">
                {value}
              </text>
            </g>
          );
        })}
        <polygon
          points={`${line} ${last.x},${HEIGHT - 30} ${first.x},${HEIGHT - 30}`}
          fill="var(--bar)"
          opacity={0.12}
        />
        <polyline points={line} fill="none" stroke="var(--bar)" strokeWidth={3} strokeLinejoin="round" />
        {activePoint && (
          <line
            x1={activePoint.x}
            x2={activePoint.x}
            y1={activePoint.y}
            y2={HEIGHT - 30}
            stroke="var(--bar)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            opacity={0.45}
          />
        )}
        {points.map((point, index) => (
          <g key={point.day}>
            <circle
              cx={point.x}
              cy={point.y}
              r={active === index ? 6 : 4}
              fill="var(--bar)"
              stroke={active === index ? 'var(--card)' : 'none'}
              strokeWidth={active === index ? 2.5 : 0}
            />
            <text
              x={point.x}
              y={HEIGHT - 10}
              fontSize={11}
              textAnchor="middle"
              fill="var(--muted)"
            >
              {point.day}
            </text>
          </g>
        ))}
        {points.map((point, index) => (
          <rect
            key={`hit-${point.day}`}
            className="chart-hit"
            x={point.x - SLOT / 2}
            y={10}
            width={SLOT}
            height={HEIGHT - 40}
            onMouseEnter={() => setActive(index)}
          />
        ))}
      </svg>
      {activePoint && (
        <div
          className="chart-tip"
          style={{
            left: `${Math.min(90, Math.max(10, (activePoint.x / WIDTH) * 100))}%`,
            top: `${(activePoint.y / HEIGHT) * 100}%`,
          }}
        >
          <b>{activePoint.value} pengunjung</b>
          <small>{activePoint.day}</small>
        </div>
      )}
    </div>
  );
}
