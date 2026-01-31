import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { useMovies } from '@/hooks/useMovies';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import BaseButton from '@/components/ui/BaseButton';
import MovieCard from '@/components/movie/MovieCard';
import InfoRow from '@/components/ui/InfoRow';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading } = useMovieDetails(id);
  const { movies: recommendations } = useMovies(); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white text-xl">
        Фільм не знайдено 😔
      </div>
    );
  }

  return (
    <div className="relative w-full font-['Inter'] bg-[#020617] min-h-screen pb-20 overflow-hidden">
       
       <div className="absolute -top-25 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[150px] opacity-20 pointer-events-none z-0" />

       <div className="max-w-360 mx-auto px-6 pt-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-2/3">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <BaseButton 
              className="w-full py-4 text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(7,83,224,0.4)]"
            >
              <span className="text-xl">▷</span> Дивитися трейлер
            </BaseButton>
          </div>

          <div className="lg:col-span-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-md">
              {movie.title}
            </h1>
            
            <div className="flex flex-col gap-1 mb-8">
               <InfoRow label="Вікові обмеження" value={movie.ageRating} />
               <InfoRow label="Оригінальна назва" value={movie.originalTitle} />
               <InfoRow label="Режисер" value={movie.director} />
               <InfoRow label="Рік" value={movie.year} />
               <InfoRow label="Країна" value={movie.country} />
               <InfoRow label="Жанр" value={movie.genre} />
               <InfoRow label="Рейтинг" value={movie.rating} />
               <InfoRow label="Мова" value={movie.language} />
               <InfoRow label="Субтитри" value={movie.subtitles} />
               <InfoRow label="У головних ролях" value={movie.cast} />
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl font-bold mb-3 text-white/90">Опис:</h3>
              <p className="text-white/80 leading-relaxed font-light text-justify text-lg">
                {movie.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
             <div className="bg-[#051838]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                  Розклад сеансів
                </h3>
                
                <div className="flex flex-col gap-6 max-h-150 overflow-y-auto pr-2 custom-scrollbar">
                  {movie.schedule && movie.schedule.length > 0 ? (
                    movie.schedule.map((day, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <p className="text-white/90 text-sm font-medium pl-1">{day.date}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {day.times.map((time) => (
                            <Link 
                              key={`${day.date}-${time}`} 
                              to={`/booking/${movie.id}/${time}`} 
                              className="border border-[#0753E0] text-blue-400 hover:bg-[#0753E0] hover:text-white hover:shadow-[0_0_10px_#0753E0] transition-all duration-300 rounded-lg py-2 text-center text-sm font-bold block"
                            >
                              {time}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white/50 text-center py-4">Сеансів немає</div>
                  )}
                </div>
             </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-2xl">
             {/* Тут буде iframe youtube, поки що заглушка з постером */}
             <img 
               src={movie.poster} 
               className="w-full h-full object-cover opacity-30 blur-sm scale-105 group-hover:scale-100 transition-transform duration-700" 
               alt="Trailer Preview"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0753E0] transition-all duration-300 border border-white/20 shadow-lg">
                   <div className="w-0 h-0 border-t-12 border-t-transparent border-l-22 border-l-white border-b-12 border-b-transparent ml-2"></div>
                </div>
             </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10">
          <h2 className="text-3xl font-bold text-white mb-8 pl-2 border-l-4 border-[#0753E0]">
            Особисті рекомендації
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {recommendations
                .filter(m => m.id !== movie.id)
                .slice(0, 5)
                .map(recMovie => (
                   <MovieCard 
                     key={recMovie.id} 
                     movie={recMovie} 
                     isBlurred={false} 
                   />
             ))}
          </div>
        </div>

       </div>
    </div>
  );
};

export default MovieDetails;