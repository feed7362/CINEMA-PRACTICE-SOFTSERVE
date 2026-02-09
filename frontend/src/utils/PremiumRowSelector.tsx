import React from 'react';

interface PremiumRowSelectorProps {
    rowCount: number;
    premiumRows: number[];
    onToggleRow: (row: number) => void;
    standardCount: number;
    premiumCount: number;
}

const PremiumRowSelector: React.FC<PremiumRowSelectorProps> = ({ 
    rowCount, 
    premiumRows, 
    onToggleRow, 
    standardCount, 
    premiumCount 
}) => {
    return (
        <div className="p-4 bg-blue-950/40 rounded-lg border border-blue-400/10">
            <label className="block text-blue-200 text-sm font-bold mb-3">
                Клікніть на ряд, щоб зробити його Premium (VIP)
            </label>

            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {rowCount > 0 ? (
                    Array.from({ length: rowCount }, (_, i) => i + 1).map((rowNum) => {
                        const isPremium = premiumRows.includes(rowNum);
                        return (
                            <div
                                key={rowNum}
                                onClick={() => onToggleRow(rowNum)}
                                className={`w-full py-2 px-4 rounded cursor-pointer transition-all flex justify-between items-center select-none border ${
                                    isPremium
                                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40 border-purple-400/50'
                                        : 'bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border-blue-400/10'
                                }`}
                            >
                                <span className="font-medium text-sm">Ряд {rowNum}</span>
                                <span className="text-[10px] uppercase font-black tracking-widest">
                                    {isPremium ? '★ VIP' : 'Regular'}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-blue-300/40 py-4 italic text-sm">
                        Вкажіть кількість рядів
                    </div>
                )}
            </div>

            <div className="text-[11px] text-blue-200 mt-4 flex justify-between border-t border-white/10 pt-3">
                <span>Standard: <strong className="text-white">{standardCount}</strong></span>
                <span className="text-purple-300 font-bold uppercase">Premium: {premiumCount}</span>
            </div>
        </div>
    );
};

export default PremiumRowSelector;