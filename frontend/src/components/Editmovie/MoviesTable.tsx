import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { IMovieDetails } from '@/types/movie';
import EditIcon from '@/assets/icons/EditIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';

interface MoviesTableProps {
	movies: IMovieDetails[];
	onDelete: (id: number | string) => void;
}

const MoviesTable: React.FC<MoviesTableProps> = ({ movies, onDelete }) => {
	const navigate = useNavigate();

	const getMovieStatus = (releaseDate?: string, finishDate?: string) => {
		if (!releaseDate || !finishDate) return { label: 'Невідомо', style: 'bg-gray-500/10 text-gray-400 border-gray-500/20' };

		const now = new Date();
		const start = new Date(releaseDate);
		const end = new Date(finishDate);

		now.setHours(0, 0, 0, 0);
		start.setHours(0, 0, 0, 0);
		end.setHours(23, 59, 59, 999);

		if (now < start) {
			return { label: 'Скоро', style: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
		} else if (now >= start && now <= end) {
			return { label: 'В прокаті', style: 'bg-green-500/10 text-green-500 border-green-500/20' };
		} else {
			return { label: 'Архів', style: 'bg-red-500/10 text-red-400 border-red-500/20' };
		}
	};

	return (
		<div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#020617]/50 backdrop-blur-sm shadow-xl">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
						<th className="p-4 font-semibold">Постер</th>
						<th className="p-4 font-semibold">Назва</th>
						<th className="p-4 font-semibold">Статус</th>
						<th className="p-4 font-semibold text-right pr-6">Дії</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/5">
					{movies.map((movie: any) => {
						const status = getMovieStatus(movie.releaseDate, movie.finishDate);

						return (
							<tr key={movie.id} className="group hover:bg-white/5 transition-colors duration-200">
								<td className="p-4 w-20">
									<div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-800 shadow-md">
										<img 
											src={movie.imageUrl || movie.poster || ''} 
											alt={movie.titleUkr || movie.title} 
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x64?text=No+Img'} 
										/>
									</div>
								</td>

								<td className="p-4">
									<div className="font-bold text-white text-base">
										{movie.titleUkr || movie.title}
									</div>
									{(movie.titleOrg || movie.originalTitle) && (
										<div className="text-xs text-gray-500 mt-0.5">
											{movie.titleOrg || movie.originalTitle}
										</div>
									)}
								</td>

								<td className="p-4">
									<span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${status.style}`}>
										{status.label}
									</span>
								</td>

								<td className="p-4 text-right">
									<div className="flex items-center justify-end gap-2">
										<button 
											onClick={() => navigate(`/admin/editMovie/${movie.id}`)}
											className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
											title="Редагувати"
										>
											<EditIcon />
										</button>
                    
										<button 
											onClick={() => onDelete(movie.id)}
											className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
											title="Видалити"
										>
											<DeleteIcon />
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MoviesTable;