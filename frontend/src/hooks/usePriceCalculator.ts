import { useState, useCallback } from 'react';

interface PromoCode {
	code: string;
	discountType: 'PERCENT' | 'FIXED';
	value: number;
}

// Це імітація бази даних промокодів (в реальності це запит на сервер)
const VALID_PROMO_CODES: Record<string, PromoCode> = {
	'STUDENT': { code: 'STUDENT', discountType: 'PERCENT', value: 20 },
	'KINO_SUMMER': { code: 'KINO_SUMMER', discountType: 'FIXED', value: 50 },
};

export const usePriceCalculator = (basePrice: number, ticketCount: number) => {
	const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Початкова сума без знижок
	const subtotal = basePrice * ticketCount;

	// Логіка розрахунку знижки
	const discountAmount = appliedPromo
		? appliedPromo.discountType === 'PERCENT'
			? (subtotal * appliedPromo.value) / 100
			: appliedPromo.value
		: 0;

	// Фінальна сума (не може бути менше 0)
	const total = Math.max(0, subtotal - discountAmount);

	const applyPromoCode = useCallback((code: string) => {
		setError(null);
		const upperCode = code.toUpperCase();

		// Тут мав би бути запит: await api.verifyPromo(code)
		if (VALID_PROMO_CODES[upperCode]) {
			setAppliedPromo(VALID_PROMO_CODES[upperCode]);
			return true;
		} else {
			setError('Промокод не знайдено або термін дії вичерпано');
			setAppliedPromo(null);
			return false;
		}
	}, []);

	const removePromoCode = () => {
		setAppliedPromo(null);
		setError(null);
	};

	return {
		subtotal,
		discountAmount,
		total,
		appliedPromo,
		error,
		applyPromoCode,
		removePromoCode,
	};
};