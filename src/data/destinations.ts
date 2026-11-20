import type { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    key: 'jeep',
    name: 'Jeep Adventure',
    category: 'Minat Khusus',
    price: 'Premium',
    duration: 'Lama',
    activity: 'Aktif',
    tourist: 'Grup',
    priceNote: 'Rp 350.000 – 600.000 / jeep',
    description:
      'Jelajahi jalur perkebunan dan lereng Gunung Pasang dengan jeep off-road. Cocok untuk rombongan yang ingin merasakan sensasi medan berbukit sambil menikmati panorama hijau kopi dan karet.',
  },
  {
    id: 2,
    key: 'trek',
    name: 'Tracking Air Terjun Tancak',
    category: 'Minat Khusus',
    price: 'Hemat',
    duration: 'Lama',
    activity: 'Aktif',
    tourist: 'Individu',
    priceNote: 'Tiket masuk + guide (opsional)',
    description:
      'Trekking melalui jalur perkebunan dan hutan menuju Air Terjun Tancak (±82 m). Perjalanan menantang namun memuaskan dengan udara sejuk dan pemandangan alami.',
  },
  {
    id: 3,
    key: 'goa',
    name: 'Jelajah Goa',
    category: 'Minat Khusus',
    price: 'Hemat',
    duration: 'Singkat',
    activity: 'Aktif',
    tourist: 'Individu',
    priceNote: 'Rp 15.000 – 25.000 / orang',
    description:
      'Eksplorasi goa alam di kawasan Gunung Pasang. Pengalaman singkat namun berkesan untuk mengenal formasi geologi dan suasana bawah tanah yang sejuk.',
  },
  {
    id: 4,
    key: 'candi',
    name: 'Wisata Candi & Situs',
    category: 'Minat Khusus',
    price: 'Hemat',
    duration: 'Singkat',
    activity: 'Santai',
    tourist: 'Individu',
    priceNote: 'Termasuk tiket masuk',
    description:
      'Kunjungi situs bersejarah termasuk Umpak Sewu dan peninggalan bangunan Belanda di kawasan perkebunan untuk memperkaya pengalaman budaya.',
  },
  {
    id: 5,
    key: 'kopi',
    name: 'Jelajah Kebun Kopi',
    category: 'Alam',
    price: 'Sedang',
    duration: 'Sedang',
    activity: 'Aktif',
    tourist: 'Grup',
    priceNote: 'Rp 25.000 – 50.000 / orang',
    description:
      'Berjalan di antara barisan pohon kopi robusta Gunung Pasang. Belajar teknik budidaya, panen selektif, dan menikmati aroma kopi di alam terbuka.',
  },
  {
    id: 6,
    key: 'pkopi',
    name: 'Wisata Pabrik & Coffee Tasting',
    category: 'Buatan',
    price: 'Premium',
    duration: 'Sedang',
    activity: 'Sedang',
    tourist: 'Grup',
    priceNote: 'Rp 75.000 – 150.000 / orang',
    description:
      'Kunjungi proses pengolahan dari cherry hingga green bean, dilanjutkan sesi coffee tasting kopi khas Kahyangan. Ideal untuk edukasi dan pecinta kopi.',
  },
  {
    id: 7,
    key: 'karet',
    name: 'Jelajah Kebun Karet',
    category: 'Alam',
    price: 'Sedang',
    duration: 'Singkat',
    activity: 'Aktif',
    tourist: 'Grup',
    priceNote: 'Rp 20.000 – 40.000 / orang',
    description:
      'Lihat langsung proses penyadapan lateks di kebun karet yang luas. Pengalaman edukatif tentang salah satu komoditas utama perkebunan Jember.',
  },
  {
    id: 8,
    key: 'pkaret',
    name: 'Wisata Pabrik Karet',
    category: 'Buatan',
    price: 'Premium',
    duration: 'Singkat',
    activity: 'Sedang',
    tourist: 'Grup',
    priceNote: 'Rp 50.000 – 100.000 / orang',
    description:
      'Kunjungan ke unit pengolahan karet untuk memahami alur dari lateks mentah hingga produk siap jual. Cocok untuk rombongan pendidikan dan wisatawan asing.',
  },
  {
    id: 9,
    key: 'sboma',
    name: 'Sungai Boma',
    category: 'Alam',
    price: 'Hemat',
    duration: 'Lama',
    activity: 'Santai',
    tourist: 'Individu',
    priceNote: 'Termasuk tiket masuk Rp 8.000',
    description:
      'Bersantai di tepi sungai jernih yang mengalir di tengah kawasan. Cocok untuk piknik keluarga, fotografi, atau sekadar menikmati suara air dan udara sejuk pegunungan.',
  },
  {
    id: 10,
    key: 'srimba',
    name: 'Sungai Rimba',
    category: 'Alam',
    price: 'Hemat',
    duration: 'Lama',
    activity: 'Santai',
    tourist: 'Individu',
    priceNote: 'Rp 15.000 – 35.000 (sewa ban/alat)',
    description:
      'Nikmati suasana sungai Rimba yang lebih alami. Bisa untuk berendam ringan (dengan pengawasan), river tubing sederhana, atau sekadar duduk di bebatuan sambil menikmati panorama.',
  },
  {
    id: 11,
    key: 'glamp',
    name: 'Penginapan / Glamping Rimba',
    category: 'Buatan',
    price: 'Premium',
    duration: 'Lama',
    activity: 'Santai',
    tourist: 'Grup',
    priceNote: 'Rp 150.000 – 350.000 / malam',
    description:
      'Menginap di cottage atau glamping dengan pemandangan sungai dan perkebunan. Pilihan ideal untuk keluarga atau kelompok kecil yang ingin merasakan malam di pegunungan.',
  },
  {
    id: 12,
    key: 'camp',
    name: 'Camping Ground Boma',
    category: 'Buatan',
    price: 'Sedang',
    duration: 'Lama',
    activity: 'Santai',
    tourist: 'Grup',
    priceNote: 'Rp 25.000 – 75.000 / orang / malam',
    description:
      'Area berkemah terbuka dengan pemandangan perkebunan dan sungai. Cocok untuk komunitas, sekolah, keluarga, atau gathering. Tersedia area tenda dan beberapa fasilitas pendukung.',
  },
  {
    id: 13,
    key: 'event',
    name: 'Event & Festival Budaya',
    category: 'Sosial Budaya',
    price: 'Hemat',
    duration: 'Lama',
    activity: 'Sedang',
    tourist: 'Individu',
    priceNote: 'Tiket masuk Rp 5.000 – 8.000',
    description:
      'Saksikan pertunjukan kesenian tradisional Jember (Janger, Jaranan, Campursari, pecut, dll) yang digelar di kawasan BOMA. Festival BOMA digelar berkala sebagai kolaborasi Perumda Kahyangan dan Laskar Kesenian Jember.',
  },
  {
    id: 14,
    key: 'out',
    name: 'Outbound & Team Building',
    category: 'Minat Khusus',
    price: 'Premium',
    duration: 'Lama',
    activity: 'Aktif',
    tourist: 'Grup',
    priceNote: 'Rp 150.000 – 350.000 / orang (min. peserta)',
    description:
      'Program outbound dan team building di alam terbuka. Dirancang untuk membangun komunikasi, kerja sama, dan kekompakan kelompok melalui permainan yang menantang namun aman.',
  },
];

export const byId = (id: number): Destination | undefined =>
  DESTINATIONS.find((destination) => destination.id === id);

export const byKey = (key: string): Destination | undefined =>
  DESTINATIONS.find((destination) => destination.key === key);
