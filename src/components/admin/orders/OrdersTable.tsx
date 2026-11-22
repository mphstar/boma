import type { AdminOrder, AdminWisata } from '../../../types/admin';
import { orderTotal } from '../../../utils/admin';
import { AdminTable } from '../ui/AdminTable';
import { OrderRow } from './OrderRow';

interface OrdersTableProps {
  orders: AdminOrder[];
  wisata: AdminWisata[];
  showAction?: boolean;
  onConfirm?: (code: string) => void;
}

export function OrdersTable({ orders, wisata, showAction = false, onConfirm }: OrdersTableProps) {
  const head = [
    'Kode',
    'Pemesan',
    'Wisata',
    'Jml',
    'Total',
    'Status',
    'Tanggal',
    ...(showAction ? [''] : []),
  ];

  return (
    <AdminTable head={head}>
      {orders.length ? (
        orders.map((order) => (
          <OrderRow
            key={order.code}
            order={order}
            total={orderTotal(order, wisata)}
            showAction={showAction}
            onConfirm={onConfirm}
          />
        ))
      ) : (
        <tr>
          <td className="empty-cell" colSpan={head.length}>
            Tidak ada pemesanan.
          </td>
        </tr>
      )}
    </AdminTable>
  );
}
