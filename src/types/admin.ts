export type AdminPage =
  | 'dash'
  | 'wisata'
  | 'pesanan'
  | 'chat'
  | 'jadwal'
  | 'pemandu'
  | 'lap'
  | 'qr'
  | 'set'
  | 'help';

export type AdminTheme = 'light' | 'dark' | null;

export type AdminIconName =
  | 'grid'
  | 'leaf'
  | 'tix'
  | 'chat'
  | 'cal'
  | 'usr'
  | 'doc'
  | 'qr'
  | 'set'
  | 'help'
  | 'out'
  | 'warn'
  | 'up'
  | 'more'
  | 'clock'
  | 'menu'
  | 'plus'
  | 'search'
  | 'moon'
  | 'bell';

export type WisataStatus = 'Aktif' | 'Dijeda';
export type OrderStatus = 'Lunas' | 'Menunggu' | 'Dibatalkan';
export type OrderFilter = '' | OrderStatus;
export type ChatAuthor = 'v' | 'a';

export interface AdminWisata {
  id: number;
  name: string;
  category: string;
  price: number;
  status: WisataStatus;
  quotaUsed: number;
  quotaMax: number;
  unit: string;
  emoji: string;
  guide: string;
  nextSession: string;
  warning: boolean;
  location: string;
}

export interface AdminOrder {
  code: string;
  customer: string;
  destination: string;
  quantity: number;
  status: OrderStatus;
  date: string;
}

export interface AdminMessage {
  from: ChatAuthor;
  text: string;
}

export interface AdminChat {
  customer: string;
  unread: number;
  messages: AdminMessage[];
}

export interface AdminSession {
  day: string;
  time: string;
  destination: string;
  guide: string;
}

export interface AdminGuide {
  name: string;
  destination: string;
  onDuty: boolean;
}

export interface AdminSettingFlags {
  notifyOrders: boolean;
  autoCloseRain: boolean;
  autoConfirmPayment: boolean;
}

export type AdminSettingFlag = keyof AdminSettingFlags;

export interface AdminSettings {
  areaName: string;
  location: string;
  flags: AdminSettingFlags;
}

export interface AdminNavItem {
  icon: AdminIconName;
  label: string;
  page: AdminPage;
}

export interface AdminNotification {
  id: string;
  icon: 'tix' | 'warn' | 'chat';
  title: string;
  detail: string;
  page: AdminPage;
  chatIndex?: number;
}
