import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ExplorerCard } from '../components/explorer/ExplorerCard';
import { ScanDialog } from '../components/explorer/ScanDialog';
import { useToast } from '../context/ToastContext';
import { DESTINATIONS, byKey } from '../data/destinations';
import { useExplorer } from '../hooks/useExplorer';
import { areaKeyFromPayload, unlockArea } from '../utils/explorer';

type Notice = { kind: 'ok' | 'info'; text: string };

interface ExplorerPageProps {
  scanPayload?: string;
}

export function ExplorerPage({ scanPayload }: ExplorerPageProps) {
  const { unlocked } = useExplorer();
  const [scanOpen, setScanOpen] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const processedScan = useRef<string | null>(null);
  const toast = useToast();

  const closeScan = useCallback(() => setScanOpen(false), []);

  const total = DESTINATIONS.length;
  const count = DESTINATIONS.filter((destination) => unlocked[destination.key]).length;
  const percent = Math.round((count / total) * 100);

  useEffect(() => {
    if (!scanPayload) {
      processedScan.current = null;
      return;
    }
    if (processedScan.current === scanPayload) return;
    processedScan.current = scanPayload;

    const cleanHash = () => {
      window.history.replaceState(null, '', '#/jelajah');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    };

    const key = areaKeyFromPayload(scanPayload);
    if (!key) {
      setNotice({
        kind: 'info',
        text: 'Kode QR tidak dikenali. Pastikan Anda memindai QR ekspedisi SAI-Agro yang benar.',
      });
      cleanHash();
      return;
    }

    const destination = byKey(key);
    const isNew = unlockArea(key);
    setNotice({
      kind: 'ok',
      text: isNew
        ? `${destination?.name ?? 'Wilayah'} baru saja terbuka. Selamat menjelajah!`
        : `${destination?.name ?? 'Wilayah'} sudah terbuka sebelumnya.`,
    });
    if (isNew) toast(`${destination?.name ?? 'Wilayah'} terbuka!`);
    cleanHash();
  }, [scanPayload, toast]);

  return (
    <main className="explorer-page" id="jelajah">
      <section className="explorer-hero">
        <div className="wrap explorer-hero-grid">
          <div className="explorer-hero-copy rv">
            <p className="explorer-kicker">Ekspedisi SAI-Agro · Simulasi</p>
            <h1>
              Buka wilayah,
              <br />
              temukan cerita.
            </h1>
            <p className="explorer-lead">
              Sebagian kawasan Gunung Pasang masih tersegel. Kunjungi lokasinya, temukan QR code
              yang tersembunyi, lalu pindai untuk membuka wilayah itu di peta ekspedisi Anda.
            </p>
            <div className="explorer-actions">
              <button type="button" className="btn explorer-primary" onClick={() => setScanOpen(true)}>
                Pindai QR code
              </button>
              <a className="btn explorer-ghost" href="#/katalog">
                Lihat katalog wisata
              </a>
            </div>
          </div>

          <aside className="explorer-steps rv" style={{ '--i': 1 } as CSSProperties}>
            <p className="explorer-steps-title">Cara membuka wilayah</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <b>Kunjungi lokasi</b>
                  <small>Datang ke salah satu area wisata SAI-Agro yang masih terkunci.</small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <b>Temukan QR code</b>
                  <small>QR dipasang di titik tertentu di dalam area wisata.</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <b>Pindai dan buka</b>
                  <small>Wilayah langsung terbuka dan progres tersimpan di perangkat ini.</small>
                </div>
              </li>
            </ol>
            <p className="explorer-steps-note">
              Mode simulasi: tidak ada hadiah atau transaksi. Data hanya tersimpan lokal.
            </p>
          </aside>
        </div>
      </section>

      <div className="wrap">
        <div className="explorer-progress rv" style={{ '--i': 2 } as CSSProperties}>
          <div className="explorer-progress-copy">
            <p>Progres ekspedisi</p>
            <strong>
              <span>{count}</span> / {total} wilayah terbuka
            </strong>
            <small>
              {count === total
                ? 'Semua wilayah sudah terbuka. Peta ekspedisi lengkap!'
                : 'Buka wilayah berikutnya dengan memindai QR di lokasi.'}
            </small>
          </div>
          <div
            className="explorer-progress-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={count}
            aria-label="Progres wilayah terbuka"
          >
            <i style={{ width: `${percent}%` }} />
          </div>
          <button type="button" className="explorer-progress-scan" onClick={() => setScanOpen(true)}>
            Scan di lokasi
          </button>
        </div>

        {notice && (
          <div className="explorer-notice" data-kind={notice.kind} role="status">
            <span className="explorer-notice-icon" aria-hidden="true">
              {notice.kind === 'ok' ? '✓' : '!'}
            </span>
            <p>{notice.text}</p>
            <button type="button" onClick={() => setNotice(null)} aria-label="Tutup pemberitahuan">
              ×
            </button>
          </div>
        )}

        <section className="explorer-body">
          <div className="explorer-section-head">
            <div>
              <p className="explorer-kicker">Peta wilayah</p>
              <h2>Wilayah ekspedisi</h2>
            </div>
            <p className="explorer-legend">
              <span className="explorer-dot is-open" aria-hidden="true" /> Terbuka
              <span className="explorer-dot is-locked" aria-hidden="true" /> Terkunci
            </p>
          </div>

          <div className="explorer-grid">
            {DESTINATIONS.map((destination, index) => (
              <ExplorerCard
                key={destination.key}
                destination={destination}
                index={index}
                unlockedAt={unlocked[destination.key]}
              />
            ))}
          </div>
        </section>
      </div>

      <ScanDialog open={scanOpen} onClose={closeScan} />
    </main>
  );
}
