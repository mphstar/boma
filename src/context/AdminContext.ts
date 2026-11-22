import { createContext, useContext } from 'react';
import type {
  AdminChat,
  AdminGuide,
  AdminNotification,
  AdminOrder,
  AdminPage,
  AdminSettings,
  AdminSession,
  AdminWisata,
  OrderFilter,
} from '../types/admin';

export interface AdminContextValue {
  page: AdminPage;
  navigate: (page: AdminPage) => void;
  search: string;
  setSearch: (value: string) => void;
  wisata: AdminWisata[];
  toggleWisata: (id: number) => void;
  addWisata: (name: string, price: number) => void;
  orders: AdminOrder[];
  confirmOrder: (code: string) => void;
  orderFilter: OrderFilter;
  setOrderFilter: (filter: OrderFilter) => void;
  chats: AdminChat[];
  activeChat: number;
  selectChat: (index: number) => void;
  sendMessage: (text: string) => void;
  sessions: AdminSession[];
  guides: AdminGuide[];
  toggleGuide: (index: number) => void;
  settings: AdminSettings;
  saveSettings: (settings: AdminSettings) => void;
  notifications: AdminNotification[];
  seen: Set<string>;
  unreadCount: number;
  markSeen: (id: string) => void;
  markAllSeen: () => void;
}

export const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin(): AdminContextValue {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
