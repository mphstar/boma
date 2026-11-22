export type ActivityLevel = 'Aktif' | 'Sedang' | 'Santai';
export type PriceLevel = 'Premium' | 'Sedang' | 'Hemat';
export type TouristType = 'Grup' | 'Individu';
export type Duration = 'Singkat' | 'Sedang' | 'Lama';

export type DestinationCategory = 'Minat Khusus' | 'Alam' | 'Buatan' | 'Sosial Budaya';
export type ResultCategory = DestinationCategory | 'Alam & Minat Khusus';
export type CatalogFilter = DestinationCategory | 'Semua';

export type LeafKey =
  | 'aktif-premium'
  | 'aktif-hemat'
  | 'aktif-sedang'
  | 'sedang-grup'
  | 'sedang-individu'
  | 'santai-premium'
  | 'santai-lain';

export type Route = 'home' | 'katalog' | 'hasil' | 'wisata' | 'jelajah';

export type TicketUnit = 'orang' | 'jeep' | 'malam' | 'paket';

export interface TicketPlan {
  id: string;
  kind: 'Tiket' | 'Paket' | 'Menginap';
  name: string;
  description: string;
  price: number;
  unit: TicketUnit;
  minQty?: number;
}

export interface Destination {
  id: number;
  key: string;
  name: string;
  category: DestinationCategory;
  price: PriceLevel;
  duration: Duration;
  activity: ActivityLevel;
  tourist: TouristType;
  priceNote: string;
  description: string;
}

export interface Selection {
  activity: ActivityLevel;
  price: PriceLevel;
  tourist: TouristType;
}

export interface ClassificationResult {
  category: ResultCategory;
  ids: number[];
  leaf: LeafKey;
}

export interface Recommendation {
  selection: Selection;
  result: ClassificationResult;
}

export interface PathStep {
  title: string;
  detail: string;
}

export interface QuestionOption {
  value: string;
  description: string;
}

export interface QuestionConfig {
  key: keyof Selection;
  title: string;
  stepLabel: string;
  hint: string;
  options: QuestionOption[];
}
