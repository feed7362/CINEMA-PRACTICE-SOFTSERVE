import React, {useState} from 'react';
import BaseButton from '@/components/ui/BaseButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {getBookingDetails} from '@/api/profileApi';

export interface BookingSummaryDto {
    id: number;
    movieTitle: string;
    startTime: string;
    bookingTime: string;
    ticketCount: number;
    totalAmount: number;
    status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
}

export interface TicketDetailDto {
    id: number;
    rowNumber: number;
    seatNumber: number;
    seatType: string;
    finalPrice: number;
}

export interface BookingDetailsDto extends BookingSummaryDto {
    tickets: TicketDetailDto[];
}

interface BookingItemProps {
    booking: BookingSummaryDto;
    onRefund: (id: number) => void;
    isHistory?: boolean;
}

const BookingItem: React.FC<BookingItemProps> = ({booking, onRefund, isHistory = false}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [seats, setSeats] = useState<TicketDetailDto[]>([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const date = new Date(booking.startTime);

    const handleToggleDetails = async () => {
        if (isExpanded) {
            setIsExpanded(false);
            return;
        }

        try {
            setLoadingDetails(true);
            setIsExpanded(true);
            // Assuming getBookingDetails returns { tickets: TicketDetailDto[] }
            const data = await getBookingDetails(booking.id);
            setSeats(data.tickets);
        } catch (error) {
            console.error("Failed to load details", error);
        } finally {
            setLoadingDetails(false);
        }
    };

    return (
        <div
            className="bg-zinc-900/50 hover:bg-zinc-900/80 transition-all rounded-2xl p-6 border border-white/10 shadow-lg mb-4">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2 text-white">
                    <h4 className="text-xl font-bold text-blue-100">
                        {booking.movieTitle}
                    </h4>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-300 items-center">
                        <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10">
                            🗓 {date.toLocaleDateString('uk-UA')}
                        </span>
                        <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10 text-white font-bold">
                            🕒 {date.toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'})}
                        </span>
                        <span>
                           🎟 {booking.ticketCount} шт.
                        </span>
                        <span className="text-green-400 font-bold">
                           ₴{booking.totalAmount}
                        </span>
                    </div>

                    <div className="pt-1">
                        <span
                            className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                                booking.status === 'CONFIRMED'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                    : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
                            }`}>
                            {!isHistory && booking.status === 'CONFIRMED' ? 'Оплачений' : 'Не дійсний'}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto shrink-0">
                    <button
                        onClick={handleToggleDetails}
                        className="flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-blue-600/20"
                    >
                        {isExpanded ? 'Згорнути' : 'Місця'}
                    </button>

                    {!isHistory && booking.status === 'CONFIRMED' && (
                        <BaseButton
                            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all"
                            onClick={() => onRefund(booking.id)}
                        >
                            Повернути
                        </BaseButton>
                    )}
                </div>
            </div>

            {/* --- Expanded Details (Seats) --- */}
            {isExpanded && (
                <div className="mt-6 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h5 className="text-sm font-bold text-zinc-400 mb-3">Деталі квитків:</h5>

                    {loadingDetails ? (
                        <div className="flex justify-center py-4"><LoadingSpinner/></div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {seats.map(seat => (
                                <div key={seat.id}
                                     className="bg-black/40 p-3 rounded-xl text-center border border-white/5">
                                    <div
                                        className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Ряд {seat.rowNumber}</div>
                                    <div className="text-lg font-black text-white">Місце {seat.seatNumber}</div>
                                    <div className="text-[10px] text-zinc-600 mt-1">{seat.seatType}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingItem;