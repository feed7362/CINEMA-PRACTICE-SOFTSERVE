import { useState, useEffect } from 'react';
import { getFormatId } from "@/utils/formatters.ts";
import type { HallModalProps } from '@/types/hall';

export const useHallForm = ({ isOpen, initialData, onSave, onClose }: HallModalProps) => {
    const [name, setName] = useState('');
    const [formatId, setFormatId] = useState(0);
    const [rows, setRows] = useState(10);
    const [seats, setSeats] = useState(12);
    const [premiumRows, setPremiumRows] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setName(initialData.name || '');
                setFormatId(getFormatId(initialData.format));

                const map = initialData.seatMap || [];
                const hasMapData = map.length > 0;

                const calculatedRows = hasMapData ? map.length : 10;
                const calculatedSeats = hasMapData && map[0] ? map[0].length : 12;

                setRows(calculatedRows);
                setSeats(calculatedSeats);

                const pRows = map
                    .map((row, i) => (row.toLowerCase().includes('v') ? i + 1 : null))
                    .filter((n): n is number => n !== null);
                
                setPremiumRows(pRows);
            } else {
                setName('');
                setFormatId(0);
                setRows(10);
                setSeats(12);
                setPremiumRows([]);
            }
        }
    }, [isOpen, initialData]);

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

    const handleRowsChange = (val: number) => {
        const newRows = Math.max(0, val);
        setRows(newRows);
        setPremiumRows(prev => prev.filter(r => r <= newRows));
    };

    const totalSeats = rows * seats;
    const premiumSeatsCount = premiumRows.length * seats;
    const standardSeatsCount = totalSeats - premiumSeatsCount;

    return {
        formState: { name, formatId, rows, seats, premiumRows },
        setters: { setName, setFormatId, setSeats, handleRowsChange },
        actions: { handleSubmit, toggleRow },
        stats: { standardSeatsCount, premiumSeatsCount }
    };
};