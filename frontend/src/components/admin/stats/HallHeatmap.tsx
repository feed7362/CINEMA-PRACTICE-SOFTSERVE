import React, { useState } from 'react';
import { useHallHeatmap } from '@/hooks/useHallHeatmap';
import { getSeatColorClass } from '@/utils/heatmapUtils';
import { HeatmapLegend } from '@/components/heatmap/HeatmapLegend';
import { SeatTooltip } from '@/components/heatmap/SeatTooltip';

const HallHeatmap: React.FC = () => {
	const { 
		halls, selectedHallId, setSelectedHallId, 
		isLoading, gridMap, getSeatStats, 
	} = useHallHeatmap();

	const [hoveredSeat, setHoveredSeat] = useState<{ r: number, c: number } | null>(null);

	return (
		<div className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
				<h2 className="text-2xl font-bold text-white flex items-center gap-3">
					<span className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M10 12h4"/><rect x="2" y="6" width="20" height="6" rx="2"/></svg>
					</span>
					Теплова карта залу
				</h2>

				<div className="w-full md:w-64 relative">
					<select
						value={selectedHallId}
						onChange={(e) => setSelectedHallId(e.target.value)}
						className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-orange-500 outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
					>
						{halls.map((hall) => (
							<option key={hall.id} value={hall.id} className="bg-[#1e293b] text-white">
								{hall.name}
							</option>
						))}
					</select>
					<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
					</div>
				</div>
			</div>

			<div className="bg-black/20 border border-white/5 rounded-2xl p-8 overflow-x-auto custom-scrollbar flex flex-col items-center">
				<div className="w-2/3 h-2 bg-linear-to-r from-transparent via-blue-500 to-transparent rounded-full mb-14 shadow-[0_0_25px_#3b82f6] relative shrink-0">
					<div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-bold">
						Екран
					</div>
				</div>

				{isLoading ? (
					<div className="flex flex-col items-center gap-4 text-zinc-500 py-10">
						<svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<span>Завантаження даних...</span>
					</div>
				) : (
					<div className="flex flex-col gap-3 mb-4">
						{gridMap.map((rowString, rowIndex) => (
							<div key={rowIndex} className="flex items-center gap-4 justify-center">
								<div className="w-6 text-right font-bold text-zinc-500 text-xs">{rowIndex + 1}</div>

								<div className="flex gap-2">
									{rowString.split('').map((_: string, colIndex: number) => {
										const { exists, purchaseCount, color } = getSeatStats(rowIndex, colIndex);
										const isHovered = hoveredSeat?.r === rowIndex && hoveredSeat?.c === colIndex;

										if (!exists) return <div key={colIndex} className="w-10 h-10" />;

										return (
											<div
												key={colIndex}
												className="relative flex justify-center"
												onMouseEnter={() => setHoveredSeat({ r: rowIndex, c: colIndex })}
												onMouseLeave={() => setHoveredSeat(null)}
											>
												{isHovered && (
													<SeatTooltip 
														row={rowIndex + 1} 
														seat={colIndex + 1} 
														purchaseCount={purchaseCount} 
													/>
												)}

												<div className={`
                                                    w-10 h-10 rounded-md transition-all duration-200 shadow-md border
                                                    flex items-center justify-center text-[10px] font-bold select-none
                                                    ${getSeatColorClass(color)}
                                                    ${isHovered ? 'scale-110 z-10 brightness-110' : ''}
                                                `}>
													{colIndex + 1}
												</div>
											</div>
										);
									})}
								</div>
								<div className="w-6 text-left font-bold text-zinc-500 text-xs">{rowIndex + 1}</div>
							</div>
						))}
					</div>
				)}
			</div>

			<HeatmapLegend />
		</div>
	);
};

export default HallHeatmap;