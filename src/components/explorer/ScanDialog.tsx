import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { useToast } from '../../context/ToastContext';
import { byKey } from '../../data/destinations';
import { areaKeyFromPayload, unlockArea } from '../../utils/explorer';
import { destinationHref } from '../../utils/router';

type CameraState = 'starting' | 'on' | 'error' | 'off';
type SuccessState = { key: string; isNew: boolean };

interface ScanDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ScanDialog({ open, onClose }: ScanDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef(0);
  const [camera, setCamera] = useState<CameraState>('off');
  const [message, setMessage] = useState('');
  const [manual, setManual] = useState('');
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const toast = useToast();

  const stopCamera = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCamera('off');
  }, []);

  const finish = useCallback(
    (key: string) => {
      stopCamera();
      const isNew = unlockArea(key);
      setMessage('');
      setSuccess({ key, isNew });
      const destination = byKey(key);
      if (destination) {
        toast(isNew ? `${destination.name} terbuka!` : `${destination.name} sudah pernah dibuka.`);
      }
    },
    [stopCamera, toast],
  );

  useEffect(() => {
    if (!open) {
      setSuccess(null);
      setMessage('');
      setManual('');
      return;
    }
    setSuccess(null);
    setMessage('');
    setManual('');
    setCamera('starting');
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();

    let cancelled = false;
    let lastInvalid = 0;
    let lastScan = 0;
    const canvas = document.createElement('canvas');
    let decode: typeof import('jsqr').default | null = null;

    void import('jsqr')
      .then((module) => {
        if (!cancelled) decode = module.default;
      })
      .catch(() => {
        if (!cancelled) {
          setMessage('Pemindai QR gagal dimuat. Muat ulang halaman atau masukkan kode manual.');
        }
      });

    const loop = () => {
      if (cancelled) return;
      const video = videoRef.current;

      const now = Date.now();
      if (video && video.readyState >= video.HAVE_ENOUGH_DATA && now - lastScan > 140) {
        lastScan = now;
        const width = video.videoWidth;
        const height = video.videoHeight;

        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d', { willReadFrequently: true });
          const decoder = decode;
          if (context && decoder) {
            context.drawImage(video, 0, 0, width, height);
            const image = context.getImageData(0, 0, width, height);
            const result = decoder(image.data, image.width, image.height, {
              inversionAttempts: 'dontInvert',
            });

            if (result?.data) {
              const key = areaKeyFromPayload(result.data);
              if (key) {
                finish(key);
                return;
              }
              if (now - lastInvalid > 2500) {
                lastInvalid = now;
                setMessage('QR ini bukan bagian dari ekspedisi SAI-Agro.');
              }
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const start = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCamera('error');
        setMessage('Kamera tidak tersedia di perangkat ini. Masukkan kode manual di bawah.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        const video = videoRef.current;
        if (!video) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        video.srcObject = stream;
        await video.play();
        if (cancelled) return;

        setCamera('on');
        setMessage('');
        loop();
      } catch {
        if (cancelled) return;
        setCamera('error');
        setMessage('Kamera tidak bisa diakses. Aktifkan izin kamera atau masukkan kode manual.');
      }
    };

    void start();

    return () => {
      cancelled = true;
      stopCamera();
      if (dialog.open) dialog.close();
    };
  }, [open, finish, stopCamera]);

  const submitManual = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = areaKeyFromPayload(manual);
    if (!key) {
      setMessage('Kode tidak dikenali. Contoh kode yang benar: SAIAGRO-JEEP');
      return;
    }
    finish(key);
  };

  const handleBackdrop = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  const destination = success ? byKey(success.key) : null;

  return (
    <dialog
      ref={dialogRef}
      className="scan-dialog"
      aria-labelledby="scan-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdrop}
    >
      <div className="scan-shell">
        <div className="scan-head">
          <div>
            <p className="scan-kicker">{success ? 'Ekspedisi SAI-Agro' : 'Pindai QR'}</p>
            <h2 className="scan-title" id="scan-title">
              {success ? 'Wilayah ditemukan!' : 'Buka wilayah baru'}
            </h2>
          </div>
          <button type="button" className="x" onClick={onClose} aria-label="Tutup">
            ×
          </button>
        </div>

        {success && destination ? (
          <div className="scan-success">
            <span className="scan-success-icon" aria-hidden="true">
              ✓
            </span>
            <p>
              {success.isNew
                ? 'Wilayah ini baru saja terbuka dan tersimpan di perangkat Anda.'
                : 'Wilayah ini sudah pernah dibuka sebelumnya.'}
            </p>
            <h3>{destination.name}</h3>
            <div className="scan-success-actions">
              <button type="button" className="btn dark" onClick={onClose}>
                Lihat wilayah
              </button>
              <a className="scan-link" href={destinationHref(destination.key)} onClick={onClose}>
                Buka halaman wisata
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="scan-stage">
              <video
                ref={videoRef}
                className={camera === 'on' ? 'on' : undefined}
                muted
                playsInline
              />
              {camera !== 'on' && (
                <div className="scan-placeholder">
                  <span className="scan-placeholder-icon" aria-hidden="true">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
                      <rect x="8" y="8" width="8" height="8" rx="1.5" />
                    </svg>
                  </span>
                  <b>{camera === 'starting' ? 'Menyiapkan kamera…' : 'Kamera tidak aktif'}</b>
                  <small>Gunakan kamera untuk membaca QR, atau masukkan kode manual di bawah.</small>
                </div>
              )}
              {camera === 'on' && (
                <span className="scan-frame" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>

            {message && (
              <p className="scan-message" role="status">
                {message}
              </p>
            )}

            <form className="scan-form" onSubmit={submitManual}>
              <label className="scan-label" htmlFor="scan-code">
                Punya kode dari pengelola?
              </label>
              <div className="scan-form-row">
                <input
                  id="scan-code"
                  value={manual}
                  onChange={(event) => setManual(event.target.value)}
                  placeholder="Contoh: SAIAGRO-JEEP"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                />
                <button type="submit" className="btn dark">
                  Buka
                </button>
              </div>
            </form>

            <p className="scan-note">
              Kamera hanya dipakai untuk membaca QR dan tidak direkam. Progres disimpan di
              perangkat ini.
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
