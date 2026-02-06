import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import type { LockBookingResponse } from '@/types/booking';
import { usePriceCalculator } from '@/hooks/usePriceCalculator';
import type { StripeElementsOptions } from '@stripe/stripe-js';

export const useCheckout = () => {
    const location = useLocation();
    const lockData = location.state as LockBookingResponse | null;
    const priceData = usePriceCalculator(lockData?.totalAmount || 0, 1);

    const stripeOptions = useMemo((): StripeElementsOptions | undefined => {
        if (!lockData?.clientSecret) return undefined;

        return {
            clientSecret: lockData.clientSecret,
            appearance: {
                theme: 'night',
                variables: {
                    colorPrimary: '#0753E0',
                    colorBackground: '#0f172a',
                    colorText: '#ffffff',
                    colorDanger: '#ef4444',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    borderRadius: '12px',
                },
                rules: {
                    '.Input': {
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '.Input:focus': {
                        border: '1px solid #0753E0',
                        boxShadow: '0 0 0 2px rgba(7, 83, 224, 0.2)',
                    }
                }
            },
        };
    }, [lockData?.clientSecret]);

    const isValidSession = !!lockData && !!lockData.clientSecret;

    return {
        lockData,
        priceData,
        stripeOptions,
        isValidSession
    };
};