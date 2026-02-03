import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';
import {useRecaptcha} from '@/hooks/useRecaptcha';
import {register} from '@/api/authApi';

const CAPTCHA_CONTAINER_ID = 'recaptcha-container';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {token, resetCaptcha} = useRecaptcha({
        siteKey: import.meta.env.VITE_CAPTCHA_SITE_KEY as string,
        elementId: CAPTCHA_CONTAINER_ID,
    });

    const handleSubmit = async (e: React.FormEvent) => {
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

        try {
            setLoading(true);

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

    return (
        <div className="text-white p-10">
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">

                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">Реєстрація</h1>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            id="signup-name"
                            name="name"
                            label="Імʼя"
                            placeholder="Ваше ім'я"
                        />

                        <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            label="Електронна пошта"
                            placeholder="example@mail.com"
                        />

                        <PasswordInput
                            id="signup-password"
                            name="password"
                            label="Пароль"
                            placeholder="••••••••"
                        />

                        <PasswordInput
                            id="signup-confirm-password"
                            name="confirmPassword"
                            label="Підтвердіть пароль"
                            placeholder="••••••••"
                        />

                        {/* Captcha */}
                        <div className="flex justify-center">
                            <div id={CAPTCHA_CONTAINER_ID}/>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 p-2 rounded">
                                {error}
                            </div>
                        )}

                        <BaseButton
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl text-lg font-bold"
                        >
                            {loading ? 'Обробка...' : 'Зареєструватися'}
                        </BaseButton>
                    </form>

                    <div className="text-center text-zinc-400">
                        Вже маєте акаунт?{' '}
                        <Link
                            to="/auth"
                            className="text-white font-semibold underline hover:text-white/80 transition-colors"
                        >
                            Увійти
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;