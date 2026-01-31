import axiosClient from './axiosClient';
import type { IMovie, MoviePreviewProps, IMovieDetails } from '@/types/movie';

export const movieApi = {
  getNowPlaying: async (): Promise<IMovie[]> => {
    try {
      const { data } = await axiosClient.get('/movie');
      
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        poster: item.poster || item.posterUrl || '',
        ageRating: item.ageRating?.toString() + "+" || "0+", 
        sessions: item.sessions || ["Немає сеансів"]
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

      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        poster: item.poster || item.posterUrl || '',
        ageRating: item.ageRating?.toString() + "+" || "0+",
        releaseDate: item.releaseDate
          ? new Date(item.releaseDate).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })
          : "Скоро у кіно",
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
        title: data.title,
        poster: data.poster || data.posterUrl || '',
        ageRating: data.ageRating?.toString() + "+" || "12+",
        originalTitle: data.originalTitle || "Unknown Original Title",
        director: data.director || "Кріс Коламбус",
        year: data.year || 2026,
        country: data.country || "США",
        genre: data.genre || "Пригоди, Фентезі",
        rating: data.rating || 8.2,
        language: data.language || "українська мова",
        subtitles: data.subtitles || "—",
        cast: data.cast || "Актори...",
        description: data.description || "Опис фільму відсутній...",
        schedule: data.schedule || [ // Тимчасовий розклад, якщо бек не шле
          { date: "Пт, 16 січня", times: ["10:00", "14:00", "21:00"] },
          { date: "Сб, 17 січня", times: ["11:00", "15:00", "22:00"] }
        ]
      };
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
      return null;
    }
  }
};