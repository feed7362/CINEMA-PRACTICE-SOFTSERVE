import { forwardRef, useState } from 'react';
import { PLACEHOLDER_IMAGE } from '@/constants';

interface MovieTrailerProps {
  poster: string | null;
  trailerUrl?: string | null | undefined;
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const MovieTrailer = forwardRef<HTMLDivElement, MovieTrailerProps>(({ poster, trailerUrl }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const posterSrc = poster && poster.trim() !== '' ? poster : PLACEHOLDER_IMAGE;
  
  const videoId = trailerUrl ? getYouTubeId(trailerUrl) : null;

  const handlePlay = () => {
    if (videoId) {
      setIsPlaying(true);
    } else {
      alert("Трейлер для цього фільму відсутній");
    }
  };

  return (
    <div ref={ref} className="mb-20 flex justify-center w-full">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
         
         {isPlaying && videoId ? (
           <iframe
             className="w-full h-full"
             src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
             title="YouTube video player"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
           />
         ) : (
           <div 
             onClick={handlePlay}
             className="relative w-full h-full group cursor-pointer"
           >
             <img 
               src={posterSrc} 
               className="w-full h-full object-cover opacity-40 blur-sm scale-105 group-hover:scale-100 transition-transform duration-700" 
               alt="Trailer Preview"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
               }}
             />
             
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0753E0] transition-all duration-300 border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                   <div className="w-0 h-0 border-t-14 border-t-transparent border-l-26 border-l-white border-b-14 border-b-transparent ml-2"></div>
                </div>
             </div>

             {!videoId && (
               <div className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-sm">
                 Трейлер недоступний
               </div>
             )}
           </div>
         )}

      </div>
    </div>
  );
});

export default MovieTrailer;