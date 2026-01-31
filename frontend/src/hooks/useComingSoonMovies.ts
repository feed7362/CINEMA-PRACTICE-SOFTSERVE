import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { MoviePreviewProps } from '@/types/movie';

export const useComingSoonMovies = () => {
  const [movies, setMovies] = useState<MoviePreviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieApi.getComingSoon();
        setMovies(data);
      } catch (err) {
        setError('Не вдалося завантажити фільми');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};