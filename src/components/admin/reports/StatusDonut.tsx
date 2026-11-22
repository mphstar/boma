import { useState } from 'react';
import type { ReportStatus } from '../../../utils/adminReport';

interface StatusDonutProps {
  total: number;
  statuses: ReportStatus[];
}

export function StatusDonut({ total, statuses }: StatusDonutProps) {
  const [active, setActive] = useState<string | null>(null);
  const circumference = 2 * Math.PI * 54;
  let offset = 0;

  const activeStatus = statuses.find((status) => status.status === active) ?? null;

  return (
    <div className="donut">
      <svg
        viewBox="0 0 140 140"
        width={140}
        height={140}
        role="img"
        aria-label="Status pemesanan"
        onMouseLeave={() => setActive(null)}
      >
        <circle r={54} cx={70} cy={70} fill="none" stroke="var(--line)" strokeWidth={18} />
        {statuses.map((segment) => {
          const dash = (segment.count / Math.max(total, 1)) * circumference;
          const isActive = segment.status === active;
          const circle = (
            <circle
              key={segment.status}
              className="donut-seg"
              r={54}
              cx={70}
              cy={70}
              fill="none"
              stroke={segment.color}
              strokeWidth={isActive ? 22 : 18}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
              opacity={active && !isActive ? 0.4 : 1}
              tabIndex={0}
              aria-label={`${segment.status}: ${segment.count} pemesanan`}
              onMouseEnter={() => setActive(segment.status)}
              onFocus={() => setActive(segment.status)}
              onBlur={() => setActive(null)}
            />
          );
          offset += dash;
          return circle;
        })}
        <text x={70} y={68} textAnchor="middle" fontSize={24} fontWeight={600} fill="var(--ink)">
          {activeStatus ? activeStatus.count : total}
        </text>
        <text x={70} y={86} textAnchor="middle" fontSize={10} fill="var(--muted)">
          {activeStatus ? activeStatus.status : 'pemesanan'}
        </text>
      </svg>
      <div className="donut-legend">
        {statuses.map((status) => {
          const isActive = status.status === active;
          return (
            <div
              className="pr"
              key={status.status}
              onMouseEnter={() => setActive(status.status)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: 'pointer', opacity: active && !isActive ? 0.45 : 1 }}
            >
              <span>
                <span className="dot" style={{ background: status.color }} />
                {status.status}
              </span>
              <span>
                {status.count} ({Math.round((status.count / Math.max(total, 1)) * 100)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
