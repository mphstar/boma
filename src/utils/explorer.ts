import { byKey } from '../data/destinations';

const STORAGE_KEY = 'boma.explorer.v1';
const EXPLORER_EVENT = 'boma:explorer';

export interface ExplorerState {
  unlocked: Record<string, string>;
}

const emptyState = (): ExplorerState => ({ unlocked: {} });

const sanitize = (input: unknown): ExplorerState => {
  if (!input || typeof input !== 'object') return emptyState();
  const raw = (input as { unlocked?: unknown }).unlocked;
  if (!raw || typeof raw !== 'object') return emptyState();

  const unlocked: Record<string, string> = {};
  Object.entries(raw as Record<string, unknown>).forEach(([key, value]) => {
    if (byKey(key) && typeof value === 'string') unlocked[key] = value;
  });
  return { unlocked };
};

export const readExplorerState = (): ExplorerState => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    return sanitize(JSON.parse(raw));
  } catch {
    return emptyState();
  }
};

const writeState = (state: ExplorerState) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage bisa diblokir (mode privat); progres tetap berjalan di sesi ini.
  }
  window.dispatchEvent(new Event(EXPLORER_EVENT));
};

export const unlockArea = (key: string): boolean => {
  if (!byKey(key)) return false;
  const state = readExplorerState();
  if (state.unlocked[key]) return false;
  state.unlocked[key] = new Date().toISOString();
  writeState(state);
  return true;
};

export const lockArea = (key: string): void => {
  const state = readExplorerState();
  if (!state.unlocked[key]) return;
  delete state.unlocked[key];
  writeState(state);
};

export const resetExplorer = (): void => {
  writeState(emptyState());
};

export const subscribeExplorer = (listener: () => void): (() => void) => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener('storage', handleStorage);
  window.addEventListener(EXPLORER_EVENT, listener);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(EXPLORER_EVENT, listener);
  };
};

export const explorerCode = (key: string): string => `BOMA-${key.toUpperCase()}`;

export const explorerUnlockUrl = (key: string): string => {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}#/jelajah/buka/${explorerCode(key)}`;
};

export const explorerPayloadFromHash = (hash: string): string | undefined => {
  const path = hash.replace(/^#/, '');
  const match = path.match(/^\/jelajah\/buka\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
};

/** Menerima kode mentah (BOMA-JEEP) maupun URL hasil pindaian QR. */
export const areaKeyFromPayload = (payload: string): string | null => {
  let decoded = payload.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // Biarkan teks apa adanya kalau bukan URL yang valid.
  }
  const code = decoded.match(/BOMA-[A-Z0-9]+/i)?.[0]?.toUpperCase();
  if (!code) return null;
  const key = code.slice('BOMA-'.length).toLowerCase();
  return byKey(key) ? key : null;
};

export const formatUnlockDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
