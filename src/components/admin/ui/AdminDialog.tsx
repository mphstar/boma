import { useEffect, useRef, type ReactNode } from 'react';

interface AdminDialogProps {
  label: string;
  onClose: () => void;
  children: ReactNode;
}

export function AdminDialog({ label, onClose, children }: AdminDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
