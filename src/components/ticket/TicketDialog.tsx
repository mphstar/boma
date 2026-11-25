import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Destination, TicketPlan, TicketUnit } from '../../types';
import { formatIDR, formatVisitDate } from '../../utils/format';
import { DIALOG_EXIT_MS } from '../../utils/motion';

type TicketStep = 'detail' | 'pay' | 'done';

const QTY_LABEL: Record<TicketUnit, string> = {
  orang: 'Jumlah peserta',
  jeep: 'Jumlah jeep',
  malam: 'Jumlah malam',
  paket: 'Jumlah paket',
};

const pad = (value: number): string => String(value).padStart(2, '0');

const dateISO = (offset = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const QR_SIZE = 21;
const QR_FINDERS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [QR_SIZE - 7, 0],
  [0, QR_SIZE - 7],
];

// Pola dibuat dari seed supaya kode tetap sama untuk pesanan yang sama.
function buildOrderQr(seed: string): boolean[][] {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619);
  }

  const random = (): number => {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    return (hash >>> 0) / 4294967296;
  };

  const finderValue = (x: number, y: number): boolean | null => {
    for (const [originX, originY] of QR_FINDERS) {
      const dx = x - originX;
      const dy = y - originY;
      if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
        return (
          dx === 0 ||
          dx === 6 ||
          dy === 0 ||
          dy === 6 ||
          (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4)
        );
      }
      if (dx >= -1 && dx < 8 && dy >= -1 && dy < 8) return false;
    }
    return null;
  };

  const grid: boolean[][] = [];
  for (let y = 0; y < QR_SIZE; y += 1) {
    const row: boolean[] = [];
    for (let x = 0; x < QR_SIZE; x += 1) {
      const finder = finderValue(x, y);
      row.push(finder === null ? random() > 0.52 : finder);
    }
    grid.push(row);
  }
  return grid;
}

function OrderQr({ seed }: { seed: string }) {
  const grid = useMemo(() => buildOrderQr(seed), [seed]);

  return (
    <svg
      viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
      role="img"
      aria-label="Kode QRIS pesanan kunjungan SAI-Agro"
      shapeRendering="crispEdges"
    >
      <rect width={QR_SIZE} height={QR_SIZE} fill="#ffffff" />
      {grid.flatMap((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#10241b" />
          ) : null,
        ),
      )}
    </svg>
  );
}

interface TicketDialogProps {
  destination: Destination;
  plan: TicketPlan | null;
  onClose: () => void;
}

