import { AdminDialog } from '../ui/AdminDialog';

interface LogoutDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function LogoutDialog({ onCancel, onConfirm }: LogoutDialogProps) {
  return (
    <AdminDialog label="Keluar" onClose={onCancel}>
      <h3>Keluar?</h3>
      <p>Anda akan keluar dari dashboard admin SAI-Agro.</p>
      <div className="acts">
        <button type="button" className="ghost" onClick={onCancel}>
          Batal
        </button>
        <button type="button" className="add" style={{ justifyContent: 'center' }} onClick={onConfirm}>
          Keluar
        </button>
      </div>
    </AdminDialog>
  );
}
