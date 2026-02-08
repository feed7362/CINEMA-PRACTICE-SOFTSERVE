import React from 'react';

interface SeatTooltipProps {
    row: number;
    seat: number;
    purchaseCount: number;
}

export const SeatTooltip: React.FC<SeatTooltipProps> = ({ row, seat, purchaseCount }) => (
    <div className="absolute bottom-full mb-2 z-20 bg-[#0F172A] text-white text-xs py-2 px-3 rounded-lg shadow-xl border border-blue-500/30 whitespace-nowrap flex flex-col items-center gap-1 pointer-events-none animate-in fade-in zoom-in duration-200">
        <span className="font-bold text-blue-300">
            Ряд {row}, Місце {seat}
        </span>
        <span className="flex items-center gap-1">
            Продажів: <span className="font-bold text-white">{purchaseCount}</span>
        </span>
        <div className="absolute -bottom-1 w-2 h-2 bg-[#0F172A] border-r border-b border-blue-500/30 rotate-45"></div>
    </div>
);