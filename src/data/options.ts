import type { CatalogFilter, QuestionConfig } from '../types';

export const CATEGORIES: CatalogFilter[] = ['Semua', 'Minat Khusus', 'Alam', 'Buatan', 'Sosial Budaya'];

export const QUESTIONS: QuestionConfig[] = [
  {
    key: 'activity',
    title: 'Tingkat aktivitas',
    stepLabel: 'Aktivitas',
    hint: 'Seberapa aktif kamu ingin bergerak?',
    options: [
      { value: 'Aktif', description: 'Bergerak, menantang, berpetualang' },
      { value: 'Sedang', description: 'Seimbang antara jalan dan duduk' },
      { value: 'Santai', description: 'Menikmati suasana tanpa terburu-buru' },
    ],
  },
  {
    key: 'price',
    title: 'Harga',
    stepLabel: 'Anggaran',
    hint: 'Kelas anggaran yang nyaman',
    options: [
      { value: 'Premium', description: 'Pengalaman terbaik, anggaran lebih longgar' },
      { value: 'Sedang', description: 'Seimbang antara biaya dan pengalaman' },
      { value: 'Hemat', description: 'Biaya terjangkau' },
    ],
  },
  {
    key: 'tourist',
    title: 'Teman perjalanan',
    stepLabel: 'Teman jalan',
    hint: 'Kamu berangkat dengan siapa?',
    options: [
      { value: 'Grup', description: 'Keluarga, rombongan, komunitas' },
      { value: 'Individu', description: 'Berangkat sendiri atau berdua' },
    ],
  },
];
