import React from 'react';
import SessionButton from '@/components/ui/SessionButton';
import type { MovieScheduleProps } from '@/types/movie';
import { useNavigate } from 'react-router-dom';

const MovieSchedule: React.FC<MovieScheduleProps> = ({ schedule }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[360px] bg-sky-950 rounded-[20px] p-6 flex flex-col gap-6 shadow-2xl border border-white/5">
      <h2 className="text-white text-2xl font-bold">Розклад сеансів</h2>
      <div className="flex flex-col gap-6">
        {schedule.map((day, index) => (
          <section key={`${day.date}-${index}`} className="flex flex-col gap-3">
            <h3 className="text-white/90 text-lg font-normal">{day.date}</h3>
            <div className="flex flex-wrap gap-3">
              {day.times.map((time) => (
                <SessionButton key={time} time={time} onClick={() => navigate(`/booking/${time}`)} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MovieSchedule;