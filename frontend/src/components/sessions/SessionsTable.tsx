import React from 'react';
import {type Session} from '@/types/session';

interface SessionsTableProps {
    sessions: Session[];
    onEdit: (session: Session) => void;
    onDelete: (id: number) => void;
    getMovieName: (id: number) => string;
    getHallName: (id: number) => string;
}

const SessionsTable: React.FC<SessionsTableProps> = ({sessions, onEdit, onDelete, getMovieName, getHallName}) => {

    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        return {
            time: date.toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'}),
            date: date.toLocaleDateString('uk-UA', {day: '2-digit', month: '2-digit', year: 'numeric'})
        };
    };

    return (
        <div
            className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
            <div
                className="grid grid-cols-[1.5fr_1.5fr_0.8fr_1fr_1.2fr] bg-[#0284c7] text-white font-bold py-4 px-6 text-center md:text-left">
                <div>Фільм</div>
                <div>Назва Зала</div>
                <div>Час</div>
                <div>Дата</div>
                <div className="text-right pr-10">Дії</div>
            </div>

            <div className="flex flex-col">
                {sessions.map((session) => {
                    const {time, date} = formatDateTime(session.startTime);

                    return (
                        <div key={session.id}
                             className="grid grid-cols-[1.5fr_1.5fr_0.8fr_1fr_1.2fr] items-center py-4 px-6 border-b border-blue-400/10 hover:bg-white/5 transition-colors">

                            <div className="font-medium text-lg text-white truncate pr-4">
                                {getMovieName(session.movieId)}
                            </div>
                            <div className="text-blue-200 truncate pr-4">
                                {getHallName(session.hallId)}
                            </div>
                            <div className="text-white font-bold font-mono text-lg">
                                {time}
                            </div>
                            <div className="text-gray-300 text-sm">
                                {date}
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={() => onEdit(session)}
                                    className="px-4 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white text-sm rounded-lg font-medium transition-colors shadow-lg active:scale-95"
                                >
                                    Редагувати
                                </button>

                                <button
                                    onClick={() => onDelete(session.id)}
                                    className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-lg transition-all active:scale-95 group"
                                >
                                    <svg className="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}

                {sessions.length === 0 && (
                    <div className="p-10 text-center text-blue-300/50 italic">
                        Сеансів не знайдено. Створіть перший сеанс.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SessionsTable;