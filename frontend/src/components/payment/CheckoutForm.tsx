import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { parseBackendError } from '@/utils/errorUtils.ts';
import { bookingApi } from '@/api/bookingApi.ts';

interface CheckoutFormProps {
	bookingId: number;
	expirationTime: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ bookingId, expirationTime }) => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [isProcessing, setIsProcessing] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>('');

	useEffect(() => {
		const timer = setInterval(() => {
			const exp = new Date(expirationTime).getTime();
			const now = new Date().getTime();
			const diff = exp - now;

			if (diff <= 0) {
				clearInterval(timer);
				setTimeLeft('EXPIRED');
			} else {
				const mins = Math.floor(diff / 60000);
				const secs = Math.floor((diff % 60000) / 1000);
				setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [expirationTime]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);

		if (!stripe || !elements || timeLeft === 'EXPIRED') return;

		setIsProcessing(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		});

		if (error) {
			const errorMap: Record<string, string> = {
				'card_error': 'Помилка картки. Перевірте дані.',
				'validation_error': 'Будь ласка, заповніть усі поля коректно.',
			};
			setMessage(errorMap[error.type] || error.message || 'Сталася помилка при оплаті.');
			setIsProcessing(false);
		} else if (paymentIntent?.status === 'succeeded') {
			try {
				await bookingApi.confirm(bookingId, paymentIntent.id);

				navigate('/tickets/success', {
					state: {
						id: bookingId,
						expirationTime,
					},
				});

			} catch (err: any) {
				const backendMessage = parseBackendError(err.response?.data);
				setMessage(`Оплата пройшла, але виникла помилка: ${backendMessage}. Зверніться до підтримки.`);
			} finally {
				setIsProcessing(false);
			}
		}
	}; 

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div
				className={`text-center py-2 rounded bg-white/5 border 
            border-white/10 font-mono text-sm ${timeLeft === 'EXPIRED' ? 'text-red-500' : 'text-amber-500'}`}>
				{timeLeft === 'EXPIRED'
					? 'Час бронювання вичерпано!'
					: `Залишилося часу: ${timeLeft}`
				}
			</div>

			<div className="bg-gray-900 p-4 rounded-md">
				{/* This is where the card inputs will appear */}
				<PaymentElement/>
			</div>

			<button
				className={`w-full py-4 rounded-full font-black uppercase tracking-widest transition-all ${
					isProcessing || !stripe || timeLeft === 'EXPIRED'
						? 'bg-gray-800 text-gray-600 cursor-not-allowed'
						: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
				}`}
				disabled={isProcessing || !stripe || timeLeft === 'EXPIRED'}
			>
				{isProcessing ? 'Обробка...' : 'Оплатити зараз'}
			</button>

			{message && (
				<div
					className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-xs text-center">
					{message}
				</div>
			)}
		</form>
	);
};

export default CheckoutForm;