import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';
import { externalLogin, login as loginApi } from '@/api/authApi';
import { parseBackendError } from '@/utils/errorUtils.ts';
import { useAuth } from '@/context/AuthContext';

const Auth: React.FC = () => {
	const navigate = useNavigate();
	const { login: loginUser } = useAuth(); 
    
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		setError('');

		const cleanEmail = email.trim();

		if (!cleanEmail || !password) {
			setError('Заповніть всі поля');
			return;
		}

		try {
			const data = await loginApi(cleanEmail, password);

			loginUser(data.token);
			if (data.email) {
				localStorage.setItem('email', data.email);
			}

			navigate('/profile');

		} catch (err: any) {
			setError(parseBackendError(err.data));
		}
	};

	const handleGoogleSuccess = async (credentialResponse: any) => {
		try {
			const user = await externalLogin(credentialResponse.credential);
			if (user.token) {
				loginUser(user.token);
				navigate('/');
			} else {
				setError('Помилка: сервер не повернув токен');
			}
		} catch (err: any) {
			setError(parseBackendError(err));
		}
	};

	return (
		<div className="text-white p-10">
			<div className="min-h-[70vh] flex items-center justify-center">
				<div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">

					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold">Вхід</h1>
						<p className="text-zinc-400">Увійди в акаунт, щоб продовжити</p>
					</div>

					<div className="space-y-6">
						<Input
							id="auth-email"
							type="email"
							label="Електронна пошта"
							placeholder="example@mail.com"
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>

						<PasswordInput
							id="auth-password"
							label="Пароль"
							placeholder="••••••••"
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>

						{error && (
							<p className="text-red-400 text-sm text-center">
								{error}
							</p>
						)}

						<BaseButton
							onClick={handleSubmit}
							className="w-full py-4 rounded-xl text-lg font-bold"
						>
							Увійти
						</BaseButton>

						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={() => setError('Не вдалося увійти через гугл')}
							useOneTap
						/>
					</div>

					<div className="text-center text-zinc-400">
						Немаєте акаунта?{' '}
						<Link
							to="/signup"
							className="text-white font-semibold underline hover:text-white/80 transition-colors"
						>
							Зареєструватися
						</Link>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Auth;