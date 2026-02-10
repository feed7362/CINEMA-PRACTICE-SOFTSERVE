import { useState, useEffect } from 'react';
import { statsApi } from '@/api/statsApi';
import type { IStatsMovie } from '@/types/admin';

export const useMovieSearch = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState<IStatsMovie[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (searchTerm.trim().length < 1) {
				setSuggestions([]);
				return;
			}
			setIsLoading(true);
			try {
				const data = await statsApi.getPopularMovies({ Amount: 100 });
				const lowerTerm = searchTerm.toLowerCase();
				const filtered = data.filter((movie) => 
					movie.title.toLowerCase().includes(lowerTerm) || 
                    movie.director.toLowerCase().includes(lowerTerm),
				);
				setSuggestions(filtered);
			} catch (error) {
				console.error(error);
				setSuggestions([]);
			} finally {
				setIsLoading(false);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	return { searchTerm, setSearchTerm, suggestions, setSuggestions, isLoading };
};