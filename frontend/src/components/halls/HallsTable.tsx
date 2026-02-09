import React from 'react';
import { type Hall } from '@/types/hall.ts';
import { formatHallFormat } from '@/utils/formatters.ts';

interface HallsTableProps {
	halls: Hall[];
	onEdit: (hall: Hall) => void;
	onDelete: (id: number) => void;
}

const HallsTable: React.FC<HallsTableProps> = ({ halls, onEdit, onDelete }) => {
	return (
		<div
			className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
			<div className="grid grid-cols-[2fr_1fr_1.5fr] bg-[#0284c7] text-white font-bold py-4 px-6">
				<div>Назва</div>
				<div>Місткість</div>
				<div className="text-right pr-10">Налаштування</div>
			</div>

			<div className="flex flex-col">
				{halls.map((hall) => {
					const hasMap = Array.isArray(hall.seatMap) && hall.seatMap.length > 0;

					const rowCount = hasMap ? hall.seatMap!.length : 0;
					const seatsPerRow = hasMap ? hall.seatMap![0].length : 0;
					const displayCapacity = hasMap ? (rowCount * seatsPerRow) : (hall.capacity || 0);

					const premiumRows = hasMap
						? hall.seatMap!
							.map((row, i) => (row.includes('v') ? i + 1 : null))
							.filter((n): n is number => n !== null)
						: [];

					return (
						<div
							key={hall.id}
							className="grid grid-cols-[2fr_1fr_1.5fr] items-center py-4 px-6 border-b border-blue-400/10 hover:bg-white/5 transition-colors"
						>
							<div className="font-medium text-lg text-white">
								{hall.name}
								<span
									className="ml-3 text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded uppercase tracking-wider">
									{formatHallFormat(hall.format)}
								</span>
							</div>

							<div className="text-blue-200 flex flex-col justify-center">
								<div className="flex items-baseline gap-2">
									<span className="text-white font-semibold">{displayCapacity} місць</span>
									{hasMap && (
										<span className="text-xs text-gray-400">
											({rowCount}р × {seatsPerRow}м)
										</span>
									)}
								</div>

								{premiumRows.length > 0 && (
									<div className="mt-1">
										<span
											className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
											★ VIP РЯДИ: {premiumRows.join(', ')}
										</span>
									</div>
								)}
							</div>

							<div className="flex items-center justify-end gap-3">
								<button
									onClick={() => onEdit(hall)}
									className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/40 active:scale-95"
								>
									Редагувати
								</button>

								<button
									onClick={() => onDelete(hall.id)}
									className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-lg transition-all active:scale-95 group"
									title="Видалити зал"
								>
									<svg className="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor"
										viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"/>
									</svg>
								</button>
							</div>
						</div>
					);
				})}

				{halls.length === 0 && (
					<div className="py-20 text-center text-blue-300/50 italic">
						Список залів порожній. Створіть перший зал.
					</div>
				)}
			</div>
		</div>
	);
};

export default HallsTable;