import React, {useState, useEffect} from 'react';
import {type Hall} from '@/types/hall.ts';
import AdminInput from '../admin/AdminInput';
import {getFormatId, HALL_FORMAT_MAP} from "@/utils/formatters.ts";

interface HallModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, rows: number, seatsPerRow: number, premiumRows: number[], formatId: number) => void;
    initialData: Hall | null;
}

const HallModal: React.FC<HallModalProps> = ({isOpen, onClose, onSave, initialData}) => {
    const [name, setName] = useState('');
    const [formatId, setFormatId] = useState(0);
    const [rows, setRows] = useState(0);
    const [seats, setSeats] = useState(0);
    const [premiumRows, setPremiumRows] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen && initialData) {
            const hasMap = Array.isArray(initialData.seatMap) && initialData.seatMap.length > 0;
            const rowsCount = hasMap ? initialData.seatMap.length : 0;
            const seatsCount = hasMap ? initialData.seatMap[0].length : 0;

            const pRows = hasMap
                ? initialData.seatMap
                    .map((row, i) => (row.toLowerCase().includes('v') ? i + 1 : null))
                    .filter((n): n is number => n !== null)
                : [];

            setName(initialData.name || '');
            setRows(rowsCount);
            setSeats(seatsCount);
            setPremiumRows(pRows);
            setFormatId(getFormatId(initialData.format));
        } else {
            setName('');
            setRows(0);
            setSeats(0);
            setPremiumRows([]);
            setFormatId(0);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name, rows, seats, premiumRows, formatId);
        onClose();
    };

    const toggleRow = (rowNumber: number) => {
        if (premiumRows.includes(rowNumber)) {
            setPremiumRows(premiumRows.filter(r => r !== rowNumber));
        } else {
            setPremiumRows([...premiumRows, rowNumber]);
        }
    };

    const totalSeats = rows * seats;
    const premiumSeatsCount = premiumRows.length * seats;
    const standardSeatsCount = totalSeats - premiumSeatsCount;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
                className="bg-[#002D6E] border border-blue-400/30 rounded-xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {initialData ? 'Редагувати зал' : 'Новий зал'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-200 text-sm font-bold uppercase tracking-wider">Формат залу</label>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.entries(HALL_FORMAT_MAP).map(([key, value]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setFormatId(value.id)}
                                    className={`py-2 rounded-lg font-bold text-xs transition-all ${
                                        formatId === value.id
                                            ? 'bg-[#0041C4] text-white shadow-lg shadow-blue-500/30 border-2 border-blue-300'
                                            : 'bg-blue-900/40 text-blue-300 border border-blue-400/10 hover:bg-blue-800'
                                    }`}
                                >
                                    {value.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AdminInput
                        id="hall-name"
                        label="Назва залу"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <AdminInput
                            id="hall-rows"
                            label="Всього рядів"
                            type="number"
                            value={rows}
                            onChange={(e) => {
                                const val = Math.max(0, Number(e.target.value));
                                setRows(val);
                                setPremiumRows(prev => prev.filter(r => r <= val));
                            }}
                        />
                        <AdminInput
                            id="hall-seats"
                            label="Місць у ряду"
                            type="number"
                            value={seats}
                            onChange={(e) => setSeats(Math.max(0, Number(e.target.value)))}
                        />
                    </div>

                    <div className="p-4 bg-blue-950/40 rounded-lg border border-blue-400/10">
                        <label className="block text-blue-200 text-sm font-bold mb-3">
                            Клікніть на ряд, щоб зробити його Premium (VIP)
                        </label>

                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {rows > 0 ? (
                                Array.from({length: rows}, (_, i) => i + 1).map((rowNum) => {
                                    const isPremium = premiumRows.includes(rowNum);
                                    return (
                                        <div
                                            key={rowNum}
                                            onClick={() => toggleRow(rowNum)}
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
                                <div className="text-center text-blue-300/40 py-4 italic text-sm">Вкажіть кількість
                                    рядів</div>
                            )}
                        </div>

                        <div
                            className="text-[11px] text-blue-200 mt-4 flex justify-between border-t border-white/10 pt-3">
                            <span>Standard: <strong className="text-white">{standardSeatsCount}</strong></span>
                            <span className="text-purple-300 font-bold uppercase">Premium: {premiumSeatsCount}</span>
                        </div>
                    </div>

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