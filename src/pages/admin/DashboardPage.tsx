import { CapacityList } from '../../components/admin/dashboard/CapacityList';
import { VisitChart } from '../../components/admin/dashboard/VisitChart';
import { OrdersTable } from '../../components/admin/orders/OrdersTable';
import { useAdmin } from '../../context/AdminContext';

export function DashboardPage() {
  const { wisata, orders, navigate } = useAdmin();
  const active = wisata.filter((item) => item.status === 'Aktif');

  return (
    <>
      <div className="g2">
        <div className="box">
          <h3 className="pt" style={{ marginBottom: 10 }}>
            Kunjungan 7 hari terakhir
          </h3>
          <VisitChart />
        </div>
        <div className="box">
          <h3 className="pt" style={{ marginBottom: 14 }}>
            Kapasitas hari ini
          </h3>
          <CapacityList items={active} />
        </div>
      </div>

      <div className="box">
        <div className="bar-top">
          <h3 className="pt">Pemesanan terbaru</h3>
          <button type="button" className="mini" onClick={() => navigate('pesanan')}>
            Lihat semua
          </button>
        </div>
        <OrdersTable orders={orders.slice(0, 4)} wisata={wisata} />
      </div>
    </>
  );
}
