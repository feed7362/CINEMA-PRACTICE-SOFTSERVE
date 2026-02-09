import React from 'react';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import { formatCurrency } from '@/utils/formatters';

interface StatsCardsProps {
    revenue: number;
    ticketsCount: number;
    isLoading: boolean;
    onRevenueClick?: () => void;
}

const RevenueBgIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const RevenueSmallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        <line x1="11" y1="8" x2="11" y2="14"></line>
        <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>
);

const TicketsBgIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
        <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
    </svg>
);

const StatsCards: React.FC<StatsCardsProps> = ({ revenue, ticketsCount, isLoading, onRevenueClick }) => {
    if (isLoading) {
        return <div className="flex justify-center py-10 w-full"><LoadingSpinner /></div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div 
                onClick={onRevenueClick}
                className="bg-linear-to-br from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30 p-8 rounded-2xl relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-900/20"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <RevenueBgIcon />
                </div>
                
                <h3 className="text-zinc-400 font-medium mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
                    Загальний дохід
                    <RevenueSmallIcon />
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {formatCurrency(revenue)}
                </p>
                <div className="mt-4 text-emerald-400/80 text-sm font-medium">
                    Натисніть для деталізації
                </div>
            </div>

            <div className="bg-linear-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TicketsBgIcon />
                </div>
                
                <h3 className="text-zinc-400 font-medium mb-2 uppercase tracking-wider text-sm">Всього продано квитків</h3>
                <p className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {ticketsCount} <span className="text-2xl text-zinc-500 font-normal">шт.</span>
                </p>
                <div className="mt-4 text-blue-400/80 text-sm font-medium">
                    За обраний період
                </div>
            </div>
        </div>
    );
};

export default StatsCards;