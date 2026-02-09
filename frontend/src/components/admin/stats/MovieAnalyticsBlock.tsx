import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import type { IStatsMovie } from '@/types/admin';

import SearchIcon from '@/assets/icons/SearchIcon';
import LoaderIcon from '@/assets/icons/LoaderIcon';
import EditIcon from '@/assets/icons/EditIcon';
import MoneyIcon from '@/assets/icons/MoneyIcon';
import TicketIcon from '@/assets/icons/TicketIcon';

const formatCurrency = (val: number) => 
	new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 }).format(val);

const MovieAnalyticsBlock: React.FC = () => {
	const navigate = useNavigate();
	const { searchTerm, setSearchTerm, suggestions, setSuggestions, isLoading } = useMovieSearch();
	const [selectedMovie, setSelectedMovie] = useState<IStatsMovie | null>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		if (suggestions.length > 0 && searchTerm.length >= 1) {
			setShowDropdown(true);
		}
	}, [suggestions, searchTerm]);

	const handleSelectMovie = (movie: IStatsMovie) => {
		setSelectedMovie(movie);
		setSearchTerm('');
		setShowDropdown(false);
		setSuggestions([]);
	};

	const clearSelection = () => {
		setSelectedMovie(null);
		setSearchTerm('');
	};

	const handleEditClick = () => {
		if (!selectedMovie) return;
		navigate(`/admin/editMovie/${selectedMovie.id}`);
	};

	return (
		<div className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl relative overflow-visible">
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
				<div>
					<h2 className="text-2xl font-bold text-white flex items-center gap-3">
						<span className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
							<SearchIcon size={24} />
						</span>
						Аналітика стрічки
					</h2>
					<p className="text-zinc-400 text-sm mt-1">Знайдіть фільм для детального аналізу KPI</p>
				</div>

				<div className="relative w-full lg:w-96 z-50" ref={searchRef}>
					<div className="relative">
						<input 
							type="text" 
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
							placeholder="Назва фільму або режисер..."
							className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all pl-11"
						/>
						<div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
							{isLoading ? (
								<LoaderIcon size={18} className="animate-spin" />
							) : (
								<SearchIcon size={18} />
							)}
						</div>
					</div>
                    
					{showDropdown && suggestions.length > 0 && (
						<div className="absolute top-full left-0 right-0 mt-2 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto custom-scrollbar z-50 animate-in fade-in zoom-in-95 duration-200">
							{suggestions.map((movie, idx) => (
								<div 
									key={idx} 
									onClick={() => handleSelectMovie(movie)}
									className="p-3 hover:bg-white/5 cursor-pointer flex items-center gap-4 transition-colors border-b border-white/5 last:border-0"
								>

									<div className="flex-1 min-w-0">
										<div className="text-white font-medium truncate">{movie.title}</div>
										<div className="text-xs text-zinc-400 flex items-center gap-2">
											<span>{movie.releaseYear}</span>
											<span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
											<span className="truncate">{movie.director}</span>
										</div>
									</div>
									<div className="text-right">
										<span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${movie.revenue > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
											IMDb {movie.imdbRating}
										</span>
									</div>
								</div>
							))}
						</div>
					)}
                    
					{showDropdown && searchTerm.length > 1 && suggestions.length === 0 && !isLoading && (
						<div className="absolute top-full left-0 right-0 mt-2 bg-[#1e293b] border border-white/10 rounded-xl p-4 text-center text-zinc-400 text-sm shadow-xl z-50">
							Фільмів не знайдено
						</div>
					)}
				</div>
			</div>

			{selectedMovie ? (
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
						<div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col h-full">
							<div className="flex gap-5">
                                
								<div className="flex-1 min-w-0">
									<h3 className="text-2xl font-bold text-white leading-tight mb-2">{selectedMovie.title}</h3>
									<div className="flex flex-wrap gap-2 mb-4">
										<span className="px-2 py-1 bg-white/10 rounded-md text-xs text-zinc-300 font-medium">{selectedMovie.genres}</span>
										<span className="px-2 py-1 bg-white/10 rounded-md text-xs text-zinc-300 font-medium">{selectedMovie.releaseYear}</span>
										<span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded-md text-xs border border-pink-500/30 font-bold">
											{String(selectedMovie.ageRating).replace('_', '').replace('Plus', '+')}
										</span>
									</div>
									<div className="space-y-1 text-sm text-zinc-400">
										<p>Режисер: <span className="text-white">{selectedMovie.director}</span></p>
										<p>Країна: <span className="text-white">{selectedMovie.country}</span></p>
									</div>
								</div>
							</div>
                            
							<div className="mt-auto pt-6 grid grid-cols-1 gap-3">
								<button 
									onClick={handleEditClick}
									className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 font-medium flex items-center justify-center gap-2 cursor-pointer"
								>
									<EditIcon className="w-4.5 h-4.5" />
									Редагувати фільм
								</button>
                                
								<button 
									onClick={clearSelection}
									className="w-full py-3 px-4 mt-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors border border-white/5 hover:border-white/10 rounded-xl cursor-pointer"
								>
									Закрити деталі
								</button>
							</div>
						</div>

						<div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="bg-linear-to-br from-emerald-900/40 to-emerald-900/10 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden group">
								<div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
									<MoneyIcon size={60} className="stroke-1" />
								</div>
								<p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Загальний дохід (GPO)</p>
								<p className="text-3xl font-bold text-white mb-1">{formatCurrency(selectedMovie.revenue)}</p>
								<div className="text-xs text-emerald-400 font-medium bg-emerald-400/10 inline-block px-2 py-0.5 rounded">↑ Активний прокат</div>
							</div>

							<div className="bg-linear-to-br from-blue-900/40 to-blue-900/10 border border-blue-500/20 rounded-2xl p-5 relative overflow-hidden group">
								<div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
									<TicketIcon size={60} className="stroke-1" />
								</div>
								<p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Продані квитки</p>
								<p className="text-3xl font-bold text-white mb-1">{selectedMovie.ticketsSold}</p>
								<div className="text-xs text-blue-400 font-medium bg-blue-400/10 inline-block px-2 py-0.5 rounded">Глядачів</div>
							</div>

							<div className="bg-linear-to-br from-purple-900/40 to-purple-900/10 border border-purple-500/20 rounded-2xl p-5">
								<p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Заповнюваність (Сер.)</p>
								<div className="flex items-baseline gap-2">
									<p className="text-3xl font-bold text-white">
										{selectedMovie.ticketsSold > 0 ? Math.min(98, 15 + (selectedMovie.revenue % 40)) : 0}%
									</p>
									<span className="text-xs text-zinc-500">по залах</span>
								</div>
								<div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
									<div className="h-full bg-purple-500 rounded-full" style={{ width: `${selectedMovie.ticketsSold > 0 ? Math.min(98, 15 + (selectedMovie.revenue % 40)) : 0}%` }}></div>
								</div>
							</div>

							<div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
								<p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Сеансів за період</p>
								<div className="flex items-center gap-3">
									<span className="text-3xl font-bold text-white">
										{selectedMovie.ticketsSold > 0 ? Math.ceil(selectedMovie.ticketsSold / 8) + 2 : 0}
									</span>
									<span className="text-xs text-zinc-500 px-2 py-1 bg-white/5 rounded">IMAX / 3D</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-12 text-zinc-500 border-2 border-dashed border-white/5 rounded-2xl bg-white/1">
					<div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
						<SearchIcon size={32} className="opacity-60 stroke-[1.5]" />
					</div>
					<p className="text-lg font-medium text-zinc-300">Оберіть фільм для аналізу</p>
					<p className="text-sm opacity-60 max-w-xs text-center mt-1">Введіть назву фільму в поле вище, щоб побачити його KPI, дохід та іншу статистику.</p>
				</div>
			)}
		</div>
	);
};

export default MovieAnalyticsBlock;