export function TicketDialog({ destination, plan, onClose }: TicketDialogProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = useState<TicketPlan | null>(null);
  const [step, setStep] = useState<TicketStep>('detail');
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => dateISO(1));
  const [orderCode, setOrderCode] = useState('');

  const exitMs = reduce ? 0 : DIALOG_EXIT_MS;
  const minQty = current?.minQty ?? 1;
  const total = current ? current.price * qty : 0;
  const qtyLabel = current ? QTY_LABEL[current.unit] : 'Jumlah';
  const canContinue = name.trim().length >= 2 && Boolean(date);

  useEffect(() => {
    if (!plan) return;
    setCurrent(plan);
    setStep('detail');
    setQty(plan.minQty ?? 1);
    setName('');
    setDate(dateISO(1));
    setOrderCode('');
  }, [plan]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (plan) {
      dialog.classList.remove('closing');
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      }
      return;
    }

    if (!dialog.open) return;

    dialog.classList.add('closing');
    const timer = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove('closing');
      setCurrent(null);
    }, exitMs);

    return () => window.clearTimeout(timer);
  }, [plan, exitMs]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  useEffect(() => {
    if (!plan || !current) return;
    const timer = window.setTimeout(() => {
      headingRef.current?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [plan, current, step]);

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canContinue) return;
    setStep('pay');
  };

  const handleConfirm = () => {
    if (!current) return;
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const prefix = current.id.replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase();
    setOrderCode(`SAIAGRO-${prefix}-${suffix}`);
    setStep('done');
  };

  const title =
    step === 'detail'
      ? 'Atur kunjunganmu'
      : step === 'pay'
        ? 'Pembayaran QRIS'
        : 'Ringkasan pesanan';

  const subtitle =
    step === 'detail'
      ? 'Isi nama, tanggal, dan jumlah. Data tidak dikirim ke mana pun.'
      : step === 'pay'
        ? 'Periksa rincian kunjungan, lalu konfirmasi pesananmu.'
        : 'Bawa ringkasan ini saat konfirmasi ke pengelola.';

  return (
    <dialog
      ref={dialogRef}
      className="ticket-dialog"
      aria-labelledby="ticketDlgTitle"
      onClick={handleDialogClick}
    >
      {current && (
        <div className="dlg-in ticket-dlg-in">
          <header className="dlg-head">
            <div>
              <p className="dlg-kicker">{destination.name}</p>
              <h2 className="dlg-title" id="ticketDlgTitle" ref={headingRef} tabIndex={-1}>
                {title}
              </h2>
            </div>
            <button className="x" type="button" aria-label="Tutup" onClick={onClose}>
              ×
            </button>
          </header>
          <p className="dlg-sub">{subtitle}</p>

          {step === 'detail' && (
            <form className="ticket-form" onSubmit={handleContinue} noValidate>
              <div className="ticket-plan-summary">
                <p className="ticket-kind">{current.kind}</p>
                <strong>{current.name}</strong>
                <span>
                  {formatIDR(current.price)} / {current.unit}
                </span>
              </div>

              <div className="ticket-fields">
                <label className="ticket-field">
                  <span>Nama pemesan</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    placeholder="Nama lengkap"
                    maxLength={60}
                  />
                </label>
                <label className="ticket-field">
                  <span>Tanggal kunjungan</span>
                  <input
                    type="date"
                    value={date}
                    min={dateISO()}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
              </div>

              <div className="ticket-qty-row">
                <div className="ticket-qty">
                  <span id="ticketQtyLabel">{qtyLabel}</span>
                  <div className="qty-control">
                    <button
                      type="button"
                      onClick={() => setQty((value) => Math.max(minQty, value - 1))}
                      disabled={qty <= minQty}
                      aria-label={`Kurangi ${qtyLabel.toLowerCase()}`}
                    >
                      −
                    </button>
                    <output aria-labelledby="ticketQtyLabel" aria-live="polite">
                      {qty}
                    </output>
                    <button
                      type="button"
                      onClick={() => setQty((value) => Math.min(99, value + 1))}
                      disabled={qty >= 99}
                      aria-label={`Tambah ${qtyLabel.toLowerCase()}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="ticket-total" aria-live="polite">
                  <span>Total</span>
                  <strong>{formatIDR(total)}</strong>
                </div>
              </div>

              <p className={`ticket-hint${canContinue ? '' : ' warn'}`} id="ticketHint">
                {canContinue
                  ? 'Total mengikuti jumlah yang dipilih.'
                  : 'Isi nama pemesan dan tanggal kunjungan untuk melanjutkan.'}
              </p>

              <div className="ticket-actions">
                <button type="button" className="ticket-cancel" onClick={onClose}>
                  Batal
                </button>
                <button
                  className="btn dark"
                  type="submit"
                  disabled={!canContinue}
                  aria-describedby="ticketHint"
                >
                  Lanjut ke QRIS
                </button>
              </div>
            </form>
          )}

          {step === 'pay' && (
            <div className="ticket-pay">
              <dl className="ticket-pay-summary">
                <div>
                  <dt>Paket</dt>
                  <dd>{current.name}</dd>
                </div>
                <div>
                  <dt>Pemesan</dt>
                  <dd>{name.trim()}</dd>
                </div>
                <div>
                  <dt>Tanggal</dt>
                  <dd>{formatVisitDate(date)}</dd>
                </div>
                <div>
                  <dt>Jumlah</dt>
                  <dd>
                    {qty} {current.unit}
                  </dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>{formatIDR(total)}</dd>
                </div>
              </dl>

              <div className="qris-card">
                <div className="qris-top">
                  <span className="qris-brand">QRIS</span>
                  <span className="qris-issuer">SAI-Agro</span>
                </div>
                <div className="qris-code">
                  <OrderQr seed={`${destination.key}-${current.id}`} />
                </div>
              </div>

              <p className="qris-note">
                Pembayaran online belum aktif. Kode QRIS ini belum bisa dipakai, jadi konfirmasi
                tiket dan pembayaran ke pengelola.
              </p>

              <div className="ticket-actions">
                <button type="button" className="ticket-cancel" onClick={() => setStep('detail')}>
                  Kembali
                </button>
                <button className="btn dark" type="button" onClick={handleConfirm}>
                  Konfirmasi pesanan
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="ticket-done">
              <span className="done-mark" aria-hidden="true">
                ✓
              </span>
              <h3>Rencana kunjungan siap</h3>
              <p>
                Tunjukkan ringkasan ini ke pengelola untuk menyelesaikan pembayaran dan mendapatkan
                tiket.
              </p>

              <dl className="done-list">
                <div>
                  <dt>Wisata</dt>
                  <dd>{destination.name}</dd>
                </div>
                <div>
                  <dt>Paket</dt>
                  <dd>{current.name}</dd>
                </div>
                <div>
                  <dt>Pemesan</dt>
                  <dd>{name.trim()}</dd>
                </div>
                <div>
                  <dt>Tanggal</dt>
                  <dd>{formatVisitDate(date)}</dd>
                </div>
                <div>
                  <dt>Jumlah</dt>
                  <dd>
                    {qty} {current.unit}
                  </dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>{formatIDR(total)}</dd>
                </div>
              </dl>

              <p className="order-code">
                Kode ringkasan <strong>{orderCode}</strong>
              </p>
              <button className="btn dark ticket-done-btn" type="button" onClick={onClose}>
                Tutup
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
