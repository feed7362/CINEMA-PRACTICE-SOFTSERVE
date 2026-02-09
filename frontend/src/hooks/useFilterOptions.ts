import { useState, useEffect } from 'react';
import { filterApi } from '@/api/filterApi';
import type { IFilterItem } from '@/types/admin';

export const useFilterOptions = () => {
    const [genres, setGenres] = useState<IFilterItem[]>([]);
    const [halls, setHalls] = useState<IFilterItem[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [directors, setDirectors] = useState<string[]>([]);
    const [ageRatings, setAgeRatings] = useState<number[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const [
                    genresData, 
                    hallsData, 
                    countriesData, 
                    directorsData, 
                    ageRatingsData
                ] = await Promise.all([
                    filterApi.getGenres(),
                    filterApi.getHalls(),
                    filterApi.getCountries(),
                    filterApi.getDirectors(),
                    filterApi.getAgeRatings()
                ]);

                if (isMounted) {
                    setGenres(genresData || []);
                    setHalls(hallsData || []);
                    setCountries(countriesData || []);
                    setDirectors(directorsData || []);
                    setAgeRatings(ageRatingsData || []);
                }
            } catch (e) {
                console.error("Не вдалося завантажити фільтри", e);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadData();

        return () => { isMounted = false; };
    }, []);

    return { genres, halls, countries, directors, ageRatings, isLoading };
};