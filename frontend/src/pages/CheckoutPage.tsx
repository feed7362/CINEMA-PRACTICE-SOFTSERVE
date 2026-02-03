import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/payment/CheckoutForm.tsx';
import type { LockBookingResponse } from '@/types/booking';

const stripePromise = loadStripe('pk_test.....скину_в_дс.пізніше добавити в .env');

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const lockData = location.state as LockBookingResponse | null;

    if (!lockData || !lockData.clientSecret) {
        return <Navigate to="/" replace />;
    }

    const options = {
        clientSecret: lockData.clientSecret,
        appearance: {
            theme: 'night' as const,
            variables: { colorPrimary: '#2563eb' }
        },
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl mt-10 border border-white/5">
            <h2 className="text-2xl font-black text-white mb-6 text-center uppercase tracking-tighter italic">
                Оплата замовлення
            </h2>

            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                    bookingId={lockData.id}
                    expirationTime={lockData.expirationTime}
                />
            </Elements>

            <p className="text-gray-500 text-[10px] mt-6 text-center uppercase tracking-widest">
                Місця заброньовано на 15 хвилин для завершення транзакції.
            </p>
        </div>
    );
};

export default CheckoutPage;