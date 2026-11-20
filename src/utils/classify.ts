import type { ClassificationResult, Selection } from '../types';

export function classify({ activity, price, tourist }: Selection): ClassificationResult {
  if (activity === 'Aktif') {
    if (price === 'Premium') return { category: 'Minat Khusus', ids: [1, 14], leaf: 'aktif-premium' };
    if (price === 'Hemat') return { category: 'Minat Khusus', ids: [2, 3], leaf: 'aktif-hemat' };
    return { category: 'Alam', ids: [5, 7], leaf: 'aktif-sedang' };
  }

  if (activity === 'Sedang') {
    if (tourist === 'Grup') return { category: 'Buatan', ids: [6, 8], leaf: 'sedang-grup' };
    return { category: 'Sosial Budaya', ids: [13], leaf: 'sedang-individu' };
  }

  if (price === 'Premium') return { category: 'Buatan', ids: [11, 12], leaf: 'santai-premium' };
  return { category: 'Alam & Minat Khusus', ids: [9, 10, 4], leaf: 'santai-lain' };
}
