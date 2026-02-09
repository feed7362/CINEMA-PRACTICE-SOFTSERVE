import React from 'react';
import type { ReadSessionDto } from '@/api/sessionApi';
import LoaderIcon from '@/assets/icons/LoaderIcon';

interface Props {
    sessions: ReadSessionDto[];
    isLoading: boolean;
}

const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
        date: date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        time: date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
    };
};

export const SessionList: React.FC<Props> = ({ sessions, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center py-10 text-zinc-500">
                <LoaderIcon size={32} className="animate-spin text-indigo-500" />
            </div>
        );
    }

    if (sessions.length === 0) {
        return (
            <div className="text-center py-10 text-zinc-500 border-2 border-dashed border-white/5 rounded-xl mx-6 mt-6">
                <p>Сеансів для цього фільму у цей період не знайдено</p>
                <p className="text-xs mt-2 text-zinc-600">Спробуйте змінити дати фільтрації</p>
            </div>
        );
    }

    return (
        <div className="overflow-y-auto p-6 custom-scrollbar grow space-y-3">
            {sessions.map(session => {
                const { date, time } = formatDateTime(session.startTime);
                const endTime = formatDateTime(session.endTime).time;

                return (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-500/20 text-indigo-300 p-2.5 rounded-lg font-bold min-w-20 text-center border border-indigo-500/10">
                                {time}
                            </div>
                            <div>
                                <div className="text-white font-medium flex items-center gap-2">
                                    {date}
                                    <span className="text-xs text-zinc-500">({time} - {endTime})</span>
                                </div>
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <span>{session.hallName}</span>
                                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                    <span className="text-zinc-500 uppercase text-xs border border-zinc-700 px-1 rounded">
                                        {session.hallFormat}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                                Активний
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};