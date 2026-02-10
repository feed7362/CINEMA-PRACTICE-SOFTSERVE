import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { IMovieBase } from '@/types/common';

export const useMoviesQuery = (filters: any) => {
	const [movies, setMovies] = useState<IMovieBase[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const data = await movieApi.getNowPlaying(filters);
				setMovies(data);
			} catch (err) {
				console.log(err);
				setError('Failed to fetch movies');
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, [JSON.stringify(filters)]);

	return { movies, loading, error };
};