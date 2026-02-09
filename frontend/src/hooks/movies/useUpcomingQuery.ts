import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { MoviePreviewProps } from '@/types/movie'; 

export const useUpcomingQuery = () => {
	const [upcomingMovies, setUpcomingMovies] = useState<MoviePreviewProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await movieApi.getComingSoon();
				setUpcomingMovies(data);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		fetch();
	}, []);

	return { upcomingMovies, loading };
};