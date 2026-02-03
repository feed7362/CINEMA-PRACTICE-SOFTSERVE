import axiosClient from './axiosClient';
import type {IMovie, MoviePreviewProps, IMovieDetails, IMovieScheduleItem} from '@/types/movie';
import {parseBackendError} from '@/utils/errorUtils';

interface SessionDto {
    id: number;
    movieId: number;
    hallId: number;
    startTime: string;
    endTime: string;
}

export const movieApi = {
    getNowPlaying: async (): Promise<IMovie[]> => {
        try {
            const [moviesResponse, sessionsResponse] = await Promise.all([
                axiosClient.get('/movie', {params: {SortDirection: 0}}),
                axiosClient.get('/session')
            ]);
            const movies = moviesResponse.data.items || [];
            const allSessions: SessionDto[] = sessionsResponse.data || [];

            return movies.map((item: any) => {
                const movieSessions = allSessions.filter(
                    (session) => String(session.movieId) === String(item.id)
                );
                const formattedSessions = Array.from(new Set(movieSessions
                    .map(session => {
                        const date = new Date(session.startTime);
                        return date.toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'});
                    })))
                    .sort();

                return {
                    id: item.id,
                    title: item.titleUkr || "Без назви",
                    poster: item.imageUrl || '',
                    ageRating: item.ageRating ? `${item.ageRating}+` : "0+",
                    sessions: formattedSessions.length > 0 ? formattedSessions : [],
                    hall: item.hall || item.hallName || "Зал 1"
                };
            });
        } catch (error: any) {
            const errorMessage = parseBackendError(error.response?.data);
            console.error('Failed to fetch movies:', errorMessage);
            return [];
        }
    },

    getComingSoon: async (): Promise<MoviePreviewProps[]> => {
        try {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const {data} = await axiosClient.get('/movie', {
                params: {dateFrom: tomorrow.toISOString(), SortDirection: 0}
            });
            const movies = data.items || [];
            return movies.map((item: any) => ({
                id: item.id,
                title: item.TitleUkr || item.titleUkr || item.title || "Без назви",
                poster: item.imageUrl || item.ImageUrl || item.poster || '',
                ageRating: item.ageRating ? `${item.ageRating}+` : "0+",
                releaseDate: item.releaseDate
                    ? new Date(item.releaseDate).toLocaleDateString('uk-UA', {day: 'numeric', month: 'long'})
                    : "Скоро",
                isBlurred: false
            }));
        } catch (error: any) {
            const errorMessage = parseBackendError(error.response?.data);
            console.error('Failed to fetch coming soon movies:', errorMessage);
            return [];
        }
    },

    getMovieById: async (id: string): Promise<IMovieDetails | null> => {
        try {
            const [movieResponse, sessionsResponse] = await Promise.all([
                axiosClient.get(`/movie/${id}`),
                axiosClient.get('/session')
            ]);

            const data = movieResponse.data;
            const allSessions: SessionDto[] = sessionsResponse.data || [];

            const movieSessions = allSessions.filter(s => String(s.movieId) === String(id));

            const scheduleMap = new Map<string, string[]>();

            movieSessions.forEach(session => {
                const dateObj = new Date(session.startTime);

                const dateKey = dateObj.toLocaleDateString('uk-UA', {day: '2-digit', month: '2-digit'});
                const timeVal = dateObj.toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'});

                if (!scheduleMap.has(dateKey)) {
                    scheduleMap.set(dateKey, []);
                }
                scheduleMap.get(dateKey)?.push(timeVal);
            });

            const schedule: IMovieScheduleItem[] = Array.from(scheduleMap.entries()).map(([date, times]) => ({
                date,
                times: Array.from(new Set(times)).sort()
            }));

            schedule.sort((a, b) => a.date.localeCompare(b.date));

            return {
                id: data.id,
                title: data.TitleUkr || data.titleUkr || data.title || "Без назви",
                poster: data.imageUrl || data.ImageUrl || data.poster || '',
                ageRating: data.ageRating ? `${data.ageRating}+` : "0+",
                originalTitle: data.TitleOrg || data.originalTitle || "",
                director: data.director || "Не вказано",
                year: data.year || new Date().getFullYear(),
                country: data.country || "Невідомо",
                genre: data.genre || "Не вказано",
                rating: data.imdbRating || data.rating || "Відсутній",
                language: data.language || "Українська",
                subtitles: data.subtitles ? "Так" : "Ні",
                cast: data.actorNames || data.cast || [],
                description: data.description || "Опис наразі відсутній.",
                schedule: schedule,
                trailerUrl: data.trailerUrl || "",
            };
        } catch (error: any) {
            const errorMessage = parseBackendError(error.response?.data);
            console.error('Failed to fetch movie details:', errorMessage);
            return null;
        }
    }
};