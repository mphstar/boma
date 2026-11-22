import { useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { DESTINATIONS, byKey } from '../../data/destinations';
import { useExplorer } from '../../hooks/useExplorer';
import type { Destination } from '../../types';
import {
  explorerCode,
  explorerUnlockUrl,
  formatUnlockDate,
  lockArea,
  resetExplorer,
  unlockArea,
} from '../../utils/explorer';

const qrCache = new Map<string, Promise<string>>();

const loadQr = (url: string): Promise<string> => {
  const cached = qrCache.get(url);
  if (cached) return cached;

  const promise = import('qrcode').then(({ toDataURL }) =>
    toDataURL(url, {
      width: 260,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#10241b', light: '#ffffff' },
    }),
  );

  qrCache.set(url, promise);
  promise.catch(() => qrCache.delete(url));
  return promise;
};

interface QrCardProps {
  destination: Destination;
  unlockedAt?: string;
  onUnlock: (key: string) => void;
  onLock: (key: string) => void;
  onCopy: (key: string) => void;
}

function QrCard({ destination, unlockedAt, onUnlock, onLock, onCopy }: QrCardProps) {
  const [source, setSource] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const url = explorerUnlockUrl(destination.key);

    void loadQr(url)
      .then((dataUrl) => {
        if (active) setSource(dataUrl);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [destination.key]);

  return (
    <div className="qr-card">
      <div className="qr-code">
        {source ? (
          <img src={source} alt={`QR code untuk membuka ${destination.name}`} width={200} height={200} />
        ) : (
          <span className="qr-loading">{failed ? 'QR gagal dibuat' : 'Membuat QR…'}</span>
        )}
      </div>

      <div className="qr-card-head">
        <b>{destination.name}</b>
        <span className={`chip${unlockedAt ? '' : ' p'}`}>
          <i />
          {unlockedAt ? 'Terbuka' : 'Terkunci'}
        </span>
      </div>

      <code className="qr-token">{explorerCode(destination.key)}</code>
      <small className="qr-date">
        {unlockedAt ? `Dibuka ${formatUnlockDate(unlockedAt)}` : 'Belum dipindai'}
      </small>

      <div className="qr-actions">
        <button type="button" className="mini" onClick={() => onUnlock(destination.key)}>
          Buka
        </button>
        <button type="button" className="mini" onClick={() => onCopy(destination.key)}>
          Salin link
        </button>
        {unlockedAt && (
          <button type="button" className="mini" onClick={() => onLock(destination.key)}>
            Kunci
          </button>
        )}
      </div>
    </div>
  );
}

export function QrDebugPage() {
  const { unlocked } = useExplorer();
  const toast = useToast();
  const total = DESTINATIONS.length;
  const count = DESTINATIONS.filter((destination) => unlocked[destination.key]).length;
  const percent = Math.round((count / total) * 100);

  const handleUnlock = (key: string) => {
    const destination = byKey(key);
    const isNew = unlockArea(key);
    toast(
      isNew
        ? `${destination?.name ?? 'Wilayah'} dibuka. Halaman Jelajah ikut tersinkron.`
        : `${destination?.name ?? 'Wilayah'} sudah terbuka.`,
    );
  };

  const handleLock = (key: string) => {
    lockArea(key);
    toast(`${byKey(key)?.name ?? 'Wilayah'} dikunci kembali.`);
  };

  const handleCopy = async (key: string) => {
    try {
      await navigator.clipboard.writeText(explorerUnlockUrl(key));
      toast('Link QR disalin ke clipboard.');
    } catch {
      toast('Browser tidak mengizinkan penyalinan link.');
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset semua progres ekspedisi? Semua wilayah akan terkunci lagi.')) return;
    resetExplorer();
    toast('Progres ekspedisi direset.');
  };

  return (
    <>
      <div className="bar-top" style={{ margin: 0 }}>
        <div>
          <h3 className="pt" style={{ fontSize: 18 }}>
            QR Wilayah
          </h3>
          <small className="muted">
            Mode debug: pindai QR dengan kamera ponsel, atau klik Buka untuk simulasi.
          </small>
        </div>
        <div className="qr-head-actions">
          <button type="button" className="mini" onClick={handleReset}>
            Reset progres
          </button>
          <a className="add" href="#/jelajah">
            Lihat halaman Jelajah
          </a>
        </div>
      </div>

      <div className="box qr-summary">
        <div className="qr-summary-copy">
          <p>Progres ekspedisi</p>
          <strong>
            {count}
            <span>/{total}</span>
          </strong>
          <small>wilayah terbuka · tersimpan di localStorage</small>
        </div>
        <div
          className="qr-summary-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={count}
          aria-label="Progres wilayah terbuka"
        >
          <i style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="qr-grid">
        {DESTINATIONS.map((destination) => (
          <QrCard
            key={destination.key}
            destination={destination}
            unlockedAt={unlocked[destination.key]}
            onUnlock={handleUnlock}
            onLock={handleLock}
            onCopy={handleCopy}
          />
        ))}
      </div>
    </>
  );
}
