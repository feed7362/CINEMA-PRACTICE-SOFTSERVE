import React from 'react';

const StatsFilters: React.FC = () => {
  return (
    <div className="bg-[#002D6E]/90 border border-blue-400/20 rounded-xl p-6 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-white font-medium ml-1">Період</label>
                <input type="date" className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-white font-medium ml-1">Зал</label>
                <select className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
                    <option>Всі зали</option>
                    <option>IMAX</option>
                    <option>Головний</option>
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-white font-medium ml-1">Фільм</label>
                <input type="text" placeholder="Пошук фільму..." className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
        </div>
    </div>
  );
};

export default StatsFilters;