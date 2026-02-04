import React from 'react';
import { Link } from 'react-router-dom';
import type {Session} from "@/types/movie.ts";

interface ScheduleMovie {
  id: string;
  title: string;
  poster: string;
  hall: string;
  sessions: Session[];
}

interface ScheduleMovieCardProps {
  movie: ScheduleMovie;
}

const PLACEHOLDER_IMAGE = "https://placehold.co/300x450/1e293b/ffffff?text=Постер+відсутній";

const ScheduleMovieCard: React.FC<ScheduleMovieCardProps> = ({ movie }) => {
  return (
    <div className="flex gap-6 items-start group">
      <div className="w-45 shrink-0 rounded-xl overflow-hidden shadow-lg aspect-2/3 bg-zinc-800">
        <Link to={`/movie/${movie.id}`} className="block w-full h-full cursor-pointer">
          <img 
            src={movie.poster || PLACEHOLDER_IMAGE}
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
        </Link>
      </div>

      <div className="flex flex-col pt-2 w-full">
        <h2 className="text-3xl font-bold mb-2">
          <Link to={`/movie/${movie.id}`} className="hover:text-[#60A5FA] transition-colors">
            {movie.title}
          </Link>
        </h2>
        <p className="text-xl text-zinc-400 mb-6">{movie.hall}</p>

        <div className="flex flex-wrap gap-4">
          {movie.sessions.map((session) => (
            <Link
              key={session.id}
              to={`/booking/${session.id}`}
              className="px-6 py-2 rounded-xl border border-[#0753E0] text-[#60A5FA] font-mono text-lg font-bold hover:bg-[#0753E0] hover:text-white transition-all duration-300 shadow-[0_0_10px_transparent] hover:shadow-[0_0_15px_#0753E0]"
            >
              {session.time}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleMovieCard;