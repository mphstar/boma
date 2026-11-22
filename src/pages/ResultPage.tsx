import { useRecommendation } from '../context/RecommendationContext';
import { DESTINATIONS, byId } from '../data/destinations';
import type { Destination } from '../types';
import { CatalogCard } from '../components/catalog/CatalogCard';
import { DestinationCard } from '../components/result/DestinationCard';

export function ResultPage() {
  const { recommendation, openDialog } = useRecommendation();

  if (!recommendation) return null;

  const { selection, result } = recommendation;
  const destinations = result.ids
    .map(byId)
    .filter((destination): destination is Destination => Boolean(destination));
  const others = DESTINATIONS.filter((destination) => !result.ids.includes(destination.id)).slice(0, 3);

  return (
    <main className="result-page">
      <section id="hasil" aria-labelledby="repHead" tabIndex={-1}>
        <div className="wrap">
          <header className="rep-head rv">
            <p className="rep-badge">
              <i aria-hidden="true" />
              Rekomendasi untuk Anda
            </p>
            <h1 className="rep-title" id="repHead">
              Destinasi yang paling dekat dengan jawabanmu
            </h1>
            <p className="rep-sub">
              {result.category}. {destinations.length} destinasi untuk profil {selection.activity} ·{' '}
              {selection.price} · {selection.tourist}.
            </p>
          </header>

          <div className="dest">
            {destinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>

          <div className="rep-actions rv">
            <button className="btn dark" onClick={openDialog}>
              Ubah preferensi
            </button>
          </div>
        </div>
      </section>

      <section className="rep-more" aria-labelledby="repMoreHead">
        <div className="wrap">
          <header className="rep-more-head rv">
            <div>
              <p className="rep-kicker">Jelajahi lainnya</p>
              <h2 className="h2 rep-more-title" id="repMoreHead">
                Wisata lain di BOMA Gunung Pasang
              </h2>
            </div>
            <a className="rep-more-link" href="#/katalog">
              Lihat semua di katalog
            </a>
          </header>

          <div className="grid">
            {others.map((destination, index) => (
              <CatalogCard
                key={destination.id}
                destination={destination}
                index={index}
                hidden={false}
                recommended={false}
              />
            ))}
          </div>

          <p className="disc rv">
            Harga pada kartu bersumber dari booklet BOMA dan bersifat indikatif. Konfirmasi tarif
            aktual, jadwal, dan ketersediaan kepada pengelola Perumda Perkebunan Kahyangan Jember.
          </p>
        </div>
      </section>
    </main>
  );
}
