import React, { useState } from 'react';

interface SeatData {
	row: number;
	col: number;
	price: number;
	type: 'standard' | 'premium';
}

interface SeatGridProps {
	rows: number;
	cols: number;
	selectedSeats: SeatData[];
	occupiedSeats: { row: number; col: number }[];
	onToggleSeat: (r: number, c: number, type: 'standard' | 'premium', price: number) => void;
	getSeatInfo: (r: number, c: number) => { price: number; type: 'standard' | 'premium' };
}

const SeatGrid: React.FC<SeatGridProps> = ({ 
	rows, 
	cols, 
	selectedSeats, 
	occupiedSeats, 
	onToggleSeat,
	getSeatInfo, 
}) => {
  
	const [hoveredSeat, setHoveredSeat] = useState<{ r: number, c: number } | null>(null);

	const isOccupied = (r: number, c: number) => occupiedSeats.some((s) => s.row === r && s.col === c);
	const isSelected = (r: number, c: number) => selectedSeats.some((s) => s.row === r && s.col === c);

	return (
		<div className="flex flex-col items-center">

			<div className="w-2/3 h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-14 shadow-[0_0_25px_#3b82f6]"></div>

			<div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
				{Array.from({ length: rows }).map((_, rowIndex) => (
					Array.from({ length: cols }).map((_, colIndex) => {
						const occupied = isOccupied(rowIndex, colIndex);
						const selected = isSelected(rowIndex, colIndex);

						const { price, type } = getSeatInfo(rowIndex, colIndex);

						const isHovered = hoveredSeat?.r === rowIndex && hoveredSeat?.c === colIndex;

						return (
							<div
								key={`${rowIndex}-${colIndex}`}
								className="relative flex justify-center" 
								onMouseEnter={() => setHoveredSeat({ r: rowIndex, c: colIndex })}
								onMouseLeave={() => setHoveredSeat(null)}
							>
								{isHovered && !occupied && (
									<div className="absolute bottom-full mb-2 z-20 bg-[#0F172A] text-white text-xs py-2 px-3 rounded-lg shadow-xl border border-blue-500/30 whitespace-nowrap flex flex-col items-center gap-1 pointer-events-none animate-in fade-in zoom-in duration-200">
										<span className="font-bold text-blue-300">
											{type === 'premium' ? '👑 Premium' : 'Standard'}
										</span>
										<span>Ряд {rowIndex + 1}, Місце {colIndex + 1}</span>
										<span className="font-bold">{price} грн</span>

										<div className="absolute -bottom-1 w-2 h-2 bg-[#0F172A] border-r border-b border-blue-500/30 rotate-45"></div>
									</div>
								)}

								<div
									onClick={() => onToggleSeat(rowIndex, colIndex, type, price)}
									className={`
                    /* Змінив розмір на більший (w-10 h-10) */
                    w-10 h-10 rounded-md cursor-pointer transition-all duration-200 shadow-md border
                    
                    ${occupied 
								? 'bg-gray-700 border-transparent cursor-not-allowed opacity-30' 
								: selected 
									? 'bg-[#42A5F6] border-[#42A5F6] scale-110 shadow-[0_0_15px_#42A5F6]'
									: type === 'premium'
										? 'bg-purple-900/40 border-purple-500/50 hover:bg-[#42A5F6] hover:border-[#42A5F6] hover:scale-110'
										: 'bg-white border-white hover:bg-[#42A5F6] hover:border-[#42A5F6] hover:scale-110' 
							}
                  `}
								/>
							</div>
						);
					})
				))}
			</div>

			<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-4">
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 bg-white rounded-md border border-white"></div> Стандарт
				</div>
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 bg-purple-900/40 rounded-md border border-purple-500/50"></div> Premium
				</div>
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 bg-[#42A5F6] rounded-md shadow-[0_0_10px_#42A5F6]"></div> Обране
				</div>
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 bg-gray-700 rounded-md opacity-50"></div> Зайняте
				</div>
			</div>
		</div>
	);
};

export default SeatGrid;