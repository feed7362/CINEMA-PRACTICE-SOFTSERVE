import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import BaseButton from '@/components/ui/BaseButton';
import { Eye, EyeOff } from 'lucide-react';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = (document.getElementById('signup-name') as HTMLInputElement)?.value.trim();
    const email = (document.getElementById('signup-email') as HTMLInputElement)?.value.trim();
    const password = (document.getElementById('signup-password') as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById('signup-password-confirm') as HTMLInputElement)?.value;

    if (!name || !email || !password || !confirmPassword) {
      setError('Заповніть всі поля');
      return;
    }

    if (!validateEmail(email)) {
      setError('Невірний формат електронної пошти');
      return;
    }

    if (password.length < 6) {
      setError('Пароль має містити мінімум 6 символів');
      return;
    }

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    console.log('REGISTER OK');
  };

  return (
    <div className="text-white p-10">
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Реєстрація</h1>
            <p className="text-zinc-400">
              Створи акаунт, щоб користуватися сервісом
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

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

            <div className="relative w-full">
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                label="Пароль"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[70px] -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-8 h-8" /> : <Eye className="w-8 h-8" />}
              </button>
            </div>

            <div className="relative w-full">
              <Input
                id="signup-password-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Підтвердіть пароль"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-[70px] -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-8 h-8" /> : <Eye className="w-8 h-8" />}
              </button>
            </div>



            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <BaseButton className="w-full py-4 rounded-xl text-lg font-bold">
              Зареєструватися
            </BaseButton>

          </form>

          <div className="text-center text-zinc-400">
            Вже маєш акаунт?{' '}
            <BaseButton
              to="/auth"
              className="inline-flex px-0 py-0 text-white font-semibold underline"
            >
              Увійти
            </BaseButton>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
