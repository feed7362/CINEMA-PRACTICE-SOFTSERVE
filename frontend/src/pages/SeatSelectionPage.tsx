//
//
// ПРИКЛАД ВИКОРИСТАННЯ ПРИ ВИБОРІ МІСЦЬ
//
//


import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import type {SeatDto, LockBookingResponse} from '../types/booking';
import api from "@/api/axiosClient.ts";
import {parseBackendError} from "@/utils/parseBackendError.ts";


const SeatSelectionPage: React.FC = () => {
    const {sessionId} = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [seats, setSeats] = useState<SeatDto[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await api.get<SeatDto[]>(`/session/${sessionId}/seats`);
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

    const handleSeatClick = (seatId: number, isReserved: boolean) => {
        if (isReserved) return;
        setSelectedIds(prev =>
            prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
        );
    };

    const handleProceedToPayment = async () => {
        try {
            const response = await api.post<LockBookingResponse>('/booking/lock', {
                sessionId: Number(sessionId),
                seatIds: selectedIds
            });

            navigate('/checkout', {state: response.data});

        } catch (err: any) {
            const backendMessage = parseBackendError(err.response?.data);
            setError(backendMessage);

            if (err.response?.status === 401) {
                navigate('/auth');
            }
        }
    };

    const seatsByRow = seats.reduce((acc, seat) => {
        const row = seat.rowNumber;
        if (!acc[row]) acc[row] = [];
        acc[row].push(seat);
        return acc;
    }, {} as Record<number, SeatDto[]>);

    const getSeatStyles = (seat: SeatDto) => {
        const isSelected = selectedIds.includes(seat.id);
        if (seat.isReserved) return "bg-gray-800 text-gray-600 cursor-not-allowed border-transparent";
        if (isSelected) return "bg-green-500 text-white border-green-300 scale-110 shadow-[0_0_10px_rgba(34,197,94,0.6)]";

        switch (seat.seatType.toLowerCase()) {
            case 'vip':
                return "bg-amber-600 text-amber-100 border-amber-400 hover:bg-amber-500 hover:scale-105";
            default:
                return "bg-slate-600 text-slate-200 border-slate-500 hover:bg-slate-500 hover:scale-105";
        }
    };

    if (isLoading) return <div className="text-white text-center mt-20 animate-pulse">Завантаження зали...</div>;
    if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h2 className="text-4xl font-black tracking-tighter uppercase italic">Оберіть Місця</h2>
                    <p className="text-gray-400 mt-2 italic">Сеанс №{sessionId}</p>
                </header>

                {/* Screen Visualization */}
                <div className="relative mb-20">
                    <div
                        className="w-full h-2 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.5)]"></div>
                    <p className="text-center text-xs text-blue-400 mt-4 tracking-[1em] uppercase">Екран</p>
                </div>

                {/* Seat Grid */}
                <div className="flex flex-col gap-4 items-center mb-32">
                    {Object.entries(seatsByRow).map(([row, rowSeats]) => (
                        <div key={row} className="flex items-center gap-3">
                            <span
                                className="w-12 text-right text-[10px] font-bold text-gray-500 mr-2 uppercase tracking-tighter">Ряд {row}</span>
                            <div className="flex gap-2">
                                {rowSeats.map(seat => (
                                    <button
                                        key={seat.id}
                                        disabled={seat.isReserved}
                                        title={`${seat.seatType === 'Vip' ? 'VIP Місце' : 'Звичайне місце'}`}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 text-[10px] sm:text-xs font-bold flex items-center justify-center rounded-t-lg border-b-4 transition-all duration-200 ${getSeatStyles(seat)}`}
                                        onClick={() => handleSeatClick(seat.id, seat.isReserved)}
                                    >
                                        {seat.seatNumber}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend & Footer */}
                <div
                    className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-md border-t border-white/10 p-6 z-50">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                        {/* Legend */}
                        <div
                            className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-slate-600 rounded-t-sm"></div>
                                Звичайні
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-amber-600 rounded-t-sm"></div>
                                VIP
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-t-sm"></div>
                                Обрано
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-800 rounded-t-sm"></div>
                                Зайнято
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-gray-500 text-[10px] uppercase tracking-tighter">Квитки</p>
                                <p className="text-2xl font-black">{selectedIds.length}</p>
                            </div>
                            <button
                                className={`px-10 py-4 rounded-full font-black uppercase tracking-tighter transition-all ${selectedIds.length > 0 ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/40' : 'bg-gray-800 cursor-not-allowed text-gray-600'}`}
                                disabled={selectedIds.length === 0}
                                onClick={handleProceedToPayment}
                            >
                                Забронювати та оплатити
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelectionPage;