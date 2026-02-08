import React from 'react';

interface StatsFiltersProps {
  currentFilters: {
    from: string;
    to: string;
  };
  onFilterChange: (newRange: { from: string; to: string }) => void;
}

const StatsFilters: React.FC<StatsFiltersProps> = ({ currentFilters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...currentFilters, [name]: value });
  };

  return (
    <div className="bg-[#002D6E]/90 border border-blue-400/20 rounded-xl p-6 shadow-xl backdrop-blur-sm w-full md:min-w-150">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            <div className="flex flex-col gap-2 w-full">
                <label className="text-white font-medium ml-1">Від</label>
                <input 
                  type="date" 
                  name="from"
                  value={currentFilters.from}
                  onChange={handleChange}
                  className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer shadow-inner" 
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label className="text-white font-medium ml-1">До</label>
                <input 
                  type="date" 
                  name="to"
                  value={currentFilters.to}
                  onChange={handleChange}
                  className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer shadow-inner" 
                />
            </div>
            
        </div>
    </div>
  );
};

export default StatsFilters;