import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import effect1 from '../assets/images/backgroundEffects/effect1.png';
import effect2 from '../assets/images/backgroundEffects/effect2.png';

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

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        
        <HeaderAdmin />

        <img 
            src={effect1} 
            alt="" 
            className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen" 
            style={{ transform: 'translate(-20%, -10%)' }}
        />
        <img 
            src={effect2} 
            alt="" 
            className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen" 
            style={{ transform: 'translate(20%, 20%)' }}
        />

        <div className="flex-grow flex flex-col items-center justify-start relative z-10 px-6 pt-10 pb-20">
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center drop-shadow-lg">
                Панель адміністратора
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                <DashboardCard title="Фільми" description="Додавання фільмів та іншої інформації" buttonText="Додати" link="/admin/add-movie" />
                <DashboardCard title="Редагування фільмів" description="Редагування інформації фільмів" buttonText="Редагування" link="/admin/edit-movies" />
                <DashboardCard title="Зали" description="Керування залами" buttonText="Зали" link="/admin/halls" />
                <DashboardCard title="Статистика заробітку" description="Перегляд фінансової статистики" buttonText="Переглянути" link="/admin/stats" />
                <DashboardCard title="Сеанси" description="Керування сеансами" buttonText="Переглянути" link="/admin/sessions" />
            </div>
        </div>
    </div>
  );
};

export default Admin;