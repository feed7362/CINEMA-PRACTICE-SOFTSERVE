import { useState, useEffect, useCallback } from 'react';
import { statsApi } from '@/api/statsApi';
import type { PopularMoviesParams, IStatsMovie } from '@/types/admin';

export const usePopularMovies = (initialFilters: PopularMoviesParams) => {
    const [movies, setMovies] = useState<IStatsMovie[]>([]);
    const [filters, setFilters] = useState<PopularMoviesParams>(initialFilters);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await statsApi.getPopularMovies(filters);
            setMovies(data);
        } catch (err) {
            console.error("Failed to fetch popular movies:", err);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return { movies, filters, isLoading, setFilters };
};