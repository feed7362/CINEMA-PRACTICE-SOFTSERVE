import React from 'react';
import { useMovieNavigation } from '@/hooks/movies/useMovieNavigation';
import type { IMovieCard } from '@/types/movie';
import { PLACEHOLDER_IMAGE } from '@/constants';

interface MoviePreviewCardProps {
    movie: IMovieCard;
    isBlurred?: boolean;
}

const MoviePreviewCard: React.FC<MoviePreviewCardProps> = ({ movie, isBlurred }) => {
    const { id, title, imageUrl, ageRating, rating, releaseDate } = movie;
    const { goToMovieDetails } = useMovieNavigation(Number(id));
    const posterSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : PLACEHOLDER_IMAGE;
    const shouldBlur = isBlurred || movie.isBlurred;

    return (
        <div 
            onClick={goToMovieDetails}
            className={`relative group cursor-pointer w-full rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 bg-zinc-800 aspect-2/3 ${shouldBlur ? 'opacity-50 blur-sm pointer-events-none' : ''}`}
        >
            <img 
                src={posterSrc} 
                alt={title} 
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                loading="lazy"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
            />
            
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-black text-[10px] font-bold z-10">
                {ageRating}
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 opacity-100 transition-all duration-300">
                <h3 className="text-white text-sm font-bold leading-tight mb-1 line-clamp-2">
                    {title}
                </h3>
                
                <div className="flex justify-between items-center text-xs text-zinc-300">
                    <span>{releaseDate ? new Date(releaseDate).getFullYear() : ''}</span>
                    {rating && (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                            ★ {rating}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoviePreviewCard;