import { useState, useEffect } from 'react';
import { filterApi, type IFilterItem } from '@/api/filterApi';
import { useMoviesQuery } from '@/hooks/movies/useMoviesQuery'; 

export const useCatalog = () => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const [genres, setGenres] = useState<IFilterItem[]>([]);
    const [studios, setStudios] = useState<IFilterItem[]>([]);
    const [areFiltersLoading, setAreFiltersLoading] = useState(true);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [genresData, studiosData] = await Promise.all([
                    filterApi.getGenres(),
                    filterApi.getStudios()
                ]);
                setGenres(genresData);
                setStudios(studiosData);
            } catch (e) {
                console.error("Failed to load filters", e);
            } finally {
                setAreFiltersLoading(false);
            }
        };
        loadFilters();
    }, []);

    const filters = {
        GenreIds: selectedGenres.length > 0 ? selectedGenres : undefined,
        StudioId: selectedStudio ?? undefined,
        MinRating: selectedRating ?? undefined
    };

    const { 
        movies, 
        loading: isMoviesLoading, 
        error 
    } = useMoviesQuery(filters);

    const handleReset = () => {
        setSelectedGenres([]);
        setSelectedStudio(null);
        setSelectedRating(null);
    };

    const isLoading = areFiltersLoading || isMoviesLoading;

    return {
        movies,
        genres,
        studios,
        isLoading,
        error,
        selectedGenres,
        selectedStudio,
        selectedRating,
        setSelectedGenres,
        setSelectedStudio,
        setSelectedRating,
        handleReset
    };
};