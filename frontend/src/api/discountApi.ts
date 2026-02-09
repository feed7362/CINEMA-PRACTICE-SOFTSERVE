import axiosClient from './axiosClient';
import { parseBackendError } from '@/utils/errorUtils';

export interface IDiscount {
    id: number;
    code: string;
    percentage: number;
    expiryDate: string;
    type: number;
}

export interface IDiscountType {
    value: number;
    name: string;
}

export const discountApi = {
    getAllDiscounts: async (): Promise<IDiscount[]> => {
        try {
            const response = await axiosClient.get('/discount');
            return response.data || [];
        } catch (error: any) {
            console.error('Failed to fetch discounts:', error);
            return [];
        }
    },

    deleteDiscount: async (id: number): Promise<void> => {
        try {
            await axiosClient.delete(`/discount/${id}`);
        } catch (error: any) {
            throw parseBackendError(error.response?.data);
        }
    },
    getDiscountTypes: async (): Promise<IDiscountType[]> => {
        try {
            const response = await axiosClient.get('/discount/types');
            return response.data || [];
        } catch (error: any) {
            console.error('Failed to fetch discount types:', error);
            return [];
        }
    },
    createDiscount: async (data: {
        code: string | null;
        percentage: number;
        expiryDate: string | null;
        type: number
    }): Promise<void> => {
        try {
            await axiosClient.post('/discount', data);
        } catch (error: any) {
            throw parseBackendError(error.response?.data);
        }
    }
};