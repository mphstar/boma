import { useAdmin } from '../../../context/AdminContext';
import { StatCard } from './StatCard';

export function StatsRow() {
  const { wisata, orders } = useAdmin();
  const active = wisata.filter((item) => item.status === 'Aktif');
  const paused = wisata.length - active.length;
  const waiting = orders.filter((order) => order.status === 'Menunggu').length;
  const warnings = wisata.filter((item) => item.warning).length;
  const occupancy = Math.round(
    (active.reduce((sum, item) => sum + item.quotaUsed / Math.max(item.quotaMax, 1), 0) /
      Math.max(active.length, 1)) *
      100,
  );

  return (
    <div className="stats">
      <StatCard
        icon="clock"
        label="Rata-rata okupansi"
        value={
          <>
            {occupancy}
            <em>%</em>
          </>
        }
        meta={
          <>
            <b>▲ +4%</b> W-o-W
          </>
        }
      />
      <StatCard
        icon="leaf"
        label="Wisata aktif"
        value={String(active.length)}
        meta={
          <>
            <b>{paused}</b> sedang dijeda
          </>
        }
      />
      <StatCard
        icon="tix"
        label="Menunggu pembayaran"
        value={String(waiting)}
        meta={
          <>
            Dalam <b>24 jam</b>
          </>
        }
      />
      <StatCard
        icon="warn"
        label="Peringatan kuota"
        value={String(warnings)}
        meta={
          <>
            <span className="dot" style={{ background: 'var(--warn)' }} />
            {warnings ? 'Risiko sedang' : 'Aman'}
          </>
        }
      />
    </div>
  );
}
