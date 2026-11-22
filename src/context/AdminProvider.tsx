import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  initialChats,
  initialGuides,
  initialOrders,
  initialSessions,
  initialSettings,
  initialWisata,
} from '../data/admin';
import { useHashRoute } from '../hooks/useHashRoute';
import type {
  AdminChat,
  AdminGuide,
  AdminOrder,
  AdminSettings,
  AdminWisata,
  OrderFilter,
} from '../types/admin';
import { buildAdminNotifications } from '../utils/admin';
import { adminHref, adminPageFromHash } from '../utils/adminRouter';
import { AdminContext, type AdminContextValue } from './AdminContext';

export function AdminProvider({ children }: { children: ReactNode }) {
  const { hash } = useHashRoute();
  const page = adminPageFromHash(hash);

  const [search, setSearch] = useState('');
  const [wisata, setWisata] = useState<AdminWisata[]>(initialWisata);
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('');
  const [chats, setChats] = useState<AdminChat[]>(initialChats);
  const [activeChat, setActiveChat] = useState(0);
  const [guides, setGuides] = useState<AdminGuide[]>(initialGuides);
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [seen, setSeen] = useState<Set<string>>(() => new Set());

  const navigate = useCallback((next: AdminContextValue['page']) => {
    const href = adminHref(next);
    if (window.location.hash !== href) window.location.hash = href;
  }, []);

  const toggleWisata = useCallback((id: number) => {
    setWisata((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Aktif' ? 'Dijeda' : 'Aktif' }
          : item,
      ),
    );
  }, []);

  const addWisata = useCallback((name: string, price: number) => {
    setWisata((current) => {
      const nextId = current.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      return [
        ...current,
        {
          id: nextId,
          name,
          category: 'Baru',
          price,
          status: 'Dijeda',
          quotaUsed: 0,
          quotaMax: 50,
          unit: 'tiket',
          emoji: '🌿',
          guide: '-',
          nextSession: '-',
          warning: false,
          location: 'Gunung Pasang',
        },
      ];
    });
  }, []);

  const confirmOrder = useCallback((code: string) => {
    setOrders((current) =>
      current.map((order) => (order.code === code ? { ...order, status: 'Lunas' } : order)),
    );
  }, []);

  const selectChat = useCallback((index: number) => {
    setActiveChat(index);
    setChats((current) =>
      current.map((chat, chatIndex) => (chatIndex === index ? { ...chat, unread: 0 } : chat)),
    );
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setChats((current) =>
        current.map((chat, index) =>
          index === activeChat
            ? { ...chat, messages: [...chat.messages, { from: 'a', text: trimmed }] }
            : chat,
        ),
      );
    },
    [activeChat],
  );

  const toggleGuide = useCallback((index: number) => {
    setGuides((current) =>
      current.map((guide, guideIndex) =>
        guideIndex === index ? { ...guide, onDuty: !guide.onDuty } : guide,
      ),
    );
  }, []);

  const saveSettings = useCallback((next: AdminSettings) => {
    setSettings(next);
  }, []);

  const notifications = useMemo(
    () => buildAdminNotifications(orders, wisata, chats),
    [orders, wisata, chats],
  );

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !seen.has(notification.id)).length,
    [notifications, seen],
  );

  const markSeen = useCallback((id: string) => {
    setSeen((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const markAllSeen = useCallback(() => {
    setSeen(new Set(notifications.map((notification) => notification.id)));
  }, [notifications]);

  const value: AdminContextValue = {
    page,
    navigate,
    search,
    setSearch,
    wisata,
    toggleWisata,
    addWisata,
    orders,
    confirmOrder,
    orderFilter,
    setOrderFilter,
    chats,
    activeChat,
    selectChat,
    sendMessage,
    sessions: initialSessions,
    guides,
    toggleGuide,
    settings,
    saveSettings,
    notifications,
    seen,
    unreadCount,
    markSeen,
    markAllSeen,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
