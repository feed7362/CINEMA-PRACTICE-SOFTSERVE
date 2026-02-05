import React from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import DashboardCard from '../components/admin/DashboardCard';
import BackgroundEffects from '../components/ui/BackgroundEffects'; 
import { ADMIN_DASHBOARD_CARDS } from '../constants/adminNavigation';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        
        <HeaderAdmin />

        <BackgroundEffects />

        <div className="flex-grow flex flex-col items-center justify-start relative z-10 px-6 pt-10 pb-20">
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center drop-shadow-lg">
                Панель адміністратора
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {ADMIN_DASHBOARD_CARDS.map((card, index) => (
                    <DashboardCard 
                        key={index}
                        title={card.title}
                        description={card.description}
                        buttonText={card.buttonText}
                        link={card.link}
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default Admin;