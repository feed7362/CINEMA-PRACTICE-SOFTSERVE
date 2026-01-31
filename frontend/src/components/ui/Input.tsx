import React from 'react';
import Label from '@/components/ui/Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  id, 
  className = '', 
  ...props
}) => (
  <div className={`w-full flex flex-col ${className}`}>
    <Label text={label} htmlFor={id} />
    <input
      id={id}
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-xl placeholder:text-white/20 focus:outline-none focus:border-[#0753E0] transition-colors"
    />
  </div>
);

export default Input;