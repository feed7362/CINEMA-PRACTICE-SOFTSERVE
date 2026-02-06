import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, buttonText, link }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#002D6E] border border-blue-400/20 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 group relative z-10 h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/40">
      <h3 className="text-2xl font-bold text-white mb-3 z-10">{title}</h3>
      <p className="text-blue-200/70 text-sm mb-8 z-10 min-h-[32px] flex items-center justify-center">
        {description}
      </p>

      <button 
        onClick={() => navigate(link)}
        className="w-full py-3 px-6 bg-[#0041C4] hover:bg-[#0035A0] text-white text-base font-bold rounded-lg transition-all shadow-md active:scale-95 cursor-pointer z-20 mt-auto"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardCard;