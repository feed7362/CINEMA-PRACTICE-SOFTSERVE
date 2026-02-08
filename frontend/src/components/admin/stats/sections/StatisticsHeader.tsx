import React from 'react';
import StatsFilters from '@/components/admin/stats/StatsFilters';

interface Props {
    dateRange: { from: string; to: string };
    setDateRange: (range: { from: string; to: string }) => void;
}

export const StatisticsHeader: React.FC<Props> = ({ dateRange, setDateRange }) => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 mb-10">
        <div>
            <h1 className="text-3xl font-bold">Аналітика кінотеатру</h1>
            <p className="text-zinc-400">Звітність за обраний період</p>
        </div>
        <StatsFilters 
            currentFilters={dateRange} 
            onFilterChange={setDateRange} 
        />
    </div>
);