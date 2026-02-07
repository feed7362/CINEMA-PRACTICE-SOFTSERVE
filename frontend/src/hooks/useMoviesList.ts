import { useState, useEffect, useMemo } from 'react';
import { movieApi } from '@/api/movieApi';
import type { IMovieDetails } from '@/types/movie';

export const useMoviesList = () => {
    const [movies, setMovies] = useState<IMovieDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<number | string | null>(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const data = await movieApi.getAllMovies();
            setMovies(data);
        } catch (error) {
            console.error("Помилка завантаження списку фільмів:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMovies = useMemo(() => {
        if (!searchTerm) return movies;
        const lowerTerm = searchTerm.toLowerCase();
        return movies.filter(movie => 
            (movie.title && movie.title.toLowerCase().includes(lowerTerm)) ||
            (movie.originalTitle && movie.originalTitle.toLowerCase().includes(lowerTerm))
        );
    }, [movies, searchTerm]);

    const askToDelete = (id: number | string) => {
        setMovieToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!movieToDelete) return;

        try {
            await movieApi.deleteMovie(movieToDelete);
            setMovies(prev => prev.filter(m => m.id !== movieToDelete));
            setIsDeleteModalOpen(false);
            setMovieToDelete(null);
        } catch (error) {
            alert('Не вдалося видалити фільм. Можливо, на нього є активні сеанси.');
            console.error(error);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setMovieToDelete(null);
    };

    return {
        movies: filteredMovies,
        isLoading,
        searchTerm,
        setSearchTerm,
        isDeleteModalOpen,
        askToDelete,
        confirmDelete,
        cancelDelete
    };
};