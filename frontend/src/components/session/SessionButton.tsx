import React from 'react';
import type { BaseButtonProps } from '@/types/ui';

interface SessionButtonProps extends Omit<BaseButtonProps, 'children'> {
    time: string;
    isSelected?: boolean;
    price?: number;
}

const SessionButton: React.FC<SessionButtonProps> = ({ time, isSelected, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-11 flex items-center justify-center rounded-xl border border-white/60 transition-all duration-300 hover:bg-[#001431] hover:border-white ${isSelected ? 'bg-[#001431] border-white shadow-lg' : 'bg-transparent'} active:scale-95 ${className}`}
    >
      <span className="text-[#0000FF] text-xl font-semibold transition-colors">{time}</span>
    </button>
  );
};

export default SessionButton;