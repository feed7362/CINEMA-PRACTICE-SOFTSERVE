import React from 'react';
import MoviePreviewCard from '@/components/movie/MoviePreviewCard';
import { useComingSoonMovies } from '@/hooks/useComingSoonMovies';

const SoonMovies: React.FC = () => {
  const { movies, loading, error } = useComingSoonMovies();

  return (
  //check  
    <div className="relative w-full h-full font-['Inter']">
      
      <div className="absolute -top-50 right-0 w-150 h-150 bg-[#0753E0] rounded-full blur-[180px] opacity-30 pointer-events-none z-0" />

      <div className="w-full max-w-360 mx-auto px-6 py-10 z-10 relative">
        <h1 className="text-white text-[48px] font-bold text-center mb-12 drop-shadow-lg">
          Скоро у кіно
        </h1>

        {loading && (
          <div className="flex items-center justify-center h-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0753E0]"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 text-xl py-10">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
           <div className="text-center text-white/50 text-xl py-10">
             На жаль, анонсів поки немає. Завітайте пізніше!
           </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 place-items-center">
            {movies.map((movie) => (
              <MoviePreviewCard 
                key={movie.id} 
                {...movie}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoonMovies;