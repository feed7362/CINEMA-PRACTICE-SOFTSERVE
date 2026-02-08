import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import api from "@/api/axiosClient.ts";
import type {LockBookingPayload, Seat} from "@/types/booking.ts";
import {parseBackendError} from "@/utils/errorUtils.ts";
import {bookingApi} from "@/api/bookingApi.ts";

const SeatSelection: React.FC = () => {
    const {sessionId} = useParams<{ sessionId: string }>();
    const navigate = useNavigate();

    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await api.get<Seat[]>(`/session/${sessionId}/seats`);
                setSeats(response.data);
            } catch (err: any) {
                const message = parseBackendError(err.response?.data);
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [sessionId]);

    const handleLock = async () => {
        setError(null);

        const payload: LockBookingPayload = {
            sessionId: Number(sessionId),
            seatIds: selectedIds
        };

        try {
            const data = await bookingApi.lock(payload);

            navigate('/checkout', {state: data});
        } catch (err: any) {
            const message = parseBackendError(err.response?.data);
            setError(message);

            if (err.response?.status === 401) {
                navigate('/auth');
            }
        }
    };

    if (loading) return <div>Loading Hall...</div>;

    return (
        <div className="hall-layout">
            {error && (
                <div style={{
                    color: '#ff4d4d',
                    backgroundColor: '#331a1a',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '15px',
                    border: '1px solid #662222'
                }}>
                    <strong>Помилка: </strong> {error}
                </div>
            )}

            <div className="seat-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px'}}>
                {seats.map(seat => (
                    <button
                        key={seat.id}
                        disabled={seat.isReserved}
                        onClick={() => {
                            setError(null);
                            setSelectedIds(prev =>
                                prev.includes(seat.id) ? prev.filter(id => id !== seat.id) : [...prev, seat.id]
                            );
                        }}
                        style={{
                            backgroundColor: seat.isReserved ? 'grey' : selectedIds.includes(seat.id) ? 'green' : 'white',
                            cursor: seat.isReserved ? 'not-allowed' : 'pointer',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        {seat.seatNumber}
                    </button>
                ))}
            </div>

            <button
                onClick={handleLock}
                disabled={selectedIds.length === 0}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer'
                }}
            >
                Pay for {selectedIds.length} Seats
            </button>
        </div>
    );
};

export default SeatSelection;