import React from 'react';
import DateSelector from '@/components/schedule/DateSelector';
import ScheduleMovieCard from '@/components/schedule/ScheduleMovieCard';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import { useMovieSchedule } from '@/hooks/movies/useMovieSchedule';

const MovieSchedule: React.FC = () => {
    const { activeDate, movies, loading, error, handleDateSelect } = useMovieSchedule();

    return (
        <div className="min-h-screen bg-[#020617] text-white font-['Inter'] relative overflow-hidden">
            <div className="absolute -top-50 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[180px] opacity-40 pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 drop-shadow-lg">
                    Розклад сеансів
                </h1>

                <DateSelector
                    activeDate={activeDate.toISOString()}
                    onDateSelect={handleDateSelect}
                />

                {loading ? (
                <div className="flex justify-center py-20">
                    <LoadingSpinner />
                </div>
                ) : error ? (
                    <div className="text-center text-red-500 text-xl py-10 bg-red-500/10 rounded-xl mt-4 border border-red-500/20">
                        {error}
                    </div>
                ) : null}

                {!loading && !error && (
                    <>
                        {movies.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-10">
                                {movies.map((movie) => (
                                    <ScheduleMovieCard
                                        key={movie.id}
                                        movie={{
                                            id: String(movie.id),
                                            title: movie.title,
                                            poster: movie.poster,
                                            sessions: movie.sessions || []
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="text-6xl mb-4">😔</div>
                                <h3 className="text-2xl font-bold text-white mb-2">На цей день сеансів немає</h3>
                                <p className="text-zinc-400">Спробуйте обрати іншу дату</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieSchedule;