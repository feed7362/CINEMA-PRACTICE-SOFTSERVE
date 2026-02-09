import { useState } from 'react';
import { refundBooking } from '@/api/profileApi';

export const useRefundLogic = (onSuccessRemove: (id: number) => void) => {
	const [refundId, setRefundId] = useState<number | null>(null);

	const openRefundModal = (id: number) => setRefundId(id);
	const closeRefundModal = () => setRefundId(null);

	const confirmRefund = async () => {
		if (!refundId) return;

		try {
			await refundBooking(refundId);
			onSuccessRemove(refundId);
			closeRefundModal();
		} catch (error) {
			console.error(error);
			alert('Не вдалося повернути кошти');
		}
	};

	return {
		refundId,
		openRefundModal,
		closeRefundModal,
		confirmRefund,
	};
};