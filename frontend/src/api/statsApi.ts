import axiosClient from './axiosClient';
import type {
    RevenueResponse,
    OccupancyResponse,
    SpecialTicketsResponse,
    PopularMoviesParams,
    HeatmapSeat
} from '@/types/admin';

export const statsApi = {
    getRevenue: async (from: string, to: string) => {
        const response = await axiosClient.get<RevenueResponse>(
            '/admin/stats/revenue',
            {params: {from, to}}
        );
        return response.data;
    },

    getSessionOccupancy: async (sessionId: number) => {
        const response = await axiosClient.get<OccupancyResponse>(
            `/admin/stats/occupancy/${sessionId}`
        );
        return response.data;
    },

    getSpecialTicketsCount: async (from: string, to: string, movieId?: number) => {
        const response = await axiosClient.get<SpecialTicketsResponse>(
            '/admin/stats/special-tickets',
            {params: {from, to, movieId}}
        );
        return response.data;
    },

    getPopularMovies: async (params: PopularMoviesParams) => {
        const response = await axiosClient.get<any[]>(
            '/admin/stats/movies/popular',
            {
                params: {
                    DateFrom: params.DateFrom,
                    DateTo: params.DateTo,
                    Amount: params.Amount,
                }
            }
        );
        return response.data;
    },

    getHallHeatmap: async (hallId: number) => {
        const response = await axiosClient.get<HeatmapSeat[]>(
            `/admin/stats/heatmap/${hallId}`
        );
        return response.data;
    }
};