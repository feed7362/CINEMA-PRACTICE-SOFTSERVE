import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: Option[];
}

const AdminSelect: React.FC<AdminSelectProps> = ({ label, id, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>
  );
};

export default AdminSelect;