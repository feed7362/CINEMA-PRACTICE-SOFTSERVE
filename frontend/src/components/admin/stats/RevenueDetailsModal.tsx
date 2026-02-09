import React from 'react';
import type { IStatsMovie } from '@/types/admin';

interface RevenueDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	movies: IStatsMovie[];
	isLoading: boolean;
	dateRange: { from: string; to: string };
}

const RevenueDetailsModal: React.FC<RevenueDetailsModalProps> = ({ 
	isOpen, onClose, movies, isLoading, dateRange, 
}) => {
	if (!isOpen) return null;

	const formatCurrency = (val: number) => 
		new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 }).format(val);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
			<div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl shadow-blue-900/20">
                
				<div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#002D6E]/20 rounded-t-2xl">
					<div>
						<h2 className="text-xl font-bold text-white">Деталізація доходу</h2>
						<p className="text-sm text-zinc-400 mt-1">
							Період: {dateRange.from} — {dateRange.to}
						</p>
					</div>
					<button 
						onClick={onClose}
						className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
					</button>
				</div>

				<div className="overflow-y-auto p-0 custom-scrollbar">
					<table className="w-full text-left border-collapse">
						<thead className="bg-white/5 sticky top-0 backdrop-blur-md">
							<tr>
								<th className="p-4 text-xs uppercase text-zinc-400 font-semibold border-b border-white/10">Назва фільму</th>
								<th className="p-4 text-xs uppercase text-zinc-400 font-semibold border-b border-white/10 text-right">Рік</th>
								<th className="p-4 text-xs uppercase text-zinc-400 font-semibold border-b border-white/10 text-right">Квитків</th>
								<th className="p-4 text-xs uppercase text-zinc-400 font-semibold border-b border-white/10 text-right">Дохід</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/5">
							{isLoading ? (
								<tr>
									<td colSpan={4} className="p-8 text-center text-zinc-400">Завантаження даних...</td>
								</tr>
							) : movies.length === 0 ? (
								<tr>
									<td colSpan={4} className="p-8 text-center text-zinc-400">Даних не знайдено</td>
								</tr>
							) : (
								movies.map((movie, idx) => (
									<tr key={idx} className="hover:bg-white/5 transition-colors">
										<td className="p-4 text-white font-medium">{movie.title}</td>
										<td className="p-4 text-right text-zinc-400">{movie.releaseYear}</td>
										<td className="p-4 text-right text-blue-300 font-mono">{movie.ticketsSold}</td>
										<td className={`p-4 text-right font-bold font-mono ${movie.revenue > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}>
											{formatCurrency(movie.revenue)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className="p-4 border-t border-white/10 bg-[#002D6E]/10 rounded-b-2xl text-right">
					<button 
						onClick={onClose}
						className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
					>
						Закрити
					</button>
				</div>
			</div>
		</div>
	);
};

export default RevenueDetailsModal;