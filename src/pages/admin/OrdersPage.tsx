import { useEffect, useState } from 'react';
import { OrdersTable } from '../../components/admin/orders/OrdersTable';
import { Pagination } from '../../components/admin/ui/Pagination';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { ORDER_FILTERS, ORDER_PAGE_SIZE } from '../../data/admin';
import type { OrderFilter } from '../../types/admin';

const FILTER_LABEL: Record<OrderFilter, string> = {
  '': 'Semua status',
  Lunas: 'Lunas',
  Menunggu: 'Menunggu',
  Dibatalkan: 'Dibatalkan',
};

export function OrdersPage() {
  const { orders, wisata, orderFilter, setOrderFilter, confirmOrder } = useAdmin();
  const toast = useToast();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [orderFilter]);

  const filtered = orderFilter ? orders.filter((order) => order.status === orderFilter) : orders;
  const pageCount = Math.max(1, Math.ceil(filtered.length / ORDER_PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const start = (currentPage - 1) * ORDER_PAGE_SIZE;
  const visible = filtered.slice(start, start + ORDER_PAGE_SIZE);

  const handleConfirm = (code: string) => {
    confirmOrder(code);
    toast(`Pemesanan ${code} dikonfirmasi`);
  };

  return (
    <div className="box col">
      <div className="bar-top">
        <h3 className="pt">Pemesanan</h3>
        <select
          className="sel"
          aria-label="Filter status"
          value={orderFilter}
          onChange={(event) => setOrderFilter(event.target.value as OrderFilter)}
        >
          {ORDER_FILTERS.map((status) => (
            <option key={status || 'all'} value={status}>
              {FILTER_LABEL[status]}
            </option>
          ))}
        </select>
      </div>

      <OrdersTable
        orders={visible}
        wisata={wisata}
        showAction
        onConfirm={handleConfirm}
      />

      <Pagination
        page={currentPage}
        pageCount={pageCount}
        total={filtered.length}
        rangeStart={start}
        rangeEnd={start + visible.length}
        onChange={setPage}
      />
    </div>
  );
}
