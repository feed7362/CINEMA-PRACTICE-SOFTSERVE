import axiosClient from './axiosClient';

import type {
    RevenueResponse,
    OccupancyResponse,
    PopularMoviesParams,
    IStatsMovie,
    HeatmapSeat,
    IDiscountStats
} from '@/types/admin';

export const statsApi = {
    getRevenue: async (from: string, to: string) => {
        const response = await axiosClient.get<RevenueResponse>(
            '/admin/stats/revenue',
            { params: { from, to } },
        );
        return response.data;
    },

    getSessionOccupancy: async (sessionId: number) => {
        const response = await axiosClient.get<OccupancyResponse>(
            `/admin/stats/occupancy/${sessionId}`,
        );
        return response.data;
    },

 getSpecialTicketsCount: async (from: string, to: string, movieId?: number) => {
        const response = await axiosClient.get<any[]>(
            '/admin/stats/special-tickets',
            { params: { from, to, movieId } },
        );
        if (Array.isArray(response.data)) {
            return response.data.length;
        }
        if (response.data && Array.isArray((response.data as any).items)) {
            return (response.data as any).items.length;
        }
        return 0;
    },

    getPopularMovies: async (params: PopularMoviesParams) => {
        const response = await axiosClient.get<IStatsMovie[]>('/admin/stats/movies/popular', {
            params, 
        });
        return response.data;
    },

    getHallHeatmap: async (hallId: number) => {
        const response = await axiosClient.get<HeatmapSeat[]>(`/admin/stats/heatmap/${hallId}`);
        return response.data;
    },

    getDiscountStats: async (from: string, to: string) => {
        try {
            const response = await axiosClient.get<IDiscountStats[]>('/discount', {
                params: { from, to } 
            });
            return response.data;
        } catch (error) {
            return [];
        }
    },

    getTicketsReport: async (page: number = 1, pageSize: number = 50) => {
        const response = await axiosClient.get<any>('/ticket', { 
            params: { 
                page, 
                pageSize 
            } 
        });
        return response.data;
    },
}