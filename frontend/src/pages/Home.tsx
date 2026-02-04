import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/movie/MovieCard';
import FilterSidebar from '@/components/filters/FilterSidebar';
import { useMovies } from '@/hooks/useMovies';
import { filterApi, type IFilterItem } from '@/api/filterApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { movieApi } from '@/api/movieApi';
import type { IMovie } from '@/types/movie';

const Home: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [genres, setGenres] = useState<IFilterItem[]>([]);
  const [studios, setStudios] = useState<IFilterItem[]>([]);

  const { movies, loading, error } = useMovies({ 
    GenreIds: selectedGenres.length > 0 ? selectedGenres : undefined,
    StudioId: selectedStudio ?? undefined,
    MinRating: selectedRating ?? undefined
  });

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

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedStudio(null);
    setSelectedRating(null);
  };

  if (loading && movies.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen font-['Inter'] bg-[#020617] overflow-y-auto overflow-x-hidden no-scrollbar">
      <div className="absolute -top-50 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[180px] opacity-40 pointer-events-none z-0" />

      <div className="w-full max-w-400 mx-auto px-4 sm:px-6 py-10 z-10 relative">
        <h1 className="text-white text-[48px] font-bold text-center mb-12 drop-shadow-lg">
          Зараз у кіно
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24">
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
              <div className="text-center text-red-500 text-xl py-10 bg-white/5 rounded-2xl border border-red-500/20">
                {error}
              </div>
            )}

            {!loading && !error && movies.length === 0 && (
              <div className="text-center text-white/50 text-xl py-20 bg-white/5 rounded-2xl border border-white/10">
                За обраними фільтрами фільмів не знайдено 😔
              </div>
            )}

            {!error && movies.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 place-items-center">
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
      </div>
    </div>
  );
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