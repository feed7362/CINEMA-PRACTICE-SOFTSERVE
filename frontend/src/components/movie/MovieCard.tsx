import React from "react";
import { useMovieNavigation } from "../../hooks/useMovieNavigation";
import type { MovieCardProps } from "../../types/movie";

const MovieCard: React.FC<MovieCardProps> = ({ movie, isBlurred }) => {
  const { id, title, poster, ageRating, sessions } = movie;
  
  const { goToMovieDetails, goToBooking } = useMovieNavigation(id);

  return (
    <div 
      onClick={goToMovieDetails} 
      className={`flex flex-col group cursor-pointer w-full max-w-[240px] mx-auto ${
        isBlurred ? 'opacity-50 blur-sm pointer-events-none' : ''
      }`}
    >
      <article className="relative aspect-[2/3] w-full rounded-[18px] overflow-hidden shadow-md bg-zinc-800">
        <img 
          className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50" 
          src={poster} 
          alt={title} 
        />
        
        <div className="absolute top-2 right-2 bg-[#D9D9D9]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-[5px] text-black text-[12px] font-bold z-20 min-w-[28px] text-center">
          {ageRating}
        </div>

        <div className="absolute inset-0 bg-zinc-900/70 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="text-white text-[16px] font-bold mb-3 drop-shadow-lg">
            Сеанси на сьогодні
          </span>
          
          <div className="flex flex-wrap gap-2">
            {sessions.slice(0, 3).map((time) => (
              <button 
                key={time} 
                onClick={(e) => goToBooking(e, time)} 
                className="bg-[#0545BB] hover:bg-[#032d7b] text-white text-[15px] px-4 py-2.5 rounded-[12px] transition-colors duration-300 font-bold shadow-md active:scale-95"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </article>
      
      <h3 className="mt-3 text-white text-[20px] font-normal text-center leading-tight">
        {title}
      </h3>
    </div>
  );
};

export default MovieCard;