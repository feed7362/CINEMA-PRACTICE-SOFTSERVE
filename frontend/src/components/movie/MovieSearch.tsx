import React, { useRef, useEffect } from 'react';
import SearchIcon from '@/assets/icons/SearchIcon';
import type { IStatsMovie } from '@/types/admin';

interface MovieSearchProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  suggestions: IStatsMovie[];
  onSelect: (movie: IStatsMovie) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  onSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full lg:w-96 z-50">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Назва фільму або режисер..."
        className="w-full pl-11 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
      />

      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
        <SearchIcon size={18} />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto custom-scrollbar z-50">
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              onClick={() => onSelect(movie)}
              className="w-full p-3 flex gap-3 hover:bg-white/5 text-left border-b border-white/5 last:border-0 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{movie.title}</p>
                <p className="text-xs text-zinc-400 truncate">{movie.director}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;