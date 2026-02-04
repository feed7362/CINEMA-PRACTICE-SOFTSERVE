import axiosClient from './axiosClient';

export interface IFilterItem {
    id: number;
    name: string;
}

export const filterApi = {
    getGenres: async (): Promise<IFilterItem[]> => {
        try {
            const {data} = await axiosClient.get('/genre');

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
            const {data} = await axiosClient.get('/studio', {
                params: {PageSize: 100}
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
    }
};