import { byKey } from '../data/destinations';
import { destinationKeyFromHash } from '../utils/router';
import { Scene } from '../components/ui/Scene';
import { Tags } from '../components/ui/Tags';

export function DestinationPage() {
  const destination = byKey(destinationKeyFromHash(window.location.hash) ?? '');

  if (!destination) {
    return (
      <main className="destination-page">
        <div className="wrap destination-empty">
          <h1>Wisata tidak ditemukan</h1>
          <p>Silakan kembali ke katalog untuk melihat pilihan wisata BOMA.</p>
          <a className="btn dark" href="#/katalog">
            Kembali ke katalog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="destination-page">
      <section className="destination-hero">
        <div className="destination-hero-image">
          <Scene sceneKey={destination.key} />
        </div>
        <div className="destination-hero-overlay" />
        <div className="wrap destination-hero-content">
          <a className="back-link" href="#/katalog">
            Kembali ke katalog
          </a>
          <p className="destination-category">{destination.category}</p>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
        </div>
      </section>

      <section className="destination-content">
        <div className="wrap destination-layout">
          <div>
            <h2>Informasi wisata</h2>
            <p>
              Pilihan ini cocok untuk pengunjung yang ingin menikmati kawasan BOMA Gunung Pasang
              sesuai waktu dan suasana perjalanan yang diinginkan.
            </p>
            <Tags
              price={destination.price}
              duration={destination.duration}
              activity={destination.activity}
              tourist={destination.tourist}
            />
          </div>
          <aside className="destination-price">
            <span>Perkiraan biaya</span>
            <strong>{destination.priceNote}</strong>
            <p>Konfirmasi jadwal, biaya, dan ketersediaan kepada pengelola sebelum berkunjung.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
