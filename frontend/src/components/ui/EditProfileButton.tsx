import React from 'react';

interface EditButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const EditProfileButton: React.FC<EditButtonProps> = ({ onClick, children, className = '' }) => {
  const baseStyles = `relative overflow-hidden transition-all duration-500 bg-gradient-to-tr from-[#0753E0] to-[#032D7B] hover:from-[#032D7B] hover:to-[#0753E0] active:scale-95 flex items-center justify-center`;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {children || 'Редагувати'}
    </button>
  );
};

export default EditProfileButton;