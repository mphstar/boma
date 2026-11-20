import type { ActivityLevel, LeafKey, PathStep, Selection } from '../types';

export const PATH: Record<'root' | ActivityLevel, PathStep> = {
  root: {
    title: 'Tingkat aktivitas',
    detail: 'Atribut akar dengan Information Gain tertinggi (0.7014).',
  },
  Aktif: {
    title: 'Cabang Aktif',
    detail: 'Dipecah berdasarkan harga (nilai simpul 0.9183).',
  },
  Sedang: {
    title: 'Cabang Sedang',
    detail: 'Dipecah berdasarkan jenis wisatawan (nilai simpul 0.9183).',
  },
  Santai: {
    title: 'Cabang Santai',
    detail: 'Dipecah berdasarkan harga (nilai simpul 0.9710).',
  },
};

export const WHY: Record<LeafKey, string[]> = {
  'aktif-premium': [
    'Kamu ingin bergerak aktif dan siap memilih pengalaman premium. Pada kondisi ini, pohon keputusan mengarah ke aktivitas minat khusus yang menantang dan dikelola khusus.',
    'Jeep Adventure dan Outbound & Team Building sama-sama berkelas premium, berdurasi lama, dan untuk grup.',
  ],
  'aktif-hemat': [
    'Kamu aktif bergerak dengan anggaran hemat. Pohon keputusan memilih aktivitas minat khusus yang tidak menguras biaya.',
    'Tracking Air Terjun Tancak dan Jelajah Goa sama-sama berkelas hemat dan cocok untuk wisatawan individu.',
  ],
  'aktif-sedang': [
    'Kamu aktif bergerak dengan anggaran menengah. Pohon keputusan mengarahkanmu ke wisata alam perkebunan.',
    'Jelajah Kebun Kopi dan Jelajah Kebun Karet berkelas harga sedang dan nyaman dijelajahi bersama grup.',
  ],
  'sedang-grup': [
    'Dengan intensitas sedang dan bepergian berkelompok, pohon keputusan memilih wisata buatan yang edukatif.',
    'Wisata Pabrik & Coffee Tasting dan Wisata Pabrik Karet mengenalkan proses pengolahan hasil perkebunan.',
    'Pada cabang ini, pilihan harga tidak lagi mengubah hasil klasifikasi.',
  ],
  'sedang-individu': [
    'Dengan intensitas sedang dan bepergian sendiri, pohon keputusan memilih wisata sosial budaya.',
    'Event & Festival Budaya menghadirkan kesenian tradisional Jember di kawasan BOMA.',
    'Pada cabang ini, pilihan harga tidak lagi mengubah hasil klasifikasi.',
  ],
  'santai-premium': [
    'Kamu ingin santai dan siap memilih pengalaman premium. Pohon keputusan mengarah ke wisata buatan untuk bermalam di alam.',
    'Penginapan / Glamping Rimba dan Camping Ground Boma berdurasi lama dan untuk grup.',
    'Pada cabang ini, jenis wisatawan tidak lagi mengubah hasil klasifikasi.',
  ],
  'santai-lain': [
    'Kamu ingin santai dengan anggaran sedang atau hemat. Pohon keputusan memadukan wisata alam dan minat khusus yang tenang.',
    'Sungai Boma dan Sungai Rimba untuk menikmati aliran air, serta Wisata Candi & Situs untuk sisi sejarah.',
    'Pada cabang ini, jenis wisatawan tidak lagi mengubah hasil klasifikasi.',
  ],
};

export interface RuleCase {
  label: string;
  selection: Selection;
}

export const RULE_CASES: RuleCase[] = [
  { label: 'Aktif + Premium', selection: { activity: 'Aktif', price: 'Premium', tourist: 'Grup' } },
  { label: 'Aktif + Hemat', selection: { activity: 'Aktif', price: 'Hemat', tourist: 'Grup' } },
  { label: 'Aktif + Sedang', selection: { activity: 'Aktif', price: 'Sedang', tourist: 'Grup' } },
  { label: 'Sedang + Grup', selection: { activity: 'Sedang', price: 'Sedang', tourist: 'Grup' } },
  { label: 'Sedang + Individu', selection: { activity: 'Sedang', price: 'Sedang', tourist: 'Individu' } },
  { label: 'Santai + Premium', selection: { activity: 'Santai', price: 'Premium', tourist: 'Grup' } },
  { label: 'Santai + selain Premium', selection: { activity: 'Santai', price: 'Hemat', tourist: 'Grup' } },
];
