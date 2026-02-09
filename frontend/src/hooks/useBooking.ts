import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "@/api/axiosClient";
import { parseBackendError } from "@/utils/errorUtils";
import type { Seat } from '@/types/booking';
import {bookingApi} from "@/api/bookingApi.ts";

export const useBooking = (sessionId: string | undefined) => {
    const navigate = useNavigate();

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) return;

        const fetchSeats = async () => {
            try {
                const response = await api.get<Seat[]>(`/session/${sessionId}/seats`);
                setSeats(response.data);
            } catch (err: any) {
                const backendMessage = parseBackendError(err.response?.data);
                setError(backendMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSeats();
    }, [sessionId]);

    const toggleSeat = (seatId: number, isReserved: boolean) => {
        if (isReserved) return;
        setSelectedIds(prev =>
            prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
        );
    };

    const bookSeats = async () => {
        if (!sessionId) return;
        
        try {
            const data = await bookingApi.lock({
                sessionId: Number(sessionId),
                seatIds: selectedIds
            });
            navigate('/checkout', { state: data });
        } catch (err: any) {
            const backendMessage = parseBackendError(err.response?.data);
            setError(backendMessage);
            if (err.response?.status === 401) {
                navigate('/auth');
            }
        }
    };

    const seatsByRow = useMemo(() => {
        return seats.reduce((acc, seat) => {
            const row = seat.rowNumber;
            if (!acc[row]) acc[row] = [];
            acc[row].push(seat);
            return acc;
        }, {} as Record<number, Seat[]>);
    }, [seats]);

    return {
        seats,
        selectedIds,
        isLoading,
        error,
        seatsByRow,
        toggleSeat,
        bookSeats
    };
};