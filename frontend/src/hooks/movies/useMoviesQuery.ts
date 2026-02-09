import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { IMovie } from '@/types/movie';

// Цей хук вміє тільки одне: взяти параметри -> повернути список фільмів
export const useMoviesQuery = (filters: any) => {
	const [movies, setMovies] = useState<IMovie[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const data = await movieApi.getNowPlaying(filters);
				setMovies(data);
			} catch (err) {
				setError('Failed to fetch movies');
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, [JSON.stringify(filters)]); // реагує на зміну фільтрів

	return { movies, loading, error };
};