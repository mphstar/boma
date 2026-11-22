import type { CSSProperties } from 'react';

interface ProgressBarProps {
  percent: number;
  color: string;
  style?: CSSProperties;
}

export function ProgressBar({ percent, color, style }: ProgressBarProps) {
  return (
    <div className="trk" style={style}>
      <i style={{ width: `${percent}%`, background: color }} />
    </div>
  );
}
