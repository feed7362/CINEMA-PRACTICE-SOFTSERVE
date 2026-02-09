import axiosClient from './axiosClient';
import type { BookingDetails } from '@/types/booking';

export const getMe = () =>
	axiosClient.get('/auth/me').then((r) => r.data);
export const getMyBookings = (page = 1, pageSize = 50) =>
	axiosClient.get('/booking', {
		params: { page, pageSize },
	}).then((r) => r.data);

export const getBookingDetails = (bookingId: number) =>
	axiosClient.get<BookingDetails>(`/booking/${bookingId}/details`).then((r) => r.data);

export interface RefundResponse {
	bookingId: number;
	status: string;
	refundId: string;
	amountRefunded: number;
	refundTime: string;
}

export const refundBooking = (bookingId: number) =>
	axiosClient.post<RefundResponse>(`/booking/refund/${bookingId}`).then((r) => r.data);