import React from 'react';

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 hover:bg-[#003380] transition-colors">
            <span className="text-blue-200 text-sm font-medium">Загальний дохід</span>
            <div className="text-3xl font-bold text-white mb-1 mt-2">100 000 ₴</div>
            <div className="text-green-400 text-xs">↑ 12% <span className="text-gray-400">до минулого тижня</span></div>
        </div>

        <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 hover:bg-[#003380] transition-colors">
            <span className="text-blue-200 text-sm font-medium">Заповнюваність</span>
            <div className="text-3xl font-bold text-white mb-1 mt-2">78%</div>
            <div className="text-green-400 text-xs">↑ 5% <span className="text-gray-400">до минулого тижня</span></div>
        </div>

        <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 hover:bg-[#003380] transition-colors">
            <span className="text-blue-200 text-sm font-medium">Топ-фільм</span>
            <div className="text-2xl font-bold text-white mt-2 truncate">Гарі Потер</div>
            <div className="text-gray-400 text-xs mt-1">Найбільше переглядів</div>
        </div>

        <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 hover:bg-[#003380] transition-colors">
            <span className="text-blue-200 text-sm font-medium">Продано квитків</span>
            <div className="text-3xl font-bold text-white mb-1 mt-2">5 120</div>
            <div className="text-red-400 text-xs">↓ 2% <span className="text-gray-400">до минулого тижня</span></div>
        </div>
    </div>
  );
};

export default StatsCards;