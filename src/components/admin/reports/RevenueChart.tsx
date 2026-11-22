import { useState } from 'react';
import { REVENUE_MONTHS } from '../../../data/admin';

const WIDTH = 520;
const HEIGHT = 200;

export function RevenueChart({ values }: { values: number[] }) {
  const [active, setActive] = useState<number | null>(null);
  const lastIndex = values.length - 1;
  const activeValue = active === null ? null : values[active];

  return (
    <div className="chart" onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Grafik pendapatan bulanan">
        <line x1={40} x2={510} y1={170} y2={170} stroke="var(--line)" />
        {values.map((value, index) => {
          const x = 50 + index * 76;
          const height = (value / 7) * 140;
          const y = 170 - height;
          return (
            <g key={REVENUE_MONTHS[index]}>
              <rect
                x={x}
                y={y}
                width={48}
                height={height}
                rx={8}
                fill="var(--bar)"
                opacity={active === index || (active === null && index === lastIndex) ? 1 : 0.35}
              />
              <text
                x={x + 24}
                y={y - 6}
                fontSize={11}
                textAnchor="middle"
                fill="var(--ink)"
                fontWeight={active === index ? 700 : 400}
              >
                {String(value).replace('.', ',')}
              </text>
              <text
                x={x + 24}
                y={190}
                fontSize={11}
                textAnchor="middle"
                fill="var(--muted)"
              >
                {REVENUE_MONTHS[index]}
                {index === lastIndex ? '*' : ''}
              </text>
              <rect
                className="chart-hit"
                x={x - 12}
                y={10}
                width={72}
                height={162}
                onMouseEnter={() => setActive(index)}
              />
            </g>
          );
        })}
      </svg>
      {activeValue !== null && active !== null && (
        <div
          className="chart-tip"
          style={{
            left: `${Math.min(90, Math.max(10, ((50 + active * 76 + 24) / WIDTH) * 100))}%`,
            top: `${((170 - (activeValue / 7) * 140) / HEIGHT) * 100}%`,
          }}
        >
          <b>Rp {String(activeValue).replace('.', ',')} jt</b>
          <small>{REVENUE_MONTHS[active]}</small>
        </div>
      )}
    </div>
  );
}
