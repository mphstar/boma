import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { useAdmin } from '../../../context/AdminContext';
import type { AdminNotification } from '../../../types/admin';
import { AdminIcon } from '../ui/AdminIcon';

interface NotificationPanelProps {
  open: boolean;
  bellRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export function NotificationPanel({ open, bellRef, onClose }: NotificationPanelProps) {
  const {
    notifications,
    seen,
    markSeen,
    markAllSeen,
    navigate,
    selectChat,
    setOrderFilter,
  } = useAdmin();
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const positionPanel = useCallback(() => {
    const rect = bellRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = Math.min(360, window.innerWidth - 24);
    setPosition({
      top: rect.bottom + 10,
      left: Math.max(12, Math.min(rect.right + 30 - width, window.innerWidth - width - 12)),
    });
  }, [bellRef]);

  useLayoutEffect(() => {
    if (open) positionPanel();
  }, [open, positionPanel]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', positionPanel);
    return () => window.removeEventListener('resize', positionPanel);
  }, [open, positionPanel]);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (bellRef.current?.contains(target)) return;
      onClose();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, bellRef, onClose]);

  if (!open) return null;

  const openNotification = (notification: AdminNotification) => {
    markSeen(notification.id);
    if (notification.chatIndex !== undefined) selectChat(notification.chatIndex);
    if (notification.page === 'pesanan') setOrderFilter('Menunggu');
    navigate(notification.page);
    onClose();
  };

  return (
    <div
      className="notifp open"
      ref={panelRef}
      role="dialog"
      aria-label="Notifikasi"
      style={position}
    >
      <div className="nph">
        <b>Notifikasi</b>
        <button type="button" className="mini" onClick={markAllSeen}>
          Tandai semua dibaca
        </button>
      </div>
      <div className="npl">
        {notifications.length ? (
          notifications.map((notification) => (
            <button
              type="button"
              key={notification.id}
              className={`ni${seen.has(notification.id) ? ' rd' : ''}`}
              onClick={() => openNotification(notification)}
            >
              <span className="nic">
                <AdminIcon name={notification.icon} size={16} />
              </span>
              <span className="grow">
                <b>{notification.title}</b>
                <small>{notification.detail}</small>
              </span>
              {seen.has(notification.id) ? null : <i className="ud" style={{ marginTop: 6 }} />}
            </button>
          ))
        ) : (
          <div className="np-empty">Tidak ada notifikasi</div>
        )}
      </div>
    </div>
  );
}
