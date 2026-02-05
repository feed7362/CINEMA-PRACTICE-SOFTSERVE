import React from 'react';
import { Link } from 'react-router-dom';
import type { MoviePreviewProps } from '@/types/movie';
import { PLACEHOLDER_IMAGE } from '@/constants';

const MoviePreviewCard: React.FC<MoviePreviewProps> = ({ id, title, poster, releaseDate, ageRating, isBlurred }) => {
  
  const posterSrc = poster && poster.trim() !== '' ? poster : PLACEHOLDER_IMAGE;

  return (
    <Link 
      to={`/movie/${id}`} 
      className={`flex flex-col group cursor-pointer w-full max-w-60 ${
        isBlurred ? 'opacity-40 blur-[2px] pointer-events-none' : ''
      }`}
    >
      <article className="relative aspect-2/3 w-full rounded-[18px] overflow-hidden shadow-md bg-zinc-800">
        <img 
          src={posterSrc} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = PLACEHOLDER_IMAGE;
          }}
        />
        
        <div className="absolute top-2 right-2 bg-[#D9D9D9]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-[5px] text-black text-[12px] font-bold z-20 min-w-7 text-center">
          {ageRating}
        </div>

        <div className="absolute inset-0 bg-[#D9D9D9]/30 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="absolute inset-0 bg-zinc-900/70 z-[-1]" />
          <span className="text-white text-[16px] font-bold mb-2 uppercase tracking-wider text-center w-full">
            Прем’єра
          </span>
          <div className="w-full py-3 rounded-xl text-center shadow-lg bg-linear-to-tr from-[#0753E0] to-[#032D7B]">
            <span className="text-white text-[18px] font-bold">{releaseDate}</span>
          </div>
        </div>
      </article>
      
      <div className="mt-3 h-13.5 flex items-start justify-center overflow-hidden px-1">
        <h3 className="text-white text-[20px] font-normal text-center leading-tight line-clamp-2 text-ellipsis">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default MoviePreviewCard;