import { useState, type CSSProperties } from 'react';
import { TICKETS } from '../../data/tickets';
import type { Destination, TicketPlan } from '../../types';
import { formatIDR } from '../../utils/format';
import { TicketDialog } from './TicketDialog';

const revealStyle = (index: number): CSSProperties => ({ '--i': index } as CSSProperties);

const planCta = (plan: TicketPlan): string => {
  if (plan.kind === 'Tiket') return 'Pilih tiket';
  if (plan.kind === 'Menginap') return 'Pesan menginap';
  return 'Pilih paket';
};

export function TicketSection({ destination }: { destination: Destination }) {
  const plans = TICKETS[destination.key] ?? [];
  const [selected, setSelected] = useState<TicketPlan | null>(null);

  if (plans.length === 0) return null;

  return (
    <section className="ticket-section" id="tiket" aria-labelledby="ticket-title">
      <div className="wrap">
        <header className="ticket-head rv">
          <div className="ticket-head-copy">
            <p className="dest-kicker">Pesan kunjungan</p>
            <h2 id="ticket-title" tabIndex={-1}>Tiket &amp; paket</h2>
            <p>
              Pilih tiket masuk atau paket yang sudah termasuk pengalaman. Harga di bawah adalah
              contoh untuk tampilan.
            </p>
          </div>
          <p className="ticket-demo">
            <span aria-hidden="true" />
            Mode demo. QRIS belum terhubung ke pembayaran nyata.
          </p>
        </header>

        <div className="ticket-grid">
          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={`ticket-plan rv${index === 1 ? ' featured' : ''}`}
              style={revealStyle(index)}
            >
              <div>
                <p className="ticket-kind">{plan.kind}</p>
                <h3>{plan.name}</h3>
                <p className="ticket-desc">{plan.description}</p>
              </div>
              <div className="ticket-plan-foot">
                <p className="ticket-price">
                  <strong>{formatIDR(plan.price)}</strong>
                  <span>
                    / {plan.unit}
                    {plan.minQty ? `, min. ${plan.minQty} ${plan.unit}` : ''}
                  </span>
                </p>
                <button className="btn ticket-btn" type="button" onClick={() => setSelected(plan)}>
                  {planCta(plan)}
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="ticket-fineprint">
          Harga contoh. Konfirmasi tarif, jadwal, dan ketersediaan ke pengelola sebelum memesan.
        </p>

        <TicketDialog
          destination={destination}
          plan={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </section>
  );
}
