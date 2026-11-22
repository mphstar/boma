import { useMemo } from 'react';
import { RevenueChart } from '../../components/admin/reports/RevenueChart';
import { StatusDonut } from '../../components/admin/reports/StatusDonut';
import { AdminIcon } from '../../components/admin/ui/AdminIcon';
import { AdminTable } from '../../components/admin/ui/AdminTable';
import { ProgressBar } from '../../components/admin/ui/ProgressBar';
import { useAdmin } from '../../context/AdminContext';
import type { AdminIconName } from '../../types/admin';
import { exportOrdersCsv, formatRupiah } from '../../utils/admin';
import { buildAdminReport } from '../../utils/adminReport';

export function ReportsPage() {
  const { wisata, orders } = useAdmin();
  const report = useMemo(() => buildAdminReport(wisata, orders), [wisata, orders]);

  const kpis: { icon: AdminIconName; label: string; value: string; meta: string }[] = [
    {
      icon: 'doc',
      label: 'Total pendapatan',
      value: formatRupiah(report.totalRevenue),
      meta: '▲ 8% dari bulan lalu',
    },
    {
      icon: 'tix',
      label: 'Transaksi lunas',
      value: String(report.paidOrders.length),
      meta: `dari ${report.totalOrders} pemesanan`,
    },
    {
      icon: 'usr',
      label: 'Tiket terjual',
      value: String(report.ticketsSold),
      meta: 'semua wisata',
    },
    {
      icon: 'clock',
      label: 'Rata-rata transaksi',
      value: formatRupiah(report.averageTransaction),
      meta: 'per pemesanan lunas',
    },
  ];

  return (
    <>
      <div className="bar-top" style={{ margin: 0 }}>
        <div>
          <h3 className="pt" style={{ fontSize: 18 }}>
            Laporan Pendapatan
          </h3>
          <small className="muted">Dihitung dari pemesanan berstatus lunas</small>
        </div>
        <button type="button" className="add" onClick={() => exportOrdersCsv(orders)}>
          Ekspor CSV
        </button>
      </div>

      <div className="stats">
        {kpis.map((kpi) => (
          <div className="stat" key={kpi.label}>
            <div className="sh">
              <span>
                <AdminIcon name={kpi.icon} size={15} />
                {kpi.label}
              </span>
            </div>
            <div className="big" style={{ fontSize: 26 }}>
              {kpi.value}
            </div>
            <div className="meta" style={{ textAlign: 'left', marginTop: 8 }}>
              {kpi.meta}
            </div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="box">
          <h3 className="pt" style={{ marginBottom: 6 }}>
            Pendapatan 6 bulan terakhir
          </h3>
          <RevenueChart values={report.monthlyValues} />
          <small className="muted">Dalam juta rupiah. * bulan berjalan</small>
        </div>
        <div className="box">
          <h3 className="pt" style={{ marginBottom: 10 }}>
            Status pemesanan
          </h3>
          <StatusDonut total={report.totalOrders} statuses={report.statuses} />
        </div>
      </div>

      <div className="box">
        <h3 className="pt" style={{ marginBottom: 6 }}>
          Peringkat wisata
        </h3>
        <AdminTable head={['#', 'Wisata', 'Tiket', 'Pendapatan', 'Kontribusi']}>
          {report.ranking.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>
                <b>{row.label}</b>
              </td>
              <td>{row.tickets}</td>
              <td>{formatRupiah(row.revenue)}</td>
              <td>
                <div className="contrib">
                  <ProgressBar
                    percent={row.share}
                    color="var(--bar)"
                    style={{ flex: 1, margin: 0 }}
                  />
                  <span>{row.share}%</span>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </>
  );
}
