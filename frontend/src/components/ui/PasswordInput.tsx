import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-11.25 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
      </button>
    </div>
  );
};

export default PasswordInput;