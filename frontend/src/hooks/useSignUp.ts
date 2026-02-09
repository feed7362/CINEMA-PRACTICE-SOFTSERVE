import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { register, externalLogin } from '@/api/authApi';
import { parseBackendError } from '@/utils/errorUtils';

const CAPTCHA_CONTAINER_ID = 'recaptcha-container';

export const useSignUp = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const { token, resetCaptcha } = useRecaptcha({
		siteKey: import.meta.env.VITE_CAPTCHA_SITE_KEY as string,
		elementId: CAPTCHA_CONTAINER_ID,
	});

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const form = e.target as HTMLFormElement;
		const nameInput = form.elements.namedItem('name') as HTMLInputElement;
		const emailInput = form.elements.namedItem('email') as HTMLInputElement;
		const passwordInput = form.elements.namedItem('password') as HTMLInputElement;
		const confirmInput = form.elements.namedItem('confirmPassword') as HTMLInputElement;

		const name = nameInput.value.trim();
		const email = emailInput.value.trim();
		const password = passwordInput.value;
		const confirmPassword = confirmInput.value;

		// Basic Validation
		if (!name || !email || !password || !confirmPassword) {
			setError('Заповніть всі поля');
			return;
		}
		if (password !== confirmPassword) {
			setError('Паролі не співпадають');
			return;
		}
		if (!token) {
			setError('Пройдіть капчу');
			return;
		}

		// API Call
		try {
			setLoading(true);
			// Примітка: переконайтеся, що ваш метод register приймає name, якщо бекенд цього вимагає
			await register(email, password, confirmPassword); 
			alert('Реєстрація успішна');
			navigate('/auth');
		} catch (err: any) {
			resetCaptcha();
			const data = err?.response?.data;
			if (data?.errors) {
				const messages = Object.values(data.errors).flat().join(' • ');
				setError(messages);
			} else {
				setError(data?.message || data?.title || 'Помилка реєстрації');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse: any) => {
		try {
			setLoading(true);
			await externalLogin(credentialResponse.credential);
			navigate('/');
		} catch (error: any) {
			console.error('Login with Google failed', error);
			setError(parseBackendError(error));
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleError = () => {
		setError('Не вдалося увійти через Google');
	};

	return {
		error,
		loading,
		handleRegister,
		handleGoogleSuccess,
		handleGoogleError,
		captchaContainerId: CAPTCHA_CONTAINER_ID,
	};
};