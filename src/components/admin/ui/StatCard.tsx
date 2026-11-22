import type { ReactNode } from 'react';
import type { AdminIconName } from '../../../types/admin';
import { AdminIcon } from './AdminIcon';

interface StatCardProps {
  icon: AdminIconName;
  label: string;
  value: ReactNode;
  meta: ReactNode;
}

export function StatCard({ icon, label, value, meta }: StatCardProps) {
  return (
    <div className="stat">
      <div className="sh">
        <span>
          <AdminIcon name={icon} size={15} />
          {label}
        </span>
        <AdminIcon name="more" size={16} />
      </div>
      <div className="sb">
        <div className="big">{value}</div>
        <div className="meta">{meta}</div>
      </div>
    </div>
  );
}
