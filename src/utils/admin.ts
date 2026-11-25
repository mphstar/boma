import type {
  AdminChat,
  AdminNotification,
  AdminOrder,
  AdminWisata,
  OrderStatus,
  WisataStatus,
} from '../types/admin';

export const formatRupiah = (value: number): string => `Rp${value.toLocaleString('id-ID')}`;

export const orderTotal = (order: AdminOrder, wisata: AdminWisata[]): number => {
  const destination = wisata.find((item) => item.name === order.destination);
  return (destination?.price ?? 0) * order.quantity;
};

export const quotaPercent = (wisata: AdminWisata): number =>
  Math.min(100, (wisata.quotaUsed / Math.max(wisata.quotaMax, 1)) * 100);

export const quotaColor = (wisata: AdminWisata): string => {
  if (wisata.status !== 'Aktif') return 'var(--muted)';
  const ratio = wisata.quotaUsed / Math.max(wisata.quotaMax, 1);
  if (ratio >= 0.8) return 'var(--bad)';
  if (ratio >= 0.5) return 'var(--warn)';
  return 'var(--bar)';
};

export const statusModifier = (status: WisataStatus | OrderStatus): '' | ' p' | ' x' => {
  if (status === 'Dijeda' || status === 'Menunggu') return ' p';
  if (status === 'Dibatalkan') return ' x';
  return '';
};

export function buildAdminNotifications(
  orders: AdminOrder[],
  wisata: AdminWisata[],
  chats: AdminChat[],
): AdminNotification[] {
  const notifications: AdminNotification[] = [];

  orders
    .filter((order) => order.status === 'Menunggu')
    .forEach((order) => {
      notifications.push({
        id: `o:${order.code}`,
        icon: 'tix',
        title: `Pemesanan ${order.code} menunggu pembayaran`,
        detail: `${order.customer} · ${order.destination} · ${order.quantity} tiket`,
        page: 'pesanan',
      });
    });

  wisata
    .filter((item) => item.warning)
    .forEach((item) => {
      notifications.push({
        id: `k:${item.name}`,
        icon: 'warn',
        title: `Kuota ${item.name} hampir penuh`,
        detail: `${item.quotaUsed} dari ${item.quotaMax} ${item.unit} terisi hari ini`,
        page: 'wisata',
      });
    });

  chats.forEach((chat, index) => {
    if (!chat.unread) return;
    const lastMessage = chat.messages[chat.messages.length - 1];
    notifications.push({
      id: `c:${chat.customer}`,
      icon: 'chat',
      title: `Pesan baru dari ${chat.customer}`,
      detail: lastMessage ? lastMessage.text.slice(0, 50) : '',
      page: 'chat',
      chatIndex: index,
    });
  });

  return notifications;
}

export function exportOrdersCsv(orders: AdminOrder[]): void {
  const lines = [
    'Kode,Pemesan,Wisata,Jumlah,Status,Tanggal',
    ...orders.map((order) =>
      [order.code, order.customer, order.destination, order.quantity, order.status, order.date].join(','),
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pemesanan-sai-agro.csv';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
