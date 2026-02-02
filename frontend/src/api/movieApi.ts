import axiosClient from './axiosClient';
import type { IMovie, MoviePreviewProps, IMovieDetails } from '@/types/movie';

export const movieApi = {
  getNowPlaying: async (): Promise<IMovie[]> => {
    try {
      const { data } = await axiosClient.get('/movie');
      const movies = data.items || [];

      return movies.map((item: any) => ({
        id: item.id,
        title: item.TitleUkr || item.titleUkr || item.title || "Без назви",
        poster: item.poster || item.posterUrl || '',
        ageRating: item.ageRating ? `${item.ageRating}+` : "0+",
        sessions: item.sessions || [],
        hall: item.hall || item.hallName || "Не вказано"
      }));
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      return [];
    }
  },

  getComingSoon: async (): Promise<MoviePreviewProps[]> => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data } = await axiosClient.get('/movie', {
        params: {
          dateFrom: tomorrow.toISOString()
        }
      });

      const movies = data.items || [];

      return movies.map((item: any) => ({
        id: item.id,
        title: item.TitleUkr || item.titleUkr || item.title || "Без назви",
        poster: item.poster || item.posterUrl || '',
        ageRating: item.ageRating ? `${item.ageRating}+` : "0+",
        releaseDate: item.releaseDate
          ? new Date(item.releaseDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })
          : "Скоро",
        isBlurred: false
      }));
    } catch (error) {
      console.error('Failed to fetch coming soon movies:', error);
      return [];
    }
  },

  getMovieById: async (id: string): Promise<IMovieDetails | null> => {
    try {
      const { data } = await axiosClient.get(`/movie/${id}`);

      return {
        id: data.id,
        title: data.TitleUkr || data.titleUkr || data.title || "Без назви",
        poster: data.poster || data.posterUrl || '',
        ageRating: data.ageRating ? `${data.ageRating}+` : "0+",
        originalTitle: data.originalTitle || "",
        director: data.director || "Не вказано",
        year: data.year || new Date().getFullYear(),
        country: data.country || "Невідомо",
        genre: data.genre || "Не вказано",
        rating: data.rating || "Відсутній",
        language: data.language || "Українська",
        subtitles: data.subtitles || "-",
        cast: data.cast || [], 
        description: data.description || "Опис наразі відсутній.",
        schedule: data.schedule || [] 
      };
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      return null;
    }
  }
};