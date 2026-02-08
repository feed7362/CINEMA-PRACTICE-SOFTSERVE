export type BookingStatus = 'CONFIRMED' | 'CANCELED' | 'PENDING';
export type SeatType = 'Standard' | 'Vip' | string;

export interface Seat {
    id: number;
    rowNumber: number;
    seatNumber: number;
    isReserved: boolean;
    seatType: SeatType;
}

export interface TicketDetail {
    id: number;
    rowNumber: number;
    seatNumber: number;
    seatType: SeatType;
    finalPrice: number;
    discountType?: string;
}

export interface LockBookingPayload {
    sessionId: number;
    seatIds: number[];
    promocode?: string;
}

export interface LockBookingResponse {
    id: number;
    hall?: string;
    seats?: Seat[];
    totalAmount: number;
    clientSecret: string;
    expirationTime: string;
    status: BookingStatus;
    paymentIntentId: string;
    appliedPromoCode?: string;
}

export interface BookingResponse {
    id: number;
    applicationUserId: number;
    sessionId: number;
    bookingTime: string;
    expirationTime: string;
    status: BookingStatus;
    clientSecret: string;
    paymentIntentId: string;
    totalAmount: number;
}

export interface BookingSummary {
    id: number;
    movieTitle: string;
    startTime: string;
    bookingTime: string;
    ticketCount: number;
    totalAmount: number;
    status: BookingStatus;
}

export interface SessionShort {
    id: number;
    movieTitle: string;
    hallName: string;
    startTime: string;
}

export interface BookingDetails {
    id: number;
    bookingTime: string;
    expirationTime: string;
    status: string;
    totalPrice: number;
    session: SessionShort;
    tickets: TicketDetail[];
}

export interface PagedResponse<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
}