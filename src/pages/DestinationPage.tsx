import type { CSSProperties } from 'react';
import { CatalogCard } from '../components/catalog/CatalogCard';
import { Scene } from '../components/ui/Scene';
import { useRecommendation } from '../context/RecommendationContext';
import { DESTINATIONS, byKey } from '../data/destinations';

const revealStyle = (index: number): CSSProperties => ({ '--i': index } as CSSProperties);

interface DestinationPageProps {
  destinationKey: string | undefined;
}

export function DestinationPage({ destinationKey }: DestinationPageProps) {
  const { openDialog } = useRecommendation();
  const destination = byKey(destinationKey ?? '');

  if (!destination) {
    return (
      <main className="destination-page">
        <div className="wrap destination-empty">
          <h1>Wisata tidak ditemukan</h1>
          <p>Alamat ini tidak cocok dengan wisata mana pun di katalog BOMA.</p>
          <a className="btn dark" href="#/katalog">
            Kembali ke katalog
          </a>
        </div>
      </main>
    );
  }

  const sameCategory = DESTINATIONS.filter(
    (item) => item.id !== destination.id && item.category === destination.category,
  );
  const otherCategory = DESTINATIONS.filter(
    (item) => item.id !== destination.id && item.category !== destination.category,
  );
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  const quickFacts = [
    { label: 'Harga', value: destination.price },
    { label: 'Durasi', value: destination.duration },
    { label: 'Aktivitas', value: destination.activity },
    { label: 'Teman perjalanan', value: destination.tourist },
  ];

  const touristNote =
    destination.tourist === 'Grup'
      ? 'Dirancang untuk rombongan, seperti keluarga atau komunitas yang ingin bergerak bersama.'
      : 'Cocok untuk perjalanan sendiri atau berdua tanpa perlu menunggu rombongan.';

  return (
    <main className="destination-page">
      <section className="destination-hero">
        <div className="destination-hero-image">
          <Scene sceneKey={destination.key} variant="bg" priority sizes="100vw" />
        </div>
        <div className="destination-hero-overlay" />
        <div className="wrap destination-hero-content">
          <nav className="dest-crumbs" aria-label="Navigasi halaman">
            <a href="#/">Beranda</a>
            <span aria-hidden="true">/</span>
            <a href="#/katalog">Katalog</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{destination.name}</span>
          </nav>
          <p className="destination-category">{destination.category}</p>
          <h1>{destination.name}</h1>
        </div>
      </section>

      <div className="wrap dest-quickwrap">
        <dl className="dest-quick rv" aria-label="Ringkasan wisata" style={revealStyle(0)}>
          {quickFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="destination-content">
        <div className="wrap destination-layout">
          <div className="destination-main">
            <div className="dest-intro rv" style={revealStyle(0)}>
              <h2>Tentang wisata ini</h2>
              <p>{destination.description}</p>
              <p className="dest-source">
                Ringkasan disusun dari booklet BOMA dan bersifat indikatif.
              </p>
            </div>

            <div className="dest-notes rv" style={revealStyle(1)}>
              <h2>Sebelum berangkat</h2>
              <ul>
                <li>
                  <strong>Konfirmasi jadwal</strong>
                  <span>
                    Hubungi pengelola untuk memastikan jam operasional dan ketersediaan pada
                    tanggal kunjunganmu.
                  </span>
                </li>
                <li>
                  <strong>Siapkan anggaran</strong>
                  <span>
                    Tarif di halaman ini adalah perkiraan. Biaya akhir bisa berbeda tergantung
                    paket dan jumlah peserta.
                  </span>
                </li>
                <li>
                  <strong>Teman perjalanan</strong>
                  <span>{touristNote}</span>
                </li>
              </ul>
            </div>
          </div>

          <aside className="dest-aside rv" style={revealStyle(1)}>
            <div className="destination-price">
              <h2>Perkiraan biaya</h2>
              <strong>{destination.priceNote}</strong>
              <p>Harga indikatif dari booklet BOMA. Konfirmasi tarif dan paket kepada pengelola.</p>
              <button className="btn dest-cta" type="button" onClick={openDialog}>
                Minta rekomendasi
              </button>
            </div>
            <p className="dest-aside-note">
              Tiga pertanyaan singkat, lalu BOMA menyusun pilihan wisata yang paling sesuai.
            </p>
          </aside>
        </div>

        <div className="wrap dest-more">
          <header className="dest-more-head rv">
            <div>
              <p className="dest-kicker">Jelajahi lainnya</p>
              <h2>Wisata lain di BOMA</h2>
            </div>
            <a className="dest-more-link" href="#/katalog">
              Lihat semua wisata
            </a>
          </header>
          <div className="grid dest-grid">
            {related.map((item, index) => (
              <CatalogCard
                key={item.id}
                destination={item}
                index={index}
                hidden={false}
                recommended={false}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}