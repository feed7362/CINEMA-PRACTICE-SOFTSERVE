import React from 'react';
import { Link } from 'react-router-dom';
import type { BaseButtonProps } from '../../types/button';

const BaseButton: React.FC<BaseButtonProps> = ({ to, onClick, children, className = "" }) => {
  const baseStyles = `relative overflow-hidden transition-all duration-500 bg-gradient-to-tr from-[#0753E0] to-[#032D7B] hover:from-[#032D7B] hover:to-[#0753E0] active:scale-95 flex items-center justify-center`;
  
  if (to) {
    return <Link to={to} className={`${baseStyles} ${className}`}>{children}</Link>;
  }
  return <button onClick={onClick} className={`${baseStyles} ${className}`}>{children}</button>;
};

export default BaseButton;