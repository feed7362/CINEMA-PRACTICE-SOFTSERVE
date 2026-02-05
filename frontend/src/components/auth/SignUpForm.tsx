import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import BaseButton from '@/components/ui/BaseButton';

interface SignUpFormProps {
    onSubmit: (e: React.FormEvent) => void;
    onGoogleSuccess: (response: any) => void;
    onGoogleError: () => void;
    loading: boolean;
    error: string | null;
    captchaContainerId: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
    onSubmit,
    onGoogleSuccess,
    onGoogleError,
    loading,
    error,
    captchaContainerId
}) => {
    return (
        <div className="w-full max-w-100 bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
            
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-wide text-white">Реєстрація</h1>
            </div>

            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                    />
                    <PasswordInput
                        id="signup-confirm-password"
                        name="confirmPassword"
                        label="Підтвердження"
                        placeholder="••••••••"
                    />
                </div>

                {/* Captcha Container */}
                <div className="flex justify-center my-2">
                    <div id={captchaContainerId}/>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-400 text-xs text-center font-medium bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <BaseButton
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-sm font-bold bg-[#0753E0] hover:bg-[#0642b5] transition-colors"
                >
                    {loading ? 'Обробка...' : 'Створити акаунт'}
                </BaseButton>

                <div className="relative flex py-2 items-center">
                    <div className="grow border-t border-white/10"></div>
                    <span className="shrink-0 px-2 text-xs text-zinc-500">або</span>
                    <div className="grow border-t border-white/10"></div>
                </div>

                {/* Google Login */}
                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={onGoogleError}
                        useOneTap
                        theme="filled_black"
                        shape="circle"
                    />
                </div>
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
    );
};

export default SignUpForm;