import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { IMovie } from '@/types/movie';

interface UseMoviesProps {
  GenreIds?: number[];
  StudioId?: number;
  MinRating?: number;
}

export const useMovies = (queryParams?: UseMoviesProps) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const apiParams: any = {};

        if (queryParams?.GenreIds && queryParams.GenreIds.length > 0) {
           apiParams.GenreIds = queryParams.GenreIds;
        }

        if (queryParams?.StudioId !== null && queryParams?.StudioId !== undefined) {
            apiParams.StudioId = queryParams.StudioId;
        }

        if (queryParams?.MinRating) {
            apiParams.MinRating = queryParams.MinRating;
        }

        const data = await movieApi.getNowPlaying(apiParams);
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити фільми');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [
    JSON.stringify(queryParams?.GenreIds), 
    queryParams?.StudioId, 
    queryParams?.MinRating
  ]);

  return { movies, loading, error };
};