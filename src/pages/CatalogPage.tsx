import { useEffect, useState, type CSSProperties } from 'react';
import { CatalogCard } from '../components/catalog/CatalogCard';
import { CategoryFilters } from '../components/catalog/CategoryFilters';
import { useRecommendation } from '../context/RecommendationContext';
import { DESTINATIONS } from '../data/destinations';
import { CATEGORIES } from '../data/options';
import { observeReveal } from '../helpers/reveal';
import type { CatalogFilter } from '../types';

export function CatalogPage() {
  const [filter, setFilter] = useState<CatalogFilter>('Semua');
  const { recommendation } = useRecommendation();
  const recommendedIds = recommendation?.result.ids ?? [];

  useEffect(() => {
    observeReveal();
  }, [filter]);

  return (
    <section className="view" id="katalog">
      <div className="wrap">
        <header className="catalog-heading rv">
          <p className="catalog-kicker">Pilihan wisata SAI-Agro</p>
          <h1 className="h2">Temukan tempat yang ingin Anda kunjungi</h1>
          <p className="sub">
            Pilih kegiatan alam, budaya, atau pengalaman bersama keluarga dan rombongan di Gunung
            Pasang.
          </p>
        </header>

        <div className="catalog-toolbar rv" style={{ '--i': 1 } as CSSProperties}>
          <div>
            <h2>Jenis wisata</h2>
            <p>Pilih kategori untuk melihat wisata yang sesuai.</p>
          </div>
          <CategoryFilters categories={CATEGORIES} active={filter} onChange={setFilter} />
        </div>

        <div className="grid" aria-live="polite">
          {DESTINATIONS.map((destination, index) => (
            <CatalogCard
              key={`${filter}-${destination.id}`}
              destination={destination}
              index={index}
              hidden={filter !== 'Semua' && destination.category !== filter}
              recommended={recommendedIds.includes(destination.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
