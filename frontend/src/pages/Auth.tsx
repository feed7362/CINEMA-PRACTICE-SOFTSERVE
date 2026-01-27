import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import BaseButton from '@/components/ui/BaseButton';
import Label from '@/components/ui/Label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Auth: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="text-white p-10">
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Вхід</h1>
            <p className="text-zinc-400">Увійди в акаунт, щоб продовжити</p>
          </div>

          <form className="space-y-6">

            <Input
              id="auth-email"
              type="email"
              label="Електронна пошта"
              placeholder="example@mail.com"
            />

            <div className="w-full flex flex-col relative">
              <Label text="Пароль" htmlFor="auth-password" />
              
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-xl placeholder:text-white/20 focus:outline-none focus:border-[#0753E0] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-8 h-8" />
                  ) : (
                    <EyeIcon className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>

            <BaseButton
              to="#"
              className="w-full py-4 rounded-xl text-lg font-bold"
            >
              Увійти
            </BaseButton>
          </form>

          <div className="text-center text-zinc-400 space-y-2">
            <div>
              Немає акаунта?{' '}
              <BaseButton
                to="/signup"
                className="inline-flex px-0 py-0 text-white font-semibold underline"
              >
                Зареєструватися
              </BaseButton>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;
