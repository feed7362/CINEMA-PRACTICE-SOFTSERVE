import React, { useState } from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import DeleteModal from '../components/ui/DeleteModal'; 
import effect1 from '../assets/images/backgroundEffects/effect1.png';
import effect2 from '../assets/images/backgroundEffects/effect2.png';

interface Movie {
  id: number;
  title: string;
  price: number;
  status: string;
  poster: string;
}

const MOCK_MOVIES: Movie[] = [
  { id: 1, title: 'Інтерстеллар', price: 200, status: 'В кіно', poster: 'https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg' },
  { id: 2, title: 'Джокер', price: 200, status: 'В кіно', poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
  { id: 3, title: 'Гарі Потер', price: 175, status: 'Скоро в прокаті', poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg' },
];

const MovieRow: React.FC<{ movie: Movie; onDelete: (id: number) => void }> = ({ movie, onDelete }) => (
  <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1.5fr] items-center py-4 px-6 border-b border-blue-400/10 hover:bg-white/5 transition-colors">
    <div className="hidden md:block">
      <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded-md shadow-md" />
    </div>
    <div className="font-medium text-lg">{movie.title}</div>
    <div className="text-blue-200">{movie.price} грн</div>
    <div>
      <span className={`px-3 py-1 rounded-full text-sm ${movie.status === 'В кіно' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
        {movie.status}
      </span>
    </div>
    <div className="flex items-center justify-end gap-3">
      <button className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/40 active:scale-95">
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

const EditMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setMovieToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      setMovies(movies.filter(m => m.id !== movieToDelete));
      setIsModalOpen(false);
      setMovieToDelete(null);
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        <HeaderAdmin />

        <DeleteModal 
            isOpen={isModalOpen}
            title="Видалити фільм?"
            message="Ви впевнені, що хочете видалити цей фільм? Цю дію неможливо скасувати."
            onConfirm={confirmDelete}
            onCancel={() => setIsModalOpen(false)}
        />
        
        <img src={effect1} alt="" className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen -translate-x-1/5 -translate-y-1/10" />
        <img src={effect2} alt="" className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen translate-x-1/5 translate-y-1/5" />

        <div className="flex-grow flex flex-col items-center relative z-10 px-4 py-10">
            <div className="w-full max-w-6xl">
                
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <h1 className="text-3xl font-bold text-white shrink-0">Фільми</h1>
                    <div className="w-full relative">
                        <input 
                            type="text" 
                            placeholder="Пошук" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white text-black rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-500/30 text-lg transition-shadow"
                        />
                    </div>
                </div>

                <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1.5fr] bg-[#0284c7] text-white font-bold py-4 px-6 text-center md:text-left">
                        <div className="hidden md:block">Постер</div>
                        <div>Назва</div>
                        <div>Ціна</div>
                        <div>Стан</div>
                        <div className="text-right pr-10">Налаштування</div>
                    </div>

                    <div className="flex flex-col">
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map((movie) => (
                                <MovieRow 
                                    key={movie.id} 
                                    movie={movie} 
                                    onDelete={handleDeleteClick} 
                                />
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400">Фільмів не знайдено</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EditMoviesList;