import React from 'react';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import StatsFilters from '@/components/stats/StatsFilters';
import StatsCards from '@/components/stats/StatsCards';
import StatsCharts from '@/components/stats/StatsCharts';
import StatsTable from '@/components/stats/StatsTable';

const Statistics: React.FC = () => {
  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">

        <BackgroundEffects />

        <div className="grow flex flex-col items-center relative z-10 px-4 py-8">
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