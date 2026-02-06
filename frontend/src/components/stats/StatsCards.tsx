import React from 'react';

interface StatsCardsProps {
  revenue: number;
  specialTickets: number;
  isLoading: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ revenue, specialTickets, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 hover:bg-[#003380] transition-colors">
        <span className="text-blue-200 text-sm font-medium">Загальний дохід</span>
        <div className="text-3xl font-bold text-white mb-1 mt-2">
          {isLoading ? "..." : `${revenue.toLocaleString()} ₴`}
        </div>
      </div>

      <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 hover:bg-[#003380] transition-colors">
        <span className="text-blue-200 text-sm font-medium">Акційні квитки</span>
        <div className="text-3xl font-bold text-white mb-1 mt-2">
          {isLoading ? "..." : specialTickets}
        </div>
        <div className="text-gray-400 text-xs">Квитки зі знижкою {'>'} 0%</div>
      </div>

      <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 opacity-50">
        <span className="text-blue-200 text-sm font-medium">Заповнюваність</span>
        <div className="text-3xl font-bold text-white mt-2">78%</div>
      </div>
    </div>
  );
};

export default StatsCards;