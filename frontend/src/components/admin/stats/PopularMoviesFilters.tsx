import React from 'react';
import type { PopularMoviesParams } from '@/types/admin';
import { useFilterOptions } from '@/hooks/useFilterOptions';
 import { ReportIcon } from '@/assets/icons/ReportIcon';
 
interface FieldProps {
    label: string;
    children: React.ReactNode;
}

const FilterWrapper: React.FC<FieldProps> = ({ label, children }) => (
    <div className="space-y-1.5">
        <label className="text-xs text-zinc-400 uppercase font-bold ml-1">{label}</label>
        <div className="relative">{children}</div>
    </div>
);

const SelectField = ({ value, onChange, options, placeholder, displayKey = 'name', valueKey = 'id' }: any) => (
    <>
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
        >
            <option value="" className="bg-zinc-800 text-zinc-400">{placeholder}</option>
            {options.map((opt: any) => {
                const isObject = typeof opt === 'object' && opt !== null;
                const optionValue = isObject ? opt[valueKey] : opt;
                let optionLabel = isObject ? opt[displayKey] : opt;

                if (typeof optionLabel === 'number' && placeholder.includes('вікові')) {
                    optionLabel = `${optionLabel}+`;
                }

                return (
                    <option key={optionValue} value={optionValue} className="bg-zinc-800 text-white">
                        {optionLabel}
                    </option>
                );
            })}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
    </>
);

interface PopularMoviesFiltersProps {
    filters: PopularMoviesParams;
    onChange: (newFilters: Partial<PopularMoviesParams>) => void;
    onSearch: () => void;
}

const PopularMoviesFilters: React.FC<PopularMoviesFiltersProps> = ({ filters, onChange, onSearch }) => {
    const { genres, halls, countries, directors, ageRatings, isLoading } = useFilterOptions();

    const handleUpdate = (key: keyof PopularMoviesParams, rawValue: string | number) => {
        let value: string | number | undefined = rawValue;
        
        if (value === '' || value === '0' || value === 0) {
            value = undefined;
        } else if (typeof rawValue === 'string' && !isNaN(Number(rawValue)) && key !== 'Director' && key !== 'Country') {
            value = Number(rawValue);
        }

        onChange({ [key]: value });
    };

    return (
        <div className="bg-[#002D6E]/30 p-6 rounded-2xl border border-blue-400/10 backdrop-blur-md mb-6 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-[#002D6E]/50 z-10 rounded-2xl flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                Критерії звіту
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                <FilterWrapper label="Жанр">
                    <SelectField 
                        value={filters.GenreId} 
                        onChange={(v: string) => handleUpdate('GenreId', v)} 
                        options={genres} 
                        placeholder="Всі жанри" 
                    />
                </FilterWrapper>

                <FilterWrapper label="Зал">
                    <SelectField 
                        value={filters.HallId} 
                        onChange={(v: string) => handleUpdate('HallId', v)} 
                        options={halls} 
                        placeholder="Всі зали" 
                    />
                </FilterWrapper>

                <FilterWrapper label="Режисер">
                    <SelectField 
                        value={filters.Director} 
                        onChange={(v: string) => handleUpdate('Director', v)} 
                        options={directors}
                        placeholder="Всі режисери" 
                    />
                </FilterWrapper>

                <FilterWrapper label="Країна">
                    <SelectField 
                        value={filters.Country} 
                        onChange={(v: string) => handleUpdate('Country', v)} 
                        options={countries}
                        placeholder="Всі країни" 
                    />
                </FilterWrapper>

                <FilterWrapper label="Мін. IMDb">
                    <input 
                        type="number" step="0.1" min="0" max="10"
                        placeholder="Напр: 7.5"
                        value={filters.MinImdbRating ?? ''}
                        onChange={(e) => handleUpdate('MinImdbRating', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-600 no-spinner"
                    />
                </FilterWrapper>

                <FilterWrapper label="Віковий рейтинг">
                    <SelectField 
                        value={filters.AgeRatingValue} 
                        onChange={(v: string) => handleUpdate('AgeRatingValue', v)} 
                        options={ageRatings}
                        placeholder="Всі вікові категорії" 
                    />
                </FilterWrapper>

                <FilterWrapper label="К-сть стрічок">
                    <input 
                        type="number"
                        placeholder="За замовчуванням: 5"
                        value={filters.Amount ?? ''}
                        onChange={(e) => handleUpdate('Amount', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-600 no-spinner"
                    />
                </FilterWrapper>
            </div>

            <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
                <button
                    onClick={onSearch}
                    disabled={isLoading}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ReportIcon />
                    Сформувати звіт
                </button>
            </div>
        </div>
    );
};

export default PopularMoviesFilters;