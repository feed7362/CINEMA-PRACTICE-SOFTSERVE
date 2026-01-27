import React from 'react';
import Input from '@/components/ui/Input';
import BaseButton from '@/components/ui/BaseButton';

const Auth: React.FC = () => {
  return (
    <div className="text-white p-10">
    
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">
              Вхід
            </h1>
            <p className="text-zinc-400">
              Увійди в акаунт, щоб продовжити
            </p>
          </div>

          <form className="space-y-6">
            <Input
              id="auth-email"
              type="email"
              label="Електронна пошта"
              placeholder="example@mail.com"
            />

            <Input
              id="auth-password"
              type="password"
              label="Пароль"
              placeholder="••••••••"
            />

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
