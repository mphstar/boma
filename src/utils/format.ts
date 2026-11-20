import { byId } from '../data/destinations';
import type { Recommendation } from '../types';

export const padCount = (index: number): string => String(index + 1).padStart(2, '0');

export const formatReportDate = (date: Date = new Date()): string =>
  date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export function buildSummary({ selection, result }: Recommendation): string {
  const names = result.ids
    .map((id) => byId(id)?.name)
    .filter(Boolean)
    .join(', ');

  return [
    'BOMA – Rekomendasi Wisata',
    `Profil: ${selection.activity} · ${selection.price} · ${selection.tourist}`,
    `Kategori: ${result.category}`,
    `Destinasi: ${names}`,
  ].join('\n');
}
