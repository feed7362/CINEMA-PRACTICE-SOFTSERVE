export interface Seat {
    id: number;
    rowNumber: number;
    seatNumber: number;
    isReserved: boolean;
    seatType: string;
}

export interface BookingResponseDto {
    id: number;
    applicationUserId: number;
    sessionId: number;
    bookingTime: string;
    expirationTime: string;
    status: string;
    clientSecret: string;
    paymentIntentId: string;
}

export interface LockBookingPayload {
    sessionId: number;
    seatIds: number[];
}

export interface SeatDto {
    id: number;
    rowNumber: number;
    seatNumber: number;
    isReserved: boolean;
    seatType: string;
}

export interface LockBookingResponse {
    id: number;
    clientSecret: string;
    expirationTime: string;
    status: string;
}