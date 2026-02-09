export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'PENDING';
export type SeatType = 'Standard' | 'Vip' | string;

export interface Seat {
	id: number;
	rowNumber: number;
	seatNumber: number;
	isReserved: boolean;
	seatType: SeatType;
	price?: number;
}

export interface TicketDetail {
	id: number;
	rowNumber: number;
	seatNumber: number;
	seatType: SeatType;
	finalPrice: number;
}

export interface LockBookingPayload {
	sessionId: number;
	seatIds: number[];
}

export interface LockBookingResponse {
	id: number;
	hall: string;
	seats: Seat[]; 
	totalAmount: number;
	clientSecret: string;
	expirationTime: string;
	status: BookingStatus; 
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
}

export interface BookingSummary {
	id: number;
	movieTitle: string;
	startTime: string;
	bookingTime: string;
	ticketCount: number;
	totalAmount: number;
	status: BookingStatus;
	posterUrl?: string;
}

export interface BookingDetails extends BookingSummary {
	tickets: TicketDetail[];
	hallName?: string;
}