import type { AdminWisata } from '../../../types/admin';
import { formatRupiah, quotaColor, quotaPercent } from '../../../utils/admin';
import { AdminIcon } from '../ui/AdminIcon';
import { ProgressBar } from '../ui/ProgressBar';
import { StatusChip } from '../ui/StatusChip';

interface WisataCardProps {
  wisata: AdminWisata;
  onDetail: () => void;
}

export function WisataCard({ wisata, onDetail }: WisataCardProps) {
  return (
    <div className="c">
      <div className="ch">
        <div className="th">{wisata.emoji}</div>
        <div className="grow">
          <h4>{wisata.name}</h4>
          <p>
            {wisata.category} • {formatRupiah(wisata.price)}
          </p>
        </div>
        <StatusChip status={wisata.status} />
        {wisata.warning && (
          <span className="al">
            <AdminIcon name="warn" size={14} />
          </span>
        )}
      </div>

      <div className="pr">
        <span>
          {wisata.quotaUsed} / {wisata.quotaMax} {wisata.unit}
        </span>
        <span>{wisata.quotaMax - wisata.quotaUsed} tersisa</span>
      </div>
      <ProgressBar percent={quotaPercent(wisata)} color={quotaColor(wisata)} />

      <div className="ft">
        <div>
          <span>
            <small>Pemandu</small>
            <b>{wisata.guide}</b>
          </span>
          <span>
            <small>Sesi berikutnya</small>
            <b>{wisata.nextSession}</b>
          </span>
        </div>
        <button
          type="button"
          className="go"
          aria-label={`Detail ${wisata.name}`}
          onClick={onDetail}
        >
          <AdminIcon name="up" size={16} />
        </button>
      </div>
    </div>
  );
}
