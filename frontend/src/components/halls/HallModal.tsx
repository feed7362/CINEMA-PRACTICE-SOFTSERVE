import React from 'react';
import AdminInput from '../admin/AdminInput';
import type { HallModalProps } from '@/types/hall';
import { useHallForm } from '@/hooks/halls/useHallForm';
import HallFormatSelector from '@/utils/HallFormatSelector';
import PremiumRowSelector from '@/utils/PremiumRowSelector';

const HallModal: React.FC<HallModalProps> = (props) => {
	const { isOpen, onClose, initialData } = props;
	const { formState, setters, actions, stats } = useHallForm(props);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
			<div className="bg-[#002D6E] border border-blue-400/30 rounded-xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
				<h2 className="text-2xl font-bold text-white mb-6">
					{initialData ? 'Редагувати зал' : 'Новий зал'}
				</h2>

				<form onSubmit={actions.handleSubmit} className="flex flex-col gap-6">
                    
					<HallFormatSelector 
						selectedFormatId={formState.formatId} 
						onSelect={setters.setFormatId} 
					/>

					<AdminInput
						id="hall-name"
						label="Назва залу"
						type="text"
						value={formState.name}
						onChange={(e) => setters.setName(e.target.value)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<AdminInput
							id="hall-rows"
							label="Всього рядів"
							type="number"
							value={formState.rows}
							onChange={(e) => setters.handleRowsChange(Number(e.target.value))}
						/>
						<AdminInput
							id="hall-seats"
							label="Місць у ряду"
							type="number"
							value={formState.seats}
							onChange={(e) => setters.setSeats(Math.max(0, Number(e.target.value)))}
						/>
					</div>

					<PremiumRowSelector
						rowCount={formState.rows}
						premiumRows={formState.premiumRows}
						onToggleRow={actions.toggleRow}
						standardCount={stats.standardSeatsCount}
						premiumCount={stats.premiumSeatsCount}
					/>

					<div className="flex justify-end gap-3 mt-2 border-t border-blue-400/20 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-blue-200 hover:text-white transition-colors text-sm font-medium"
						>
							Скасувати
						</button>
						<button
							type="submit"
							className="px-8 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-bold shadow-lg shadow-blue-900/40 active:scale-95 transition-all"
						>
							Зберегти зміни
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default HallModal;