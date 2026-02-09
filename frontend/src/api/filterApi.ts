import axiosClient from './axiosClient';
import { hallApi } from './hallApi';

export interface IFilterItem {
	id: number;
	name: string;
}

export const filterApi = {
	getHalls: async (): Promise<IFilterItem[]> => {
		return hallApi.getAllHalls(); 
	},

	getGenres: async (): Promise<IFilterItem[]> => {
		try {
			const { data } = await axiosClient.get('/genre');

			if (data.items && Array.isArray(data.items)) {
				return data.items;
			}

			if (Array.isArray(data)) {
				return data;
			}

			return [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},

	getStudios: async (): Promise<IFilterItem[]> => {
		try {
			const { data } = await axiosClient.get('/studio', {
				params: { PageSize: 100 },
			});

			if (data.items && Array.isArray(data.items)) {
				return data.items;
			}

			if (Array.isArray(data)) {
				return data;
			}

			return [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},

	getCountries: async (): Promise<string[]> => {
		try {
			const { data } = await axiosClient.get('/movie/countries');
			return data;
		} catch (error) {
			console.error('Failed to fetch countries:', error);
			return [];
		}
	},

	getDirectors: async (): Promise<string[]> => {
		try {
			const { data } = await axiosClient.get('/movie/directors');
			return data;
		} catch (error) {
			console.error('Failed to fetch directors:', error);
			return [];
		}
	},

	getAgeRatings: async (): Promise<number[]> => {
		return Promise.resolve([0, 6, 12, 16, 18]); 
	},
};