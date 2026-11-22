import type {
  AdminChat,
  AdminGuide,
  AdminNavItem,
  AdminOrder,
  AdminSession,
  AdminSettingFlag,
  AdminSettings,
  AdminWisata,
} from '../types/admin';

export const ADMIN_PRIMARY_NAV: AdminNavItem[] = [
  { icon: 'grid', label: 'Dashboard', page: 'dash' },
  { icon: 'leaf', label: 'Katalog Wisata', page: 'wisata' },
  { icon: 'tix', label: 'Pemesanan', page: 'pesanan' },
  { icon: 'chat', label: 'Chat Pengunjung', page: 'chat' },
  { icon: 'cal', label: 'Jadwal', page: 'jadwal' },
  { icon: 'usr', label: 'Pemandu', page: 'pemandu' },
  { icon: 'doc', label: 'Laporan', page: 'lap' },
];

export const ADMIN_SECONDARY_NAV: AdminNavItem[] = [
  { icon: 'qr', label: 'QR Debug', page: 'qr' },
  { icon: 'set', label: 'Pengaturan', page: 'set' },
  { icon: 'help', label: 'Bantuan', page: 'help' },
];

export const WISATA_TABS = ['Semua', 'Aktif', 'Dijeda'] as const;
export type WisataTab = (typeof WISATA_TABS)[number];

export const ORDER_FILTERS = ['', 'Lunas', 'Menunggu', 'Dibatalkan'] as const;
export const ORDER_PAGE_SIZE = 5;

export const initialWisata: AdminWisata[] = [
  {
    id: 1,
    name: 'Air Terjun Tancak',
    category: 'Alam',
    price: 5000,
    status: 'Aktif',
    quotaUsed: 82,
    quotaMax: 100,
    unit: 'tiket',
    emoji: '💧',
    guide: 'Pak Hadi',
    nextSession: 'Hari ini, 13:00',
    warning: true,
    location: 'Desa Suci, Panti',
  },
  {
    id: 2,
    name: 'Kebun Kopi',
    category: 'Agrowisata',
    price: 35000,
    status: 'Aktif',
    quotaUsed: 46,
    quotaMax: 80,
    unit: 'tiket',
    emoji: '☕',
    guide: 'Bu Sari',
    nextSession: 'Hari ini, 15:00',
    warning: false,
    location: 'Gunung Pasang',
  },
  {
    id: 3,
    name: 'Kebun Karet',
    category: 'Agrowisata',
    price: 30000,
    status: 'Aktif',
    quotaUsed: 22,
    quotaMax: 60,
    unit: 'tiket',
    emoji: '🌳',
    guide: 'Pak Joko',
    nextSession: '23 Nov, 08:00',
    warning: false,
    location: 'Gunung Pasang',
  },
  {
    id: 4,
    name: 'Jeep Adventure',
    category: 'Petualangan',
    price: 350000,
    status: 'Aktif',
    quotaUsed: 4,
    quotaMax: 6,
    unit: 'unit',
    emoji: '🚙',
    guide: 'Mas Dimas',
    nextSession: '22 Nov, 16:00',
    warning: false,
    location: 'Jalur perkebunan',
  },
  {
    id: 5,
    name: 'Goa',
    category: 'Petualangan',
    price: 25000,
    status: 'Dijeda',
    quotaUsed: 0,
    quotaMax: 40,
    unit: 'tiket',
    emoji: '🦇',
    guide: 'Pak Eko',
    nextSession: '-',
    warning: false,
    location: 'Kawasan Gunung Pasang',
  },
  {
    id: 6,
    name: 'Candi',
    category: 'Sejarah',
    price: 15000,
    status: 'Dijeda',
    quotaUsed: 0,
    quotaMax: 50,
    unit: 'tiket',
    emoji: '🛕',
    guide: 'Bu Lestari',
    nextSession: '-',
    warning: false,
    location: 'Kawasan Gunung Pasang',
  },
];

export const initialOrders: AdminOrder[] = [
  { code: 'BM-1042', customer: 'Rina Wulandari', destination: 'Air Terjun Tancak', quantity: 4, status: 'Lunas', date: '22 Nov' },
  { code: 'BM-1041', customer: 'Dimas Pratama', destination: 'Jeep Adventure', quantity: 1, status: 'Lunas', date: '22 Nov' },
  { code: 'BM-1040', customer: 'Siti Aminah', destination: 'Kebun Kopi', quantity: 6, status: 'Menunggu', date: '21 Nov' },
  { code: 'BM-1039', customer: 'Budi Santoso', destination: 'Goa', quantity: 3, status: 'Lunas', date: '21 Nov' },
  { code: 'BM-1038', customer: 'Maya Putri', destination: 'Kebun Karet', quantity: 2, status: 'Dibatalkan', date: '20 Nov' },
  { code: 'BM-1037', customer: 'Eko Hartono', destination: 'Air Terjun Tancak', quantity: 5, status: 'Lunas', date: '20 Nov' },
  { code: 'BM-1036', customer: 'Lestari Dewi', destination: 'Candi', quantity: 2, status: 'Menunggu', date: '19 Nov' },
  { code: 'BM-1035', customer: 'Yoga Aditya', destination: 'Jeep Adventure', quantity: 2, status: 'Lunas', date: '18 Nov' },
  { code: 'BM-1034', customer: 'Nadia Safitri', destination: 'Kebun Kopi', quantity: 3, status: 'Lunas', date: '18 Nov' },
  { code: 'BM-1033', customer: 'Hendra Wijaya', destination: 'Air Terjun Tancak', quantity: 6, status: 'Lunas', date: '17 Nov' },
  { code: 'BM-1032', customer: 'Putri Ayu', destination: 'Kebun Karet', quantity: 4, status: 'Menunggu', date: '17 Nov' },
  { code: 'BM-1031', customer: 'Rizky Fauzan', destination: 'Goa', quantity: 2, status: 'Dibatalkan', date: '16 Nov' },
  { code: 'BM-1030', customer: 'Anita Rahma', destination: 'Candi', quantity: 5, status: 'Lunas', date: '16 Nov' },
];

export const initialChats: AdminChat[] = [
  {
    customer: 'Rina Wulandari',
    unread: 0,
    messages: [
      { from: 'v', text: 'Halo, apakah Air Terjun Tancak buka hari ini?' },
      { from: 'a', text: 'Halo Kak, buka ya. Disarankan datang pagi hari.' },
    ],
  },
  {
    customer: 'Dimas Pratama',
    unread: 1,
    messages: [{ from: 'v', text: 'Berapa harga paket jeep untuk 4 orang?' }],
  },
  {
    customer: 'Siti Aminah',
    unread: 1,
    messages: [{ from: 'v', text: 'Bisa reschedule tur kebun kopi ke hari Minggu?' }],
  },
];

export const initialSessions: AdminSession[] = [
  { day: 'Sen', time: '08:00', destination: 'Kebun Karet', guide: 'Pak Joko' },
  { day: 'Sen', time: '13:00', destination: 'Air Terjun Tancak', guide: 'Pak Hadi' },
  { day: 'Sel', time: '09:00', destination: 'Kebun Kopi', guide: 'Bu Sari' },
  { day: 'Rab', time: '10:00', destination: 'Jeep Adventure', guide: 'Mas Dimas' },
  { day: 'Kam', time: '08:00', destination: 'Kebun Karet', guide: 'Pak Joko' },
  { day: 'Jum', time: '13:00', destination: 'Air Terjun Tancak', guide: 'Pak Hadi' },
  { day: 'Sab', time: '09:00', destination: 'Kebun Kopi', guide: 'Bu Sari' },
  { day: 'Sab', time: '16:00', destination: 'Jeep Adventure', guide: 'Mas Dimas' },
  { day: 'Min', time: '08:00', destination: 'Air Terjun Tancak', guide: 'Pak Hadi' },
];

export const WEEK_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export const initialGuides: AdminGuide[] = [
  { name: 'Pak Hadi', destination: 'Air Terjun Tancak', onDuty: true },
  { name: 'Bu Sari', destination: 'Kebun Kopi', onDuty: true },
  { name: 'Pak Joko', destination: 'Kebun Karet', onDuty: true },
  { name: 'Mas Dimas', destination: 'Jeep Adventure', onDuty: true },
  { name: 'Pak Eko', destination: 'Goa', onDuty: false },
  { name: 'Bu Lestari', destination: 'Candi', onDuty: false },
];

export const initialSettings: AdminSettings = {
  areaName: 'BOMA Gunung Pasang',
  location: 'Jember, Jawa Timur',
  flags: {
    notifyOrders: true,
    autoCloseRain: true,
    autoConfirmPayment: false,
  },
};

export const SETTING_TOGGLES: { key: AdminSettingFlag; title: string; detail: string }[] = [
  {
    key: 'notifyOrders',
    title: 'Notifikasi pemesanan baru',
    detail: 'Tampilkan badge saat ada pemesanan masuk',
  },
  {
    key: 'autoCloseRain',
    title: 'Tutup otomatis saat hujan lebat',
    detail: 'Jeda wisata alam demi keselamatan pengunjung',
  },
  {
    key: 'autoConfirmPayment',
    title: 'Konfirmasi pembayaran otomatis',
    detail: 'Pemesanan langsung berstatus lunas',
  },
];

export const VISIT_DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
export const VISIT_VALUES = [120, 95, 110, 140, 160, 230, 260];

export const REVENUE_MONTHS = ['Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'];
export const REVENUE_HISTORY = [3.2, 4.1, 5.4, 4.6, 5.8];

export const HELP_FAQ: [string, string][] = [
  [
    'Bagaimana menambah wisata baru?',
    'Buka Katalog Wisata, klik Tambah Wisata, isi nama dan harga, lalu simpan. Wisata baru berstatus Dijeda sampai Anda mengaktifkannya.',
  ],
  [
    'Bagaimana mengonfirmasi pembayaran?',
    'Buka menu Pemesanan lalu klik Konfirmasi pada pemesanan berstatus Menunggu.',
  ],
  [
    'Bagaimana menjeda wisata?',
    'Di Katalog Wisata, klik tombol panah pada kartu wisata lalu pilih Jeda wisata.',
  ],
  [
    'Di mana melihat laporan?',
    'Buka menu Laporan untuk melihat pendapatan per wisata dan mengekspor data.',
  ],
];
