import type { AdminPage } from '../types/admin';

export const ADMIN_ROOT = '#/admin';

const PAGE_HASH: Record<AdminPage, string> = {
  dash: '#/admin/dashboard',
  wisata: '#/admin/katalog',
  pesanan: '#/admin/pemesanan',
  chat: '#/admin/chat',
  jadwal: '#/admin/jadwal',
  pemandu: '#/admin/pemandu',
  lap: '#/admin/laporan',
  qr: '#/admin/qr',
  set: '#/admin/pengaturan',
  help: '#/admin/bantuan',
};

const HASH_PAGE = Object.fromEntries(
  (Object.entries(PAGE_HASH) as [AdminPage, string][]).map(([page, hash]) => [hash, page]),
) as Record<string, AdminPage>;

export const isAdminHash = (hash: string): boolean =>
  hash === ADMIN_ROOT || hash.startsWith(`${ADMIN_ROOT}/`);

export const adminHref = (page: AdminPage): string => PAGE_HASH[page];

export const adminPageFromHash = (hash: string): AdminPage => HASH_PAGE[hash] ?? 'wisata';
