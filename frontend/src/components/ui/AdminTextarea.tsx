import React from 'react';

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

const AdminTextarea: React.FC<AdminTextareaProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full h-full min-h-[120px] bg-white text-black rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default AdminTextarea;