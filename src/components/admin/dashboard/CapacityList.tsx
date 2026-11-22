import type { AdminWisata } from '../../../types/admin';
import { quotaColor, quotaPercent } from '../../../utils/admin';
import { ProgressBar } from '../ui/ProgressBar';

export function CapacityList({ items }: { items: AdminWisata[] }) {
  if (!items.length) return <p className="muted">Belum ada wisata aktif.</p>;

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="cap-row">
          <div className="pr">
            <span>
              {item.emoji} {item.name}
            </span>
            <span>
              {item.quotaUsed}/{item.quotaMax}
            </span>
          </div>
          <ProgressBar
            percent={quotaPercent(item)}
            color={quotaColor(item)}
            style={{ marginTop: 6 }}
          />
        </div>
      ))}
    </>
  );
}
