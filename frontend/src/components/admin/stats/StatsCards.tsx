import React from 'react';

interface StatsCardsProps {
    revenue: number;
    ticketsCount: number;
    isLoading: boolean;
    onRevenueClick: () => void;
    onTicketsClick: () => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
    revenue, 
    ticketsCount, 
    isLoading, 
    onRevenueClick,
    onTicketsClick 
}) => {
    const formatCurrency = (val: number) => 
        new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div 
                onClick={onRevenueClick}
                className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-all duration-300"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-24 h-24 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-zinc-400 font-medium mb-1">Загальний дохід</p>
                    {isLoading ? (
                        <div className="h-10 w-32 bg-white/10 rounded animate-pulse" />
                    ) : (
                        <h3 className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {formatCurrency(revenue)}
                        </h3>
                    )}
                    <p className="text-xs text-zinc-500 mt-2">Натисніть для деталізації</p>
                </div>
            </div>

            <div 
                onClick={onTicketsClick} 
                className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-all duration-300"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg className="w-24 h-24 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                </div>
                <div>
                    <p className="text-zinc-400 font-medium mb-1">Продано квитків</p>
                    {isLoading ? (
                        <div className="h-10 w-24 bg-white/10 rounded animate-pulse" />
                    ) : (
                        <h3 className="text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {ticketsCount}
                        </h3>
                    )}
                     <p className="text-xs text-zinc-500 mt-2">Аналіз знижок та продажів</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;