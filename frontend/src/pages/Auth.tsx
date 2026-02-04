import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';
import { login } from '@/api/authApi';
import { Link } from 'react-router-dom';

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
      navigate('/profile/1');
    } catch {
      setError('Невірна пошта або пароль');
    }
  };

  return (
    <div className="text-white p-4">
      <div className="min-h-[70vh] flex items-center justify-center">
        <div
          id="auth-card"
          className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6"
        >

          <div className="text-center space-y-2">
            <h1 id="auth-title" className="text-2xl font-bold">Вхід</h1>
            <p className="text-zinc-400 text-sm">Увійди в акаунт, щоб продовжити</p>
          </div>

          <div className="space-y-4">

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
              className="w-full py-3 rounded-xl text-base font-bold"
            >
              Увійти
            </BaseButton>

          </div>

          <div className="text-center text-zinc-400 space-y-2 text-sm">
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