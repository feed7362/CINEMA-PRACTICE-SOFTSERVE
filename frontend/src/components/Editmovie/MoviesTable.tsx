import React from 'react';
import { type Movie } from '../../types/Editmovie';
import MovieRow from './MovieRow';

interface MoviesTableProps {
  movies: Movie[];
  onDelete: (id: number) => void;
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies, onDelete }) => {
  return (
    <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
      <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1.5fr] bg-[#0284c7] text-white font-bold py-4 px-6 text-center md:text-left">
        <div className="hidden md:block">Постер</div>
        <div>Назва</div>
        <div>Ціна</div>
        <div>Стан</div>
        <div className="text-right pr-10">Налаштування</div>
      </div>

      <div className="flex flex-col">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieRow 
              key={movie.id} 
              movie={movie} 
              onDelete={onDelete} 
            />
          ))
        ) : (
          <div className="p-10 text-center text-gray-400">Фільмів не знайдено</div>
        )}
      </div>
    </div>
  );
};

export default MoviesTable;