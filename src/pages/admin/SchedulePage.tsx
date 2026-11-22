import { WeekGrid } from '../../components/admin/schedule/WeekGrid';
import { useAdmin } from '../../context/AdminContext';

export function SchedulePage() {
  const { sessions } = useAdmin();

  return (
    <div className="box">
      <h3 className="pt">Jadwal Minggu Ini</h3>
      <WeekGrid sessions={sessions} />
    </div>
  );
}
