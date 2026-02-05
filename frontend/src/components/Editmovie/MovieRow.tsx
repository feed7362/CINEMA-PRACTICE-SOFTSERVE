import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Movie } from '../../types/Editmovie'; 

interface MovieRowProps {
  movie: Movie;
  onDelete: (id: number) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ movie, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1.5fr] items-center py-4 px-6 border-b border-blue-400/10 hover:bg-white/5 transition-colors">
      <div className="hidden md:block">
        <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded-md shadow-md" />
      </div>
      
      <div className="font-medium text-lg text-white">{movie.title}</div>
      <div className="text-blue-200">{movie.price} грн</div>
      
      <div>
        <span className={`px-3 py-1 rounded-full text-sm ${movie.status === 'В кіно' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
          {movie.status}
        </span>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button 
          onClick={() => navigate(`/admin/edit-movie/${movie.id}`)}
          className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/40 active:scale-95"
        >
          Редагувати
        </button>

        <button 
          onClick={() => onDelete(movie.id)}
          className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-lg transition-all active:scale-95 group"
        >
          <svg className="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;