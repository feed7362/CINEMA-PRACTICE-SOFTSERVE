import React from 'react';
import type { InputProps } from '@/types/forms';
import Label from '@/components/ui/Label';

const Input: React.FC<InputProps> = ({ label, id, type = "text", placeholder }) => (
  <div className="w-full flex flex-col">
    <Label text={label} htmlFor={id} />
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-xl placeholder:text-white/20 focus:outline-none focus:border-[#0753E0] transition-colors"
    />
  </div>
);

export default Input;