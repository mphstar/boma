import { REVENUE_HISTORY } from '../data/admin';
import type { AdminOrder, AdminWisata, OrderStatus } from '../types/admin';
import { orderTotal } from './admin';

export interface ReportRankingRow {
  id: number;
  label: string;
  revenue: number;
  tickets: number;
  share: number;
}

export interface ReportStatus {
  status: OrderStatus;
  count: number;
  color: string;
}

export interface AdminReport {
  paidOrders: AdminOrder[];
  totalRevenue: number;
  totalOrders: number;
  ticketsSold: number;
  averageTransaction: number;
  ranking: ReportRankingRow[];
  statuses: ReportStatus[];
  monthlyValues: number[];
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  Lunas: 'var(--ok)',
  Menunggu: 'var(--warn)',
  Dibatalkan: 'var(--bad)',
};

export function buildAdminReport(wisata: AdminWisata[], orders: AdminOrder[]): AdminReport {
  const paidOrders = orders.filter((order) => order.status === 'Lunas');
  const totalRevenue = paidOrders.reduce((sum, order) => sum + orderTotal(order, wisata), 0);
  const ticketsSold = paidOrders.reduce((sum, order) => sum + order.quantity, 0);

  const ranking = wisata
    .map((item) => {
      const rows = paidOrders.filter((order) => order.destination === item.name);
      const revenue = rows.reduce((sum, order) => sum + orderTotal(order, wisata), 0);
      return {
        id: item.id,
        label: `${item.emoji} ${item.name}`,
        revenue,
        tickets: rows.reduce((sum, order) => sum + order.quantity, 0),
        share: Math.round((revenue / Math.max(totalRevenue, 1)) * 100),
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  const statuses = (['Lunas', 'Menunggu', 'Dibatalkan'] as const).map((status) => ({
    status,
    count: orders.filter((order) => order.status === status).length,
    color: STATUS_COLORS[status],
  }));

  return {
    paidOrders,
    totalRevenue,
    totalOrders: orders.length,
    ticketsSold,
    averageTransaction: Math.round(totalRevenue / Math.max(paidOrders.length, 1)),
    ranking,
    statuses,
    monthlyValues: [...REVENUE_HISTORY, Number((totalRevenue / 1_000_000).toFixed(2))],
  };
}
