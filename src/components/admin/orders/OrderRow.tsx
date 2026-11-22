import type { AdminOrder } from '../../../types/admin';
import { formatRupiah } from '../../../utils/admin';
import { StatusChip } from '../ui/StatusChip';

interface OrderRowProps {
  order: AdminOrder;
  total: number;
  showAction: boolean;
  onConfirm?: (code: string) => void;
}

export function OrderRow({ order, total, showAction, onConfirm }: OrderRowProps) {
  return (
    <tr>
      <td>
        <b>{order.code}</b>
      </td>
      <td>{order.customer}</td>
      <td>{order.destination}</td>
      <td>{order.quantity}</td>
      <td>{formatRupiah(total)}</td>
      <td>
        <StatusChip status={order.status} />
      </td>
      <td>{order.date}</td>
      {showAction && (
        <td>
          {order.status === 'Menunggu' && (
            <button type="button" className="mini" onClick={() => onConfirm?.(order.code)}>
              Konfirmasi
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
