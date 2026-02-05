import { useState } from 'react';
import { type Movie, MOCK_MOVIES } from '../types/Editmovie';

export const useMoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<number | null>(null);

  const askToDelete = (id: number) => {
    setMovieToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      setMovies(movies.filter(m => m.id !== movieToDelete));
      setIsDeleteModalOpen(false);
      setMovieToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setMovieToDelete(null);
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    movies: filteredMovies,
    searchTerm,
    setSearchTerm,
    isDeleteModalOpen,
    askToDelete,
    confirmDelete,
    cancelDelete
  };
};