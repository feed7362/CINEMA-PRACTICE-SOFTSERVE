import { useEffect, useState, useRef, useCallback } from 'react';

declare global {
	interface Window {
		grecaptcha: any;
		onRecaptchaLoad: () => void;
	}
}

interface UseRecaptchaProps {
	siteKey: string;
	elementId: string;
}

export const useRecaptcha = ({ siteKey, elementId }: UseRecaptchaProps) => {
	const [token, setToken] = useState<string | null>(null);
    
	// 1. Lazy Init: Перевіряємо наявність скрипта одразу при створенні стейту.
	// Це головна перевірка, яка замінює той проблемний код.
	const [isSdkReady, setIsSdkReady] = useState<boolean>(() => {
		return typeof window !== 'undefined' && 
               !!window.grecaptcha && 
               typeof window.grecaptcha.render === 'function';
	});

	const widgetId = useRef<number | null>(null);
	const isRendered = useRef(false);

	useEffect(() => {
		if (isSdkReady) return;

		// --- ВИДАЛЕНО ПРОБЛЕМНИЙ БЛОК ---
		// Ми прибрали синхронну перевірку window.grecaptcha тут,
		// бо вона вже виконана в useState, а для "довантаження" є інтервал нижче.
		// ---------------------------------

		const scriptId = 'recaptcha-script';
        
		// Варіант 1: Скрипт вже є в DOM (вантажиться), чекаємо його таймером
		if (document.getElementById(scriptId)) {
			const interval = setInterval(() => {
				if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
					setIsSdkReady(true);
					clearInterval(interval);
				}
			}, 500);
			return () => clearInterval(interval);
		}

		// Варіант 2: Скрипта немає, додаємо його
		window.onRecaptchaLoad = () => {
			setIsSdkReady(true);
		};

		const script = document.createElement('script');
		script.id = scriptId;
		script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptchaLoad';
		script.async = true;
		script.defer = true;
		script.onerror = (err) => console.error('Recaptcha script failed to load', err);
		document.body.appendChild(script);

		return () => {
			window.onRecaptchaLoad = () => {};
		};
	}, [isSdkReady]);

	useEffect(() => {
		if (!isSdkReady || !window.grecaptcha || typeof window.grecaptcha.render !== 'function') return;

		const container = document.getElementById(elementId);

		if (container && !isRendered.current) {
			container.innerHTML = '';
			try {
				widgetId.current = window.grecaptcha.render(elementId, {
					sitekey: siteKey,
					callback: (t: string) => setToken(t),
					'expired-callback': () => setToken(null),
					'error-callback': () => {
						console.error('Recaptcha service error');
						setToken(null);
					},
				});
				isRendered.current = true;
			} catch (error) {
				console.error('Recaptcha render error:', error);
			}
		}
	}, [isSdkReady, siteKey, elementId]);

	const resetCaptcha = useCallback(() => {
		if (widgetId.current !== null && window.grecaptcha && typeof window.grecaptcha.reset === 'function') {
			window.grecaptcha.reset(widgetId.current);
			setToken(null);
		}
	}, []);

	return { token, resetCaptcha };
};