import React, { forwardRef } from 'react'; // <-- forwardRef обов'язковий

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, id, className = '', error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={`w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error ? 'border-2 border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-red-400 text-sm ml-1">{error}</span>}
      </div>
    );
  }
);

AdminInput.displayName = 'AdminInput';
export default AdminInput;