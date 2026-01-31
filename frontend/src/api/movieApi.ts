import axiosClient from './axiosClient';
import type { IMovie, MoviePreviewProps } from '@/types/movie';

export const movieApi = {
  getNowPlaying: async (): Promise<IMovie[]> => {
    try {
      const { data } = await axiosClient.get('/movie');
      
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        poster: item.poster || item.posterUrl || '',
        ageRating: item.ageRating?.toString() + "+" || "0+", 
        sessions: item.sessions || ["10:00", "12:00"]
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
  }
};