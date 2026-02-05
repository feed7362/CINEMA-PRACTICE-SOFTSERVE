import React from 'react';
import type { IFilterItem } from '@/api/filterApi';

interface FilterSidebarProps {
  genres: IFilterItem[];
  studios: IFilterItem[];
  
  selectedGenres: number[]; 
  selectedStudio: number | null;
  selectedRating: number | null;

  onSelectGenre: (ids: number[]) => void;
  onSelectStudio: (id: number | null) => void;
  onSelectRating: (rating: number | null) => void;
  
  onReset: () => void;
}

const RATING_OPTIONS = [9, 8, 7, 6, 5];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  genres,
  studios,
  selectedGenres,
  selectedStudio,
  selectedRating,
  onSelectGenre,
  onSelectStudio,
  onSelectRating,
  onReset
}) => {
  
  const scrollContainerClasses = `
    flex flex-col gap-3 
    max-h-[300px] 
    overflow-y-auto 
    pr-2
    no-scrollbar 
  `;

  const handleGenreToggle = (id: number) => {
    if (selectedGenres.includes(id)) {
      onSelectGenre(selectedGenres.filter(gId => gId !== id));
    } else {
      onSelectGenre([...selectedGenres, id]);
    }
  };

  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6 relative z-20">
      
      {(selectedGenres.length > 0 || selectedStudio || selectedRating) && (
        <button 
          onClick={onReset}
          className="text-sm text-red-400 hover:text-red-300 underline text-left transition-colors"
        >
          × Скинути всі фільтри
        </button>
      )}

      <div className="bg-[#051838]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold text-lg mb-4 border-b border-white/10 pb-2">
          Жанри
        </h3>
        <div className={scrollContainerClasses}>
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre.id);

            return (
              <label key={genre.id} className="flex items-center gap-3 cursor-pointer group select-none">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-[#0753E0] border-[#0753E0]' 
                    : 'border-white/30 group-hover:border-white/60'
                }`}>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                <input 
                  type="checkbox" 
                  className="absolute opacity-0 w-0 h-0"
                  checked={isSelected}
                  onChange={() => handleGenreToggle(genre.id)}
                />
                
                <span className={`text-sm transition-colors ${isSelected ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>
                  {genre.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="bg-[#051838]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold text-lg mb-4 border-b border-white/10 pb-2">
          Рейтинг IMDb
        </h3>
        <div className="flex flex-col gap-3">
          {RATING_OPTIONS.map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group select-none">
              
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 ${
                selectedRating === rating 
                  ? 'border-yellow-500' 
                  : 'border-white/30 group-hover:border-white/60'
              }`}>
                {selectedRating === rating && (
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                )}
              </div>
              
              <input 
                type="checkbox"
                className="absolute opacity-0 w-0 h-0"
                checked={selectedRating === rating}
                onChange={() => onSelectRating(selectedRating === rating ? null : rating)}
              />
              
              <div className="flex items-center gap-2">
                <span className={`text-sm transition-colors ${selectedRating === rating ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>
                  Більше {rating}
                </span>
                <svg className="w-4 h-4 text-yellow-500 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-[#051838]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-bold text-lg mb-4 border-b border-white/10 pb-2">
          Студії
        </h3>
        <div className={scrollContainerClasses}>
          {studios.map((studio) => (
            <label key={studio.id} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 ${
                selectedStudio === studio.id 
                  ? 'border-[#0753E0]' 
                  : 'border-white/30 group-hover:border-white/60'
              }`}>
                {selectedStudio === studio.id && (
                  <div className="w-2.5 h-2.5 bg-[#0753E0] rounded-full" />
                )}
              </div>
              
              <input 
                type="checkbox"
                className="absolute opacity-0 w-0 h-0"
                checked={selectedStudio === studio.id}
                onChange={() => onSelectStudio(selectedStudio === studio.id ? null : studio.id)}
              />
              
              <span className={`text-sm transition-colors ${selectedStudio === studio.id ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>
                {studio.name}
              </span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;