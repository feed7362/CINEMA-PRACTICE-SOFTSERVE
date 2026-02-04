import axiosClient from './axiosClient';
import type {BookingDetailsDto} from "@/components/profile/BookingItem.tsx";

export const getMe = () =>
    axiosClient.get('/auth/me').then(r => r.data);

export const getMyTickets = (page = 1, pageSize = 50) =>
    axiosClient.get('/ticket', {
        params: {page, pageSize}
    }).then(r => r.data);

export const getMyBookings = (page = 1, pageSize = 50) =>
    axiosClient.get('/booking', {
        params: {page, pageSize}
    }).then(r => r.data);

export const getBookingDetails = (bookingId: number) =>
    axiosClient.get<BookingDetailsDto>(`/booking/${bookingId}/details`).then(r => r.data);

export const refundBooking = (bookingId: number) =>
    axiosClient.post(`/booking/refund/${bookingId}`);