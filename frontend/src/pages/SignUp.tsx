import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { register } from '@/api/auth.api';

const SITE_KEY = '6LfbhFosAAAAAMCZYTFvO8bG3EbOj5a3uBi4_XOW';
const CAPTCHA_CONTAINER_ID = 'recaptcha-container';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { token } = useRecaptcha({
    siteKey: SITE_KEY,
    elementId: CAPTCHA_CONTAINER_ID,
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!token) {
      setError('Пройдіть капчу');
      return;
    }

    const name = (document.getElementById('signup-name') as HTMLInputElement)?.value.trim();
    const email = (document.getElementById('signup-email') as HTMLInputElement)?.value.trim();
    const password = (document.getElementById('signup-password') as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById('signup-confirm-password') as HTMLInputElement)?.value;

    if (!name || !email || !password || !confirmPassword) {
      setError('Заповніть всі поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      setLoading(true);

      await register(email, password, confirmPassword);

      alert('Реєстрація успішна');
      navigate('/auth');

    } catch (err: any) {
      setError(
        err?.response?.data?.title ||
        err?.response?.data?.detail ||
        'Помилка реєстрації'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-10">
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">

          <div className="text-center space-y-2">
            <h1 id="signup-title" className="text-3xl font-bold">
              Реєстрація
            </h1>
          </div>

          <form id="signup-form" className="space-y-6" onSubmit={handleSubmit}>

            <Input
              id="signup-name"
              label="Імʼя"
              placeholder="Ваше ім'я"
            />

            <Input
              id="signup-email"
              type="email"
              label="Електронна пошта"
              placeholder="example@mail.com"
            />

            <PasswordInput
              id="signup-password"
              label="Пароль"
              placeholder="••••••••"
            />

            <PasswordInput
              id="signup-confirm-password"
              label="Підтвердіть пароль"
              placeholder="••••••••"
            />

            <div id={CAPTCHA_CONTAINER_ID} />

            {error && (
              <div id="signup-error" className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <BaseButton
              onClick={() => handleSubmit()}
              className="w-full py-4 rounded-xl text-lg font-bold"
            >
              {loading ? 'Зачекайте...' : 'Зареєструватися'}
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
