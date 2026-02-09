import React from 'react';
import { HALL_FORMAT_MAP } from '@/utils/formatters.ts';

interface HallFormatSelectorProps {
	selectedFormatId: number;
	onSelect: (id: number) => void;
}

const HallFormatSelector: React.FC<HallFormatSelectorProps> = ({ selectedFormatId, onSelect }) => {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-blue-200 text-sm font-bold uppercase tracking-wider">Формат залу</label>
			<div className="grid grid-cols-4 gap-2">
				{Object.entries(HALL_FORMAT_MAP).map(([key, value]) => (
					<button
						key={key}
						type="button"
						onClick={() => onSelect(value.id)}
						className={`py-2 rounded-lg font-bold text-xs transition-all ${
							selectedFormatId === value.id
								? 'bg-[#0041C4] text-white shadow-lg shadow-blue-500/30 border-2 border-blue-300'
								: 'bg-blue-900/40 text-blue-300 border border-blue-400/10 hover:bg-blue-800'
						}`}
					>
						{value.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default HallFormatSelector;