import { WEEK_DAYS } from '../../../data/admin';
import type { AdminSession } from '../../../types/admin';

export function WeekGrid({ sessions }: { sessions: AdminSession[] }) {
  return (
    <div className="wk">
      {WEEK_DAYS.map((day) => {
        const daySessions = sessions.filter((session) => session.day === day);
        return (
          <div className="dy" key={day}>
            <b>{day}</b>
            {daySessions.length ? (
              daySessions.map((session) => (
                <div className="se" key={`${session.time}-${session.destination}`}>
                  <small>{session.time}</small>
                  <b>{session.destination}</b>
                  <small>{session.guide}</small>
                </div>
              ))
            ) : (
              <small>Tidak ada sesi</small>
            )}
          </div>
        );
      })}
    </div>
  );
}
