import React, { useEffect, useState } from 'react';
import MovieCard from '@/components/movie/MovieCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { movieApi } from '@/api/movieApi';
import type { IMovie } from '@/types/movie';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await movieApi.getNowPlaying();
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError("Не вдалося завантажити список фільмів");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="relative w-full h-full font-['Inter']">
            <div className="absolute -top-50 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[180px] opacity-40 pointer-events-none z-0" />

            <div className="w-full max-w-360 mx-auto px-6 py-10 z-10 relative">
                <h1 className="text-white text-[48px] font-bold text-center mb-12 drop-shadow-lg">
                    Зараз у кіно
                </h1>

                {error && (
                    <div className="text-center text-red-500 text-xl py-10">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 place-items-center">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isBlurred={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;