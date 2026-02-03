import React, { useState, useMemo } from 'react';
import DateSelector from '@/components/schedule/DateSelector';
import ScheduleMovieCard from '@/components/schedule/ScheduleMovieCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useMovies } from '@/hooks/useMovies';

const MovieSchedule: React.FC = () => {
  const [activeDate, setActiveDate] = useState<string>('');
  
  const { movies, loading, error } = useMovies();

  const scheduleMovies = useMemo(() => {
    return movies
      .filter(movie => movie.sessions && movie.sessions.length > 0)
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        hall: "Головний зал", 
        times: movie.sessions || []
      }));
  }, [movies]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-['Inter'] relative overflow-hidden">
      
      <div className="absolute -top-50 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[180px] opacity-40 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 drop-shadow-lg">
          Розклад сеансів
        </h1>

        <DateSelector 
          activeDate={activeDate} 
          onDateSelect={setActiveDate} 
        />

        {error && (
          <div className="text-center text-red-500 text-xl py-10">
            {error}
          </div>
        )}
       
        {!loading && !error && (
          <>
            {scheduleMovies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {scheduleMovies.map((movie) => (
                  <ScheduleMovieCard 
                  key={movie.id} 
                  movie={{ ...movie, id: movie.id.toString() }} />
                ))}
              </div>
            ) : (
              <div className="text-center text-white/50 text-xl py-20">
                На обрану дату сеансів не знайдено 😔
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieSchedule;