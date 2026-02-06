import React from 'react';
import MovieCard from '@/components/movie/MovieCard';
import type {IMovie} from '@/types/movie';

interface MovieRecommendationsProps {
    movies: IMovie[];
    currentMovieId?: number | string;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({movies, currentMovieId}) => {
    const recommendedMovies = movies
        .filter(m => m.id !== currentMovieId)
        .slice(0, 5);

    if (recommendedMovies.length === 0) return null;

    return (
        <div className="border-t border-white/5 pt-10">
            <h2 className="text-3xl font-bold text-white mb-8 pl-2 border-l-4 border-[#0753E0]">
                Особисті рекомендації
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {recommendedMovies.map(recMovie => (
                    <MovieCard
                        key={recMovie.id}
                        movie={recMovie}
                        isBlurred={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieRecommendations;