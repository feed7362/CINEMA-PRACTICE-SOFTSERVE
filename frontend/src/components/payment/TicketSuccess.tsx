import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import type { LockBookingResponse } from '@/types/booking';

const SuccessTicketPage: React.FC = () => {
    const location = useLocation();
    const bookingData = location.state as LockBookingResponse | null;

    if (!bookingData) {
        return <Navigate to="/" replace />;
    }
    
    // Remake further as in profile ticket card
    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl mt-10 border border-white/5 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Оплата успішна!</h1>

            <div className="bg-white/5 p-4 rounded-xl space-y-4">
                <p className="text-lg">
                    🎟 Ваш квиток заброньовано успішно.
                </p>

                <div className="space-y-1">
                    <p><span className="font-semibold">Booking ID:</span> {bookingData.id}</p>
                    <p><span className="font-semibold">Expiration Time:</span> {new Date(bookingData.expirationTime).toLocaleString()}</p>
                    {/* Add more details if available: seats, movie, hall, etc. */}
                </div>
            </div>

            <div className="mt-6 text-center space-y-3">
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    На головну
                </Link>

                <Link
                    to="/profile"
                    className="inline-block text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                    Переглянути всі замовлення
                </Link>
            </div>
        </div>
    );
};

export default SuccessTicketPage;
