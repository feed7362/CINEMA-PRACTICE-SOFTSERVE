import React from 'react';
import {useMovieNavigation} from '@/hooks/movies/useMovieNavigation';
import type {MoviePreviewProps} from '@/types/movie';
import {PLACEHOLDER_IMAGE} from '@/constants';

interface MoviePreviewCardProps {
    movie: MoviePreviewProps;
    isBlurred?: boolean;
}

const MoviePreviewCard: React.FC<MoviePreviewCardProps> = ({movie, isBlurred}) => {
    const {id, title, imageUrl, ageRating, releaseDate, rating} = movie;
    const {goToMovieDetails} = useMovieNavigation(Number(id));
    const posterSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : PLACEHOLDER_IMAGE;

    return (
        <div
            onClick={goToMovieDetails}
            className={`flex flex-col group cursor-pointer w-full max-w-60 mx-auto transition-transform hover:scale-105 duration-300 ${
                isBlurred ? 'opacity-50 blur-sm pointer-events-none' : ''
            }`}
        >
            <article className="relative aspect-2/3 w-full rounded-[18px] overflow-hidden shadow-md bg-zinc-800">
                <img
                    src={posterSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                />


                {rating && (
                    <div
                        className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-[5px] text-[#FCC434] text-[12px] font-bold z-20 flex items-center gap-1">
                        <span>★</span>
                        <span>{rating}</span>
                    </div>
                )}

                <div
                    className="absolute top-2 right-2 bg-[#D9D9D9]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-[5px] text-black text-[12px] font-bold z-20 min-w-7 text-center">
                    {ageRating}
                </div>

                <div
                    className="absolute inset-0 bg-zinc-900/80 flex flex-col justify-end items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">

                    <span className="text-white text-[20px] font-bold mb-3 drop-shadow-lg w-full text-center">
                        Прем'єра
                    </span>

                    <div
                        className="w-full bg-[#0545BB] text-white p-3 rounded-xl shadow-md border border-white/10 flex items-center justify-center">
                        <span className="text-[16px] font-black tracking-wide">
                            {releaseDate || 'Скоро'}
                        </span>
                    </div>
                </div>
            </article>

            <div className="mt-3 h-13.5 flex items-start justify-center overflow-hidden px-1">
                <h3 className="text-white text-[18px] font-medium text-center leading-tight line-clamp-2">
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default MoviePreviewCard;