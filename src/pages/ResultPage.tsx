import { useRecommendation } from '../context/RecommendationContext';
import { useToast } from '../context/ToastContext';
import { WHY } from '../data/decisionTree';
import { byId } from '../data/destinations';
import type { Destination } from '../types';
import { copyToClipboard } from '../utils/clipboard';
import { buildSummary, formatReportDate } from '../utils/format';
import { DestinationCard } from '../components/result/DestinationCard';
import { Scene } from '../components/ui/Scene';

export function ResultPage() {
  const { recommendation, openDialog } = useRecommendation();
  const toast = useToast();

  if (!recommendation) return null;

  const { selection, result } = recommendation;
  const destinations = result.ids
    .map(byId)
    .filter((destination): destination is Destination => Boolean(destination));

  const [lede, ...reasons] = WHY[result.leaf];
  const categoryParts = result.category.split(' & ');

  const handleCopy = async () => {
    const copied = await copyToClipboard(buildSummary(recommendation));
    toast(copied ? 'Ringkasan disalin' : 'Gagal menyalin');
  };

  return (
    <section className="view" id="hasil" aria-live="polite">
      <div className="rep-top">
        <div className="rep-bg">
          <Scene sceneKey={destinations[0]?.key ?? 'jeep'} />
        </div>
        <div className="rep-in">
          <div className="wrap">
            <div className="stamp">
              <span>Laporan perjalanan personal · BOMA Gunung Pasang</span>
              <span>{formatReportDate()}</span>
            </div>
            <div style={{ fontSize: 15, color: 'var(--sand)', marginBottom: 10 }}>
              Kategori wisata untukmu
            </div>
            <div className="rep-cat">
              {categoryParts.length > 1 ? (
                <>
                  {categoryParts[0]} <em>&amp;</em> {categoryParts[1]}
                </>
              ) : (
                result.category
              )}
            </div>
            <p className="rep-lede">{lede}</p>
            <div className="profile">
              {[
                ['Aktivitas', selection.activity],
                ['Harga', selection.price],
                ['Wisatawan', selection.tourist],
              ].map(([label, value]) => (
                <span className="chip" key={label}>
                  <b>{label}</b>
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="rep-body">
          <div>
            <h4>Pilihan Anda</h4>
            <div className="profile profile-summary">
              {[
                ['Aktivitas', selection.activity],
                ['Biaya', selection.price],
                ['Wisatawan', selection.tourist],
              ].map(([label, value]) => (
                <span className="chip" key={label}>
                  <b>{label}</b>
                  {value}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4>Mengapa ini cocok</h4>
            <div className="why">
              {reasons.map((reason) => (
                <p key={reason}>{reason}</p>
              ))}
            </div>
          </div>
        </div>

        <h4 style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 500, marginTop: 80 }}>
          {destinations.length} destinasi yang sesuai
        </h4>
        <div className="dest">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.id} destination={destination} index={index} />
          ))}
        </div>

        <div className="rep-act">
          <a className="btn primary" href="#/katalog">
            Lihat di katalog
          </a>
          <button className="btn ghost" onClick={handleCopy}>
            Salin ringkasan
          </button>
          <button className="btn ghost" onClick={() => window.print()}>
            Cetak laporan
          </button>
          <button className="btn ghost" onClick={openDialog}>
            Ubah preferensi
          </button>
        </div>

        <p className="disc">
          Harga pada kartu bersumber dari booklet BOMA dan bersifat indikatif. Konfirmasi tarif
          aktual, jadwal, dan ketersediaan kepada pengelola Perumda Perkebunan Kahyangan Jember.
        </p>
      </div>
    </section>
  );
}
