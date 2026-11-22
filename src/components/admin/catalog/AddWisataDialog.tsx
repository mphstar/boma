import { useState } from 'react';
import { AdminDialog } from '../ui/AdminDialog';

interface AddWisataDialogProps {
  onClose: () => void;
  onSave: (name: string, price: number) => void;
}

export function AddWisataDialog({ onClose, onSave }: AddWisataDialogProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <AdminDialog label="Tambah Wisata" onClose={onClose}>
      <h3>Tambah Wisata</h3>
      <p>Isi data wisata baru untuk ditampilkan di website BOMA.</p>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          const trimmed = name.trim();
          if (!trimmed) return;
          onSave(trimmed, Number(price) || 0);
          onClose();
        }}
      >
        <input
          className="fld"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nama wisata"
          aria-label="Nama wisata"
          autoFocus
        />
        <input
          className="fld"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Harga tiket (Rp)"
          aria-label="Harga tiket"
        />
        <div className="acts">
          <button type="button" className="ghost" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="add" style={{ justifyContent: 'center' }}>
            Simpan
          </button>
        </div>
      </form>
    </AdminDialog>
  );
}
