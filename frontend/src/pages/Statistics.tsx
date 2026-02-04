import React from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import StatsFilters from '../components/admin/stats/StatsFilters';
import StatsCards from '../components/admin/stats/StatsCards';
import StatsCharts from '../components/admin/stats/StatsCharts';
import StatsTable from '../components/admin/stats/StatsTable';

import effect1 from '../assets/images/backgroundEffects/effect1.png';
import effect2 from '../assets/images/backgroundEffects/effect2.png';

const Statistics: React.FC = () => {
  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        <HeaderAdmin />

        <img src={effect1} alt="" className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen -translate-x-1/5 -translate-y-1/10" />
        <img src={effect2} alt="" className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen translate-x-1/5 translate-y-1/5" />

        <div className="flex-grow flex flex-col items-center relative z-10 px-4 py-8">
            <div className="w-full max-w-6xl space-y-8">

                <StatsFilters />

                <StatsCards />

                <StatsCharts />

                <StatsTable />

            </div>
        </div>
    </div>
  );
};

export default Statistics;