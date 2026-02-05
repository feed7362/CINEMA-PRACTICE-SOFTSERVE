import { useState, useEffect } from 'react';
import { movieApi } from '@/api/movieApi';
import type { IMovie } from '@/types/movie';

export const useMovieSchedule = () => {
    const [activeDate, setActiveDate] = useState<Date>(new Date());
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await movieApi.getScheduleByDate(activeDate);
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError("Не вдалося завантажити розклад. Спробуйте пізніше.");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, [activeDate]);

    const handleDateSelect = (dateInput: string | Date) => {
        const newDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        setActiveDate(newDate);
    };

    return {
        activeDate,
        movies,
        loading,
        error,
        handleDateSelect
    };
};