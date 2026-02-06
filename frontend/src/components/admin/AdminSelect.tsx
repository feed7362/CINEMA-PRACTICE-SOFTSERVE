import React, { forwardRef } from 'react';
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';

interface Option {
  value: string | number;
  label: string;
}

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: Option[];
  error?: string;
}

const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ label, id, options, className = '', error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={`w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
               error ? 'border-2 border-red-500' : ''
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
           <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
             <ChevronDownIcon className="w-4 h-4" />
           </div>
        </div>
        {error && <span className="text-red-400 text-sm ml-1">{error}</span>}
      </div>
    );
  }
);

AdminSelect.displayName = 'AdminSelect';
export default AdminSelect;