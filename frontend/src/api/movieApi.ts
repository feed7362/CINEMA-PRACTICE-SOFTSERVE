import axiosClient from './axiosClient';
import type { IMovieBase } from '@/types/common';
import type { IMovieScheduleItem, SessionDisplay } from '@/types/session';
import type { CreateMovie } from '@/types/admin';
import type { MoviePreviewProps, IMovieDetails } from '@/types/movie'; 
import { parseBackendError } from '@/utils/errorUtils';

interface SessionDto {
	id: number;
	movieId: number;
	hallName: string;
	hallFormat: string;
	startTime: string;
	endTime: string;
}

export const movieApi = {
	getAllMovies: async (): Promise<IMovieDetails[]> => {
		try {
			const response = await axiosClient.get('/movie', {
				params: { SortDirection: 0, pageSize: 100 },
			});
			return response.data.items || [];
		} catch (error: any) {
			console.error('Failed to fetch movies:', error);
			return [];
		}
	},

	deleteMovie: async (id: number | string): Promise<void> => {
		try {
			await axiosClient.delete(`/movie/${id}`);
		} catch (error: any) {
			throw parseBackendError(error.response?.data);
		}
	},

	updateMovie: async (movieData: any): Promise<void> => {
		try {
			await axiosClient.put('/movie', movieData);
		} catch (error: any) {
			throw parseBackendError(error.response?.data);
		}
	},

	getNowPlaying: async (filterParams?: any): Promise<IMovieBase[]> => {
		try {
			const now = new Date();
			const [moviesResponse, sessionsResponse] = await Promise.all([
				axiosClient.get('/movie', {
					params: { SortDirection: 0, ...filterParams },

					paramsSerializer: (params) => {
						const searchParams = new URLSearchParams();

						Object.keys(params).forEach((key) => {
							const value = params[key];

							if (value === undefined || value === null) return;

							if (Array.isArray(value)) {
								searchParams.append(key, value.join(','));
							} else {
								searchParams.append(key, value);
							}
						});

						return searchParams.toString();
					},
				}),
				axiosClient.get('/session'),
			]);

			const movies = moviesResponse.data.items || [];
			const allSessions = sessionsResponse.data || [];

			const startOfDay = new Date();
			startOfDay.setHours(0, 0, 0, 0);

			const endOfDay = new Date();
			endOfDay.setHours(23, 59, 59, 999);

			return movies.map((item: any) => {
				const todaysSessions = allSessions.filter((session: any) => {
					const sessionTime = new Date(session.startTime);
					return String(session.movieId) === String(item.id) &&
                        sessionTime >= now &&
                        sessionTime <= endOfDay;
				});

				const formattedSessions = todaysSessions
					.map((session: any) => {
						const date = new Date(session.startTime);
						return {
							id: session.id,
							time: date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
							hallName: session.hallName || 'Зал 1',
							hallFormat: session.hallFormat || '2D',
						};
					})
					.sort((a: any, b: any) => a.time.localeCompare(b.time));

				return {
					id: item.id,
					title: item.titleUkr || 'Без назви',
					imageUrl: item.imageUrl || '',
					ageRating: item.ageRating ? `${item.ageRating}+` : '0+',
					sessions: formattedSessions,
					hall: item.hall || item.hallName || 'Зал 1',
				};
			});
		} catch (error: any) {
			console.error('Failed to fetch movies:', error);
			return [];
		}
	},

	getComingSoon: async (): Promise<MoviePreviewProps[]> => {
		try {
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrow.setHours(0, 0, 0, 0);

			const { data } = await axiosClient.get('/movie', {
				params: { dateFrom: tomorrow.toISOString(), SortDirection: 0 },
			});

			const movies = data.items || [];

			return movies
				.filter((item: any) => {
					const releaseDate = new Date(item.releaseDate);
					return releaseDate >= tomorrow;
				})
				.map((item: any) => ({
					id: item.id,
					title: item.titleUkr || item.title || 'Без назви',
					imageUrl: item.imageUrl || '',
					ageRating: item.ageRating ? `${item.ageRating}+` : '0+',
					releaseDate: item.releaseDate
						? new Date(item.releaseDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })
						: 'Скоро',
					isBlurred: false,
					rating: item.imdbRating || 0,
					rawDate: new Date(item.releaseDate).getTime(),
				}))
				.sort((a: any, b: any) => a.rawDate - b.rawDate);

		} catch (error: any) {
			const errorMessage = parseBackendError(error.response?.data);
			console.error('Failed to fetch coming soon movies:', errorMessage);
			return [];
		}
	},

	getScheduleByDate: async (date: Date): Promise<IMovieBase[]> => {
		try {
			const [moviesResponse, sessionsResponse] = await Promise.all([
				axiosClient.get('/movie', { params: { SortDirection: 0 } }),
				axiosClient.get('/session'),
			]);
			const now = new Date();
			const isToday = date.toDateString() === now.toDateString();

			const movies = moviesResponse.data.items || [];
			const allSessions: SessionDto[] = sessionsResponse.data || [];

			const startOfDay = new Date(date);
			startOfDay.setHours(0, 0, 0, 0);

			const endOfDay = new Date(date);
			endOfDay.setHours(23, 59, 59, 999);

			const scheduledMovies = movies.map((item: any) => {
				const movieSessions = allSessions.filter((session) => {
					const sessionTime = new Date(session.startTime);
					const effectiveStartTime = isToday ? now : startOfDay;

					return String(session.movieId) === String(item.id) &&
                        sessionTime >= effectiveStartTime &&
                        sessionTime <= endOfDay;
				});

				if (movieSessions.length === 0) return null;

				const formattedSessions = movieSessions
					.map((session: any) => {
						const date = new Date(session.startTime);
						return {
							id: session.id,
							time: date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
							hallName: session.hallName || 'Зал 1',
							hallFormat: session.hallFormat || '2D',
						};
					})
					.sort((a: any, b: any) => a.time.localeCompare(b.time));

				return {
					id: item.id,
					title: item.titleUkr || 'Без назви',
					imageUrl: item.imageUrl || '',
					ageRating: item.ageRating ? `${item.ageRating}+` : '0+',
					sessions: formattedSessions,
					hall: item.hall || item.hallName || 'Зал 1',
				};
			});

			return scheduledMovies.filter((movie: IMovieBase): movie is IMovieBase => movie !== null);

		} catch (error: any) {
			const errorMessage = parseBackendError(error.response?.data);
			console.error('Failed to fetch schedule:', errorMessage);
			return [];
		}
	},

	getMovieById: async (id: string): Promise<IMovieDetails | null> => {
		try {
			const [movieResponse, sessionsResponse] = await Promise.all([
				axiosClient.get(`/movie/${id}`),
				axiosClient.get('/session'),
			]);

			const data = movieResponse.data;
			const allSessions: SessionDto[] = sessionsResponse.data || [];

			const movieSessions = allSessions.filter((s) => String(s.movieId) === String(id));

			const scheduleMap = new Map<string, SessionDisplay[]>();

			movieSessions.forEach((session) => {
				const dateObj = new Date(session.startTime);

				const dateKey = dateObj.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit' });
				const timeVal = dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

				if (!scheduleMap.has(dateKey)) {
					scheduleMap.set(dateKey, []);
				}

				scheduleMap.get(dateKey)?.push({
					id: session.id,
					time: timeVal,
					hallName: session.hallName,
					hallFormat: session.hallFormat,
				});
			});

			const schedule: IMovieScheduleItem[] = Array.from(scheduleMap.entries()).map(([date, sessions]) => ({
				date,
				sessions: sessions.sort((a, b) => a.time.localeCompare(b.time)),
			}));

			schedule.sort((a, b) => a.date.localeCompare(b.date));

			return {
				id: data.id,
				title: data.titleUkr || 'Без назви',
				imageUrl: data.imageUrl,
				ageRating: data.ageRating ? `${data.ageRating}+` : '0+',
				originalTitle: data.titleOrg || data.originalTitle || '',
				director: data.director || 'Не вказано',
				year: data.year || new Date().getFullYear(),
				country: data.country || 'Невідомо',
				genre: Array.isArray(data.genreNames)
					? data.genreNames.join(', ')
					: (data.genre || 'Не вказано'),
				rating: data.imdbRating || 0,
				language: data.language || 'Українська',
				subtitles: data.subtitles ? 'Так' : 'Ні',
				cast: data.actorNames || data.cast || [],
				description: data.description || 'Опис наразі відсутній.',
				schedule: schedule,
				trailerUrl: data.trailerUrl || '',
				status: data.status,
			};
		} catch (error: any) {
			const errorMessage = parseBackendError(error.response?.data);
			console.error('Failed to fetch movie details:', errorMessage);
			return null;
		}
	},

	createMovie: async (movieData: CreateMovie): Promise<void> => {
		try {
			await axiosClient.post('/movie', movieData);
		} catch (error: any) {
			throw parseBackendError(error.response?.data);
		}
	},
};