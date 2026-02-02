import React from 'react';
import { Link } from 'react-router-dom';

interface MovieScheduleProps {
  schedule: { date: string; times: string[] }[];
  movieId: string;
}

const MovieSchedule: React.FC<MovieScheduleProps> = ({ schedule, movieId }) => {
  return (
    <div className="bg-[#051838]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl sticky top-24 w-full">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
        Розклад сеансів
      </h3>
      
      <div className="flex flex-col gap-6">
        {schedule && schedule.length > 0 ? (
          schedule.map((day, idx) => {
            const uniqueTimes = Array.from(new Set(day.times.map(t => t.trim()))).sort();

            return (
              <div key={`${day.date}-${idx}`} className="flex flex-col gap-2">
                <p className="text-white/90 text-sm font-medium pl-1">{day.date}</p>
                
                <div className="grid grid-cols-3 gap-3">
                  {uniqueTimes.map((time) => (
                    <Link 
                      key={`${day.date}-${time}`} 
                      to={`/booking/${movieId}/${time}`} 
                      className="border border-[#0753E0] text-blue-400 hover:bg-[#0753E0] hover:text-white hover:shadow-[0_0_10px_#0753E0] transition-all duration-300 rounded-lg py-2 px-2 w-full text-center text-sm font-bold block"
                    >
                      {time}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white/50 text-center py-4">Сеансів немає</div>
        )}
      </div>
    </div>
  );
};

export default MovieSchedule;