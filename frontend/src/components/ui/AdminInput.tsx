import React from 'react';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const AdminInput: React.FC<AdminInputProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

// ОСЬ ЦЕЙ РЯДОК ДУЖЕ ВАЖЛИВИЙ:
export default AdminInput;