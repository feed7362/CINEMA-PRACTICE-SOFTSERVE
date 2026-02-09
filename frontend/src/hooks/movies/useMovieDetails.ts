import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { IMovieDetails } from '@/types/movie';

export const useMovieDetails = (id: string | undefined) => {
	const [movie, setMovie] = useState<IMovieDetails | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
  
	useEffect(() => {
		if (!id) return;
    
		const fetch = async () => {
			setLoading(true);
			const data = await movieApi.getMovieById(id);
			setMovie(data);
			setLoading(false);
		};

		fetch();
	}, [id]);

	return { movie, loading };
};