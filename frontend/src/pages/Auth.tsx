import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';
import {externalLogin, login} from '@/api/authApi';
import {Link} from 'react-router-dom';
import {parseBackendError} from "@/utils/errorUtils.ts";
import {GoogleLogin} from "@react-oauth/google";

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');

        const email = (document.getElementById('auth-email') as HTMLInputElement)?.value.trim();
        const password = (document.getElementById('auth-password') as HTMLInputElement)?.value;

        if (!email || !password) {
            setError('Заповніть всі поля');
            return;
        }

        try {
            const data = await login(email, password);

            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);

            navigate('/profile');

        } catch (error: any) {
            setError(parseBackendError(error.data));
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const user = await externalLogin(credentialResponse.credential);

            console.log('Successfully logged in via Google:', user);

            navigate('/');
        } catch (error: any) {
            console.error('Login with Google failed. Please try again.');
            setError(parseBackendError(error));
        }
    };

    return (
        <div className="text-white p-10">
            <div className="min-h-[70vh] flex items-center justify-center">
                <div
                    id="auth-card"
                    className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8"
                >

                    <div className="text-center space-y-2">
                        <h1 id="auth-title" className="text-3xl font-bold">Вхід</h1>
                        <p className="text-zinc-400">Увійди в акаунт, щоб продовжити</p>
                    </div>

                    <div className="space-y-6">

                        <Input
                            id="auth-email"
                            type="email"
                            label="Електронна пошта"
                            placeholder="example@mail.com"
                        />

                        <PasswordInput
                            id="auth-password"
                            label="Пароль"
                            placeholder="••••••••"
                        />

                        {error && (
                            <p id="auth-error" className="text-red-400 text-sm text-center">
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
                            onError={() => setError("Не вдалося увійти через гугл")}
                            useOneTap
                        />


                    </div>

                    <div className="text-center text-zinc-400 space-y-2">
                        <div>
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
        </div>
    );
};

export default Auth;