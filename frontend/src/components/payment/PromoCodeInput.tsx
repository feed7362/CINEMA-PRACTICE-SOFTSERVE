import React, { useState } from 'react';
import BaseButton from '@/components/ui/BaseButton';

interface PromoCodeInputProps {
	onApply: (code: string) => void;
	onRemove: () => void;
	appliedCode: string | null;
	error: string | null;
	isLoading?: boolean;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ 
	onApply, 
	onRemove, 
	appliedCode, 
	error,
	isLoading = false, 
}) => {
	const [code, setCode] = useState('');

	const handleApplyClick = () => {
		if (!code.trim()) return;
		onApply(code);
	};

	if (appliedCode) {
		return (
			<div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex justify-between items-center">
				<div>
					<p className="text-green-400 text-sm font-bold">Промокод застосовано!</p>
					<p className="text-white font-mono">{appliedCode}</p>
				</div>
				<button 
					onClick={() => {
						setCode(''); onRemove(); 
					}}
					className="text-zinc-400 hover:text-white text-sm underline"
				>
					Скасувати
				</button>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<div className="flex gap-2">
				<input
					type="text"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder="Введіть промокод (напр. STUDENT)"
					className={`flex-1 bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#0753E0] transition-colors`}
					disabled={isLoading}
				/>
				<BaseButton 
					onClick={handleApplyClick} 
					className="px-6 py-3 rounded-xl"
					disabled={!code || isLoading}
				>
					{isLoading ? '...' : 'ОК'}
				</BaseButton>
			</div>
			{error && <p className="text-red-400 text-sm pl-1">{error}</p>}
		</div>
	);
};

export default PromoCodeInput;