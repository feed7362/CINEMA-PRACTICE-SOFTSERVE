import type { BookingStatus, SeatType } from './booking';

export interface ITicket {
    id: number;
    movieTitle: string;
    hallName: string;
    rowNumber: number;
    seatNumber: number;
    price: number;
    purchaseDate: string;
    sessionDate: string;
    status: BookingStatus;
    seatType: SeatType;
}

export interface PagedResponse<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface TicketQueryParams {
    page?: number;
    pageSize?: number;
}