import React, {useState} from 'react';
import {Eye, EyeOff} from 'lucide-react';

interface PasswordInputProps {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
}


const PasswordInput: React.FC<PasswordInputProps> = (
    {
        id,
        name,
        label = 'Пароль',
        placeholder,
    }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-2 w-full max-w-md">
            <label htmlFor={id} className="text-white/70 text-sm pl-1">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white outline-none focus:border-[#0753E0] transition-colors"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
