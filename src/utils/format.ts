import { byId } from '../data/destinations';
import type { Recommendation } from '../types';

export const padCount = (index: number): string => String(index + 1).padStart(2, '0');

export const formatReportDate = (date: Date = new Date()): string =>
  date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export const formatIDR = (value: number): string => rupiah.format(value);

export const formatVisitDate = (value: string): string => {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

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
