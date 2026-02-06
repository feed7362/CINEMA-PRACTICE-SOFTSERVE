import React, { useRef } from 'react';
import MovieCard from '@/components/movie/MovieCard';
import MoviePreviewCard from '@/components/movie/MoviePreviewCard';
import MovieSchedule from '@/components/movie/MovieSchedule';
import MovieTrailer from '@/components/movie/MovieTrailer';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import type { IMovie, IMovieScheduleItem } from '@/types/movie';

const MOCK_MOVIE_CARD = {
  id: '1',
  title: 'Інтерстеллар',
  poster: 'https://image.tmdb.org/t/p/w500/gEU2QniL6E77NI6lCU6MxlNBvIx.jpg',
  ageRating: '12+',
  sessions: [
    { id: 101, time: '14:30' },
    { id: 102, time: '18:00' },
    { id: 103, time: '21:00' }
  ]
};

const MOCK_NO_SESSIONS_MOVIE = {
    ...MOCK_MOVIE_CARD,
    id: '2',
    title: 'Дюна: Частина друга',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    sessions: [] 
};

const MOCK_PREVIEW = {
    id: '3',
    title: 'Дедпул і Росомаха',
    poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZonExUUQq0j4zp32Pb1c.jpg',
    releaseDate: '25.07.2024',
    ageRating: '18+'
};

const MOCK_SCHEDULE: IMovieScheduleItem[] = [
    {
        date: 'Сьогодні',
        sessions: [
            { id: 201, time: '10:00' },
            { id: 202, time: '14:30' },
            { id: 203, time: '19:00' }
        ]
    },
    {
        date: 'Завтра',
        sessions: [
            { id: 204, time: '12:00' },
            { id: 205, time: '18:00' }
        ]
    }
];

// ВИПРАВЛЕНО: Залишено тільки поля, які гарантовано є в IMovie (id, title, poster, ageRating)
const MOCK_RECOMMENDATIONS: IMovie[] = [
    { 
        id: '10', 
        title: 'Оппенгеймер', 
        poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', 
        ageRating: '16+' 
    },
    { 
        id: '11', 
        title: 'Барбі', 
        poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', 
        ageRating: '12+' 
    },
    { 
        id: '12', 
        title: 'Аватар 2', 
        poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', 
        ageRating: '12+' 
    },
];

const MoviesDemo: React.FC = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-12 pb-20 text-white">
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Movie Components</h1>
        <p className="text-gray-400">
          Компоненти, пов'язані з відображенням фільмів, розкладу та карток.
        </p>
      </div>

      <section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
          Movie Cards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            
            <div className="flex flex-col gap-4">
                <span className="text-sm font-bold text-gray-500 uppercase">Standard Card (With Sessions)</span>
                {/* @ts-ignore */}
                <MovieCard movie={MOCK_MOVIE_CARD} isBlurred={false} />
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-sm font-bold text-gray-500 uppercase">Standard Card (No Sessions)</span>
                {/* @ts-ignore */}
                <MovieCard movie={MOCK_NO_SESSIONS_MOVIE} isBlurred={false} />
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-sm font-bold text-gray-500 uppercase">Preview Card (Soon)</span>
                <MoviePreviewCard {...MOCK_PREVIEW} isBlurred={false} />
            </div>

        </div>
      </section>

      <section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
          Schedule & Trailer
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">MovieSchedule Component</h3>
                <MovieSchedule schedule={MOCK_SCHEDULE} />
            </div>

            <div className="lg:col-span-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">MovieTrailer Component</h3>
                <MovieTrailer 
                    ref={playerRef}
                    poster="https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
                    trailerUrl="https://www.youtube.com/watch?v=zSWdZVtXT7E"
                />
            </div>
        </div>
      </section>

      <section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
          Recommendations
        </h2>
        <p className="text-sm text-gray-400 mb-6">
            Секція "Особисті рекомендації". Фільтрує поточний фільм зі списку.
        </p>

        <MovieRecommendations 
            movies={MOCK_RECOMMENDATIONS} 
            currentMovieId="999" 
        />
      </section>

    </div>
  );
};

export default MoviesDemo;