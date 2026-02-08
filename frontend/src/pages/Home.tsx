import React, {useState, useEffect} from 'react';
import MovieCard from '@/components/movie/MovieCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import {movieApi} from '@/api/movieApi';
import {filterApi, type IFilterItem} from '@/api/filterApi';
import type { IMovieBase } from '@/types/common';
import FullScreenLoader from '@/components/loader/FullScreenLoader';

const Home: React.FC = () => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [movies, setMovies] = useState<IMovieBase[]>([]);
    const [genres, setGenres] = useState<IFilterItem[]>([]);
    const [studios, setStudios] = useState<IFilterItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [genresData, studiosData] = await Promise.all([
                    filterApi.getGenres(),
                    filterApi.getStudios()
                ]);
                setGenres(genresData);
                setStudios(studiosData);
            } catch (e) {
                console.error("Failed to load filters", e);
            }
        };
        loadFilters();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const filters = {
                    GenreId: selectedGenres.length > 0 ? selectedGenres : undefined,
                    StudioId: selectedStudio ?? undefined,
                    MinRating: selectedRating ?? undefined
                };

                const data = await movieApi.getNowPlaying(filters);
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError("Не вдалося завантажити список фільмів");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenres, selectedStudio, selectedRating]);

    const handleReset = () => {
        setSelectedGenres([]);
        setSelectedStudio(null);
        setSelectedRating(null);
    };

    if (loading) return <FullScreenLoader />;

    return (
        <div
            className="relative w-full h-screen font-['Inter'] bg-[#020617] overflow-y-auto overflow-x-hidden no-scrollbar">

            <div
                className="absolute -top-50 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[180px] opacity-40 pointer-events-none z-0"/>

            <div className="w-full max-w-400 mx-auto px-4 sm:px-6 py-10 z-10 relative">
                <h1 className="text-white text-[48px] font-bold text-center mb-12 drop-shadow-lg">
                    Зараз у кіно
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 z-20">
                        <FilterSidebar
                            genres={genres}
                            studios={studios}
                            selectedGenres={selectedGenres}
                            selectedStudio={selectedStudio}
                            selectedRating={selectedRating}
                            onSelectGenre={setSelectedGenres}
                            onSelectStudio={setSelectedStudio}
                            onSelectRating={setSelectedRating}
                            onReset={handleReset}
                        />
                    </div>
                    
                    <div className="grow w-full">
                        {error && (
                            <div
                                className="text-center text-red-500 text-xl py-10 bg-white/5 rounded-2xl border border-red-500/20">
                                {error}
                            </div>
                        )}

                        {!loading && !error && movies.length === 0 && (
                            <div
                                className="text-center text-white/50 text-xl py-20 bg-white/5 rounded-2xl border border-white/10">
                                За обраними фільтрами фільмів не знайдено 😔
                            </div>
                        )}
                        
                        {!error && movies.length > 0 && (
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 place-items-center">
                                {movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        isBlurred={false}
                                    />
                                ))}
                            </div>
                        )}

                        {loading && movies.length > 0 && (
                            <div className="flex justify-center py-10">
                                <LoadingSpinner/>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;