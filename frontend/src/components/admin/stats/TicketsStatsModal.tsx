import React, { useMemo } from 'react';
import type { ISoldTicket, IDiscountStats } from '@/types/admin';

interface TicketsStatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tickets: ISoldTicket[];
    discountsList?: IDiscountStats[];
    isLoading: boolean;
    dateRange: { from: string; to: string };
}

const TicketsStatsModal: React.FC<TicketsStatsModalProps> = ({
    isOpen, onClose, tickets, discountsList = [], isLoading, dateRange,
}) => {
    if (!isOpen) return null;
    const getFriendlyName = (code: string | null): string => {
        if (!code) return "Звичайний квиток";
        
        let clean = code.replace(/\d+$/, '');

        if (clean.length > 1) {
            clean = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
        }
        
        return clean;
    };

    const groupedStats = useMemo(() => {
        const stats: Record<string, number> = {};

        discountsList.forEach(d => {
            const rawCode = d.code || d.promotionName || ""; 
            const friendlyName = getFriendlyName(rawCode);
            stats[friendlyName] = 0;
        });

        stats["Звичайний квиток"] = 0;

        if (tickets && Array.isArray(tickets)) {
            tickets.forEach((ticket) => {
                const rawCode = (ticket.discountCode && String(ticket.discountCode).trim() !== '') 
                    ? String(ticket.discountCode) 
                    : null;

                const friendlyName = getFriendlyName(rawCode);

                stats[friendlyName] = (stats[friendlyName] || 0) + 1;
            });
        }
        return Object.entries(stats)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => {
                if (a.name === "Звичайний квиток") return -1;
                if (b.name === "Звичайний квиток") return 1;
                return b.count - a.count;
            });
    }, [tickets, discountsList]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0f172a] border border-blue-500/30 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl shadow-blue-900/20">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#002D6E]/20 rounded-t-2xl shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-white">Структура продажів</h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Період: {dateRange.from} — {dateRange.to}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* TABLE BODY */}
                <div className="overflow-y-auto custom-scrollbar p-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0f172a] border-b border-white/10 sticky top-0 z-10">
                            <tr>
                                <th className="p-5 text-sm uppercase text-zinc-400 font-semibold">Тип квитка / Акція</th>
                                <th className="p-5 text-sm uppercase text-zinc-400 font-semibold text-right">Кількість</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr><td colSpan={2} className="p-10 text-center text-zinc-400">Завантаження...</td></tr>
                            ) : (
                                groupedStats.map((item) => {
                                    const isRegular = item.name === "Звичайний квиток";
                                    const isZero = item.count === 0;
                                    
                                    return (
                                        <tr key={item.name} className="hover:bg-white/5 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${isRegular ? 'bg-white' : (isZero ? 'bg-zinc-700' : 'bg-emerald-500')}`} />
                                                    <span className={`font-medium ${isRegular ? 'text-white' : (isZero ? 'text-zinc-500' : 'text-emerald-400')}`}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={`p-5 text-right font-mono text-lg font-bold ${isZero ? 'text-zinc-600' : 'text-white'}`}>
                                                {item.count}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-white/10 bg-[#002D6E]/10 rounded-b-2xl shrink-0 flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Всього оброблено квитків:</span>
                    <span className="text-2xl font-bold text-white">{tickets.length}</span>
                </div>
            </div>
        </div>
    );
};

export default TicketsStatsModal;