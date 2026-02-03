import React, {useState, useRef, useEffect, useMemo} from 'react';
import {ChevronDown} from 'lucide-react';
import {useClickOutside} from '@/hooks/useClickOutside';

interface DateOption {
    fullDate: Date;
    formatted: string;
    dayName: string;
}
    
interface DateSelectorProps {
    activeDate: string;
    onDateSelect: (date: Date) => void;
}

const generateDates = (daysCount: number = 14): DateOption[] => {
    return Array.from({length: daysCount}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        date.setHours(0, 0, 0, 0);

        return {
            fullDate: date,
            formatted: date.toLocaleDateString('uk-UA', {day: '2-digit', month: '2-digit'}),
            dayName: i === 0 ? 'Сьогодні' : i === 1 ? 'Завтра' : date.toLocaleDateString('uk-UA', {weekday: 'long'})
        };
    });
};

const DateSelector: React.FC<DateSelectorProps> = ({activeDate, onDateSelect}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const dates = useMemo(() => generateDates(), []);

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

    const isSameDay = (dateOption: DateOption) => {
        if (!activeDate) return false;
        const active = new Date(activeDate);
        return (
            active.getDate() === dateOption.fullDate.getDate() &&
            active.getMonth() === dateOption.fullDate.getMonth() &&
            active.getFullYear() === dateOption.fullDate.getFullYear()
        );
    };

    useEffect(() => {
        if (!activeDate && dates.length > 0) {
            onDateSelect(dates[0].fullDate);
        }
    }, []);

    const handleSelect = (date: Date) => {
        onDateSelect(date);
        setIsDropdownOpen(false);
    };

    const todayOption = dates[0];
    const tomorrowOption = dates[1];

    const isTodayActive = isSameDay(todayOption);
    const isTomorrowActive = isSameDay(tomorrowOption);
    const isCustomDate = !isTodayActive && !isTomorrowActive;

    const activeDateLabel = dates.find(d => isSameDay(d))?.formatted || activeDate;

    const getButtonClass = (isActive: boolean) =>
        `px-8 py-3 rounded-2xl text-lg font-medium transition-all duration-300 ${
            isActive
                ? 'bg-[#0753E0] text-white shadow-[0_0_20px_rgba(7,83,224,0.4)]'
                : 'bg-[#1e293b] text-white/70 hover:bg-[#334155]'
        }`;

    return (
        <div className="flex justify-center gap-4 mb-20 flex-wrap relative z-20">

            <button
                onClick={() => handleSelect(todayOption.fullDate)}
                className={getButtonClass(isTodayActive)}
            >
                Сьогодні {todayOption.formatted}
            </button>

            <button
                onClick={() => handleSelect(tomorrowOption.fullDate)}
                className={getButtonClass(isTomorrowActive)}
            >
                Завтра {tomorrowOption.formatted}
            </button>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${getButtonClass(isCustomDate)} flex items-center gap-2`}
                >
                    {isCustomDate ? `Обрано: ${activeDateLabel}` : 'Обрати дату'}
                    <ChevronDown size={20}
                                 className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isDropdownOpen && (
                    <div
                        className="absolute top-full mt-2 right-0 w-64 bg-[#1e293b] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                            {dates.map((dateOption) => {
                                const isActive = isSameDay(dateOption);
                                return (
                                    <button
                                        key={dateOption.formatted}
                                        onClick={() => handleSelect(dateOption.fullDate)}
                                        className={`w-full text-left px-6 py-3 hover:bg-[#0753E0] hover:text-white transition-colors flex justify-between items-center ${
                                            isActive ? 'bg-[#0753E0] text-white' : 'text-white/80'
                                        }`}
                                    >
                                        <span className="capitalize">{dateOption.dayName}</span>
                                        <span className="font-mono">{dateOption.formatted}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateSelector;