import type { AdminWisata } from '../../../types/admin';
import { formatRupiah } from '../../../utils/admin';
import { AdminDialog } from '../ui/AdminDialog';

interface WisataDetailDialogProps {
  wisata: AdminWisata;
  onClose: () => void;
  onToggle: () => void;
}

export function WisataDetailDialog({ wisata, onClose, onToggle }: WisataDetailDialogProps) {
  return (
    <AdminDialog label={`Detail ${wisata.name}`} onClose={onClose}>
      <h3>
        {wisata.emoji} {wisata.name}
      </h3>
      <p>
        {wisata.category} • {wisata.location}
      </p>
      <div className="row">
        <span>Harga</span>
        <b>{formatRupiah(wisata.price)}</b>
      </div>
      <div className="row">
        <span>Kuota hari ini</span>
        <b>
          {wisata.quotaUsed} / {wisata.quotaMax} {wisata.unit}
        </b>
      </div>
      <div className="row">
        <span>Pemandu</span>
        <b>{wisata.guide}</b>
      </div>
      <div className="row">
        <span>Status</span>
        <b>{wisata.status}</b>
      </div>
      <div className="acts">
        <button type="button" className="ghost" onClick={onClose}>
          Tutup
        </button>
        <button
          type="button"
          className="add"
          style={{ justifyContent: 'center' }}
          onClick={() => {
            onToggle();
            onClose();
          }}
        >
          {wisata.status === 'Aktif' ? 'Jeda wisata' : 'Aktifkan'}
        </button>
      </div>
    </AdminDialog>
  );
}
