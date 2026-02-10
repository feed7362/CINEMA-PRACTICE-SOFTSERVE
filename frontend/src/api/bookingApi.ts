import type {
	BookingDetails, BookingResponse,
	BookingSummary,
	LockBookingPayload,
	LockBookingResponse,
	PagedResponse,
} from '@/types/booking.ts';
import axiosClient from './axiosClient';

export const bookingApi = {
	lock: async (payload: LockBookingPayload): Promise<LockBookingResponse> => {
		const { data } = await axiosClient.post<LockBookingResponse>('/booking/lock', payload);
		return data;
	},

	applyPromo: async (bookingId: number, code: string): Promise<BookingResponse> => {
		const { data } = await axiosClient.post<BookingResponse>(`/booking/${bookingId}/apply-promo`, {
			code,
		});
		return data;
	},

	confirm: async (bookingId: number, paymentIntentId: string): Promise<BookingResponse> => {
		const { data } = await axiosClient.post<BookingResponse>('/booking/confirm', {
			bookingId: bookingId,
			paymentIntentId: paymentIntentId,
		});


		return data;
	},

	getDetails: async (id: number): Promise<BookingDetails> => {
		const { data } = await axiosClient.get<BookingDetails>(`/booking/${id}/details`);
		return data;
	},

	getHistory: async (page = 1, pageSize = 10): Promise<PagedResponse<BookingSummary>> => {
		const { data } = await axiosClient.get<PagedResponse<BookingSummary>>('/booking', {
			params: { page, pageSize },
		});
		return data;
	},

	refund: async (id: number): Promise<any> => {
		const { data } = await axiosClient.post(`/booking/refund/${id}`);
		return data;
	},
};