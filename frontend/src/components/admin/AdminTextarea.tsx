import React, { forwardRef } from 'react';

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}

const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, id, className = '', error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 h-full">
        <label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          className={`w-full h-full min-h-30 bg-white text-black rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-2 border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-red-400 text-sm ml-1">{error}</span>}
      </div>
    );
  }
);

AdminTextarea.displayName = 'AdminTextarea';
export default AdminTextarea;