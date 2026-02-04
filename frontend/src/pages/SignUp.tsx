import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';
import {useRecaptcha} from '@/hooks/useRecaptcha';
import {register} from '@/api/authApi';

const SITE_KEY = '6LfbhFosAAAAAMCZYTFvO8bG3EbOj5a3uBi4_XOW';
const CAPTCHA_CONTAINER_ID = 'recaptcha-container';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {token, resetCaptcha} = useRecaptcha({
        siteKey: SITE_KEY,
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
            await register(name, email, password, confirmPassword, token);
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
        <div className="text-white p-4 h-screen flex items-center justify-center overflow-y-auto no-scrollbar">
            <div className="w-full max-w-100 bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-wide">Реєстрація</h1>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    
                    <div className="flex flex-col gap-3">
                        <Input
                            id="signup-name"
                            name="name"
                            label="Імʼя"
                            placeholder="Ваше ім'я"
                            className="text-sm" 
                        />

                        <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="mail@ex.com"
                            className="text-sm"
                        />

                        <PasswordInput
                            id="signup-password"
                            name="password"
                            label="Пароль"
                            placeholder="••••••••"
                            className="text-sm"
                        />

                        <PasswordInput
                            id="signup-confirm-password"
                            name="confirmPassword"
                            label="Підтвердження"
                            placeholder="••••••••"
                            className="text-sm"
                        />
                    </div>

                    <div className="flex justify-center scale-90 origin-center -my-2">
                        <div id={CAPTCHA_CONTAINER_ID}/>
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs text-center font-medium bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <BaseButton
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-sm font-bold bg-[#0753E0] hover:bg-[#0642b5] transition-colors mt-2"
                    >
                        {loading ? 'Обробка...' : 'Створити акаунт'}
                    </BaseButton>
                </form>

                <div className="text-center mt-6 pt-4 border-t border-white/10">
                    <p className="text-zinc-400 text-xs">
                        Вже є акаунт?{' '}
                        <Link
                            to="/auth"
                            className="text-white font-semibold hover:text-[#0753E0] transition-colors ml-1"
                        >
                            Увійти
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SignUp;