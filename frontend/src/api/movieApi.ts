import axiosClient from './axiosClient';
import type { IMovie } from '@/types/movie';

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
};