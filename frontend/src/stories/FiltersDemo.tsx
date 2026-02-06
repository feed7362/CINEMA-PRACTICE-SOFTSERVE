import React, { useState } from 'react';
// Перевірте шлях імпорту (можливо components/filters/FilterSidebar)
import FilterSidebar from '@/components/filters/FilterSidebar'; 
import type { IFilterItem } from '@/api/filterApi';

// --- MOCK DATA FOR DEMO ---
const MOCK_GENRES: IFilterItem[] = [
  { id: 1, name: 'Бойовик' },
  { id: 2, name: 'Комедія' },
  { id: 3, name: 'Драма' },
  { id: 4, name: 'Фантастика' },
  { id: 5, name: 'Жахи' },
  { id: 6, name: 'Трилер' },
  { id: 7, name: 'Мелодрама' },
];

const MOCK_STUDIOS: IFilterItem[] = [
  { id: 101, name: 'Warner Bros.' },
  { id: 102, name: 'Universal Pictures' },
  { id: 103, name: 'Paramount' },
  { id: 104, name: '20th Century Fox' },
  { id: 105, name: 'Sony Pictures' },
];

const FiltersDemo: React.FC = () => {
  // Local state to simulate page logic
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleReset = () => {
    setSelectedGenres([]);
    setSelectedStudio(null);
    setSelectedRating(null);
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Filters (Фільтри)</h1>
        <p className="text-gray-400">
          Бокова панель фільтрації фільмів (жанри, студії, рейтинг).
        </p>
      </div>

      <section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
          FilterSidebar Demo
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* 1. Сам компонент (зліва) */}
          <div className="w-full md:w-64 bg-black/20 p-4 rounded-xl border border-white/5">
            <FilterSidebar
              genres={MOCK_GENRES}
              studios={MOCK_STUDIOS}
              
              selectedGenres={selectedGenres}
              selectedStudio={selectedStudio}
              selectedRating={selectedRating}
              
              onSelectGenre={setSelectedGenres}
              onSelectStudio={setSelectedStudio}
              onSelectRating={setSelectedRating}
              onReset={handleReset}
            />
          </div>

          {/* 2. Результат вибору (справа) */}
          <div className="flex-grow space-y-6">
             <div className="bg-[#020617] p-6 rounded-xl border border-white/10 shadow-lg">
                <h3 className="text-lg font-bold mb-4 text-gray-300">Active State (Результат)</h3>
                
                <div className="space-y-4 font-mono text-sm">
                   
                   {/* Жанри */}
                   <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">selectedGenres:</span>
                      <span className="text-green-400">
                         [{selectedGenres.join(', ')}]
                      </span>
                   </div>

                   {/* Рейтинг */}
                   <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">selectedRating:</span>
                      <span className="text-yellow-400">
                         {selectedRating ? `> ${selectedRating}` : 'null'}
                      </span>
                   </div>

                   {/* Студія */}
                   <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">selectedStudio:</span>
                      <span className="text-blue-400">
                         {selectedStudio || 'null'}
                      </span>
                   </div>

                </div>

                {/* Підказка */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-200">
                   <p>💡 Спробуйте обирати фільтри зліва. Цей блок показує дані, які будуть відправлені на сервер для фільтрації списку фільмів.</p>
                </div>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default FiltersDemo;