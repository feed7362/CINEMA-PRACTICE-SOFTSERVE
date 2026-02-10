import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { LockBookingResponse, BookingResponse } from '@/types/booking';
import { bookingApi } from '@/api/bookingApi.ts';
import type { StripeElementsOptions } from '@stripe/stripe-js';

export const useCheckout = () => {
	const location = useLocation();

	const initialState = location.state as LockBookingResponse | null;

	const [lockData, setLockData] = useState<LockBookingResponse | null>(initialState);

	const [basePrice] = useState<number>(initialState?.totalAmount || 0);

	const [promoError, setPromoError] = useState<string | null>(null);
	const [isApplying, setIsApplying] = useState(false);
	const [appliedCode, setAppliedCode] = useState<string | null>(null);

	useEffect(() => {
		if (initialState?.appliedPromoCode) {
			setAppliedCode(initialState.appliedPromoCode);
		}
	}, [initialState]);

	const applyPromoCode = async (code: string) => {
		if (!lockData || !code) return;

		setIsApplying(true);
		setPromoError(null);

		try {
			const updated: BookingResponse = await bookingApi.applyPromo(lockData.id, code);

			setLockData(prev => prev ? {
				...prev,
				totalAmount: updated.totalAmount,
			} : null);

			setAppliedCode(code);
		} catch (err: any) {
			const message = err.response?.data?.detail || 'Не вдалося застосувати промокод';
			setPromoError(message);
		} finally {
			setIsApplying(false);
		}
	};

	const removePromoCode = () => {
		setPromoError(null);
		setAppliedCode(null);
		setLockData(prev => prev ? { ...prev, totalAmount: basePrice } : null);
	};

	const stripeOptions = useMemo((): StripeElementsOptions | undefined => {
		if (!lockData?.clientSecret) return undefined;
		return {
			clientSecret: lockData.clientSecret,
			appearance: { theme: 'night', variables: { colorPrimary: '#0753E0' } },
		};
	}, [lockData?.clientSecret]);

	const isValidSession = useMemo(() => {
		return !!lockData && !!lockData.clientSecret;
	}, [lockData]);

	useEffect(() => {
		console.log('Checkout Session Check:', {
			hasData: !!lockData,
			secret: lockData?.clientSecret,
			price: lockData?.totalAmount,
		});
	}, [lockData]);

	const priceData = {
		subtotal: basePrice,
		total: lockData?.totalAmount || basePrice,
		discountAmount: basePrice - (lockData?.totalAmount || basePrice),
		appliedPromo: appliedCode ? { code: appliedCode } : null,
		error: promoError,
		isApplying,
		applyPromoCode,
		removePromoCode,
	};

	return { lockData, priceData, stripeOptions, isValidSession };
};