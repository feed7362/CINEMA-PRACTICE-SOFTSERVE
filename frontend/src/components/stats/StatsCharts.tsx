import React from 'react';

const StatsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Динаміка доходу (за тиждень)</h3>
            <div className="w-full h-48 relative flex items-end justify-between px-2">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="0,150 100,120 200,130 300,80 400,100 500,60 600,40" />
                </svg>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day, i) => (
                    <span key={i} className="text-gray-400 text-sm z-10">{day}</span>
                ))}
            </div>
        </div>

        <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 shadow-xl flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Жанри</h3>
            <div className="w-40 h-40 rounded-full relative mb-6" style={{ background: 'conic-gradient(#ef4444 0% 35%, #22c55e 35% 60%, #eab308 60% 100%)' }}>
                 <div className="absolute inset-4 bg-[#002D6E] rounded-full"></div>
            </div>
            <div className="w-full space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"/> Екшн (35%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"/> Комедії (25%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"/> Мульти (40%)</div>
            </div>
        </div>
    </div>
  );
};

export default StatsCharts;