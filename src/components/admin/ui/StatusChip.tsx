import type { OrderStatus, WisataStatus } from '../../../types/admin';
import { statusModifier } from '../../../utils/admin';

export function StatusChip({ status }: { status: WisataStatus | OrderStatus }) {
  return (
    <span className={`chip${statusModifier(status)}`}>
      <i />
      {status}
    </span>
  );
}
