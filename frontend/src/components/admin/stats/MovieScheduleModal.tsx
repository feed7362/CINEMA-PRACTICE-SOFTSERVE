import React from 'react';
import { useMovieSessions } from '@/hooks/useMovieSessions';
import CloseIcon from '@/assets/icons/CloseIcon';
import { SessionFilter } from '@/components/session/SessionFilter';
import { SessionList } from '@/components/session/SessionList';

interface MovieScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: number;
    movieTitle: string;
}

const MovieScheduleModal: React.FC<MovieScheduleModalProps> = ({ isOpen, onClose, movieId, movieTitle }) => {
    const { sessions, isLoading, dateFrom, setDateFrom, dateTo, setDateTo } = useMovieSessions(isOpen, movieId);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
                    <div>
                        <h3 className="text-xl font-bold text-white">Розклад сеансів</h3>
                        <p className="text-zinc-400 text-sm">{movieTitle} (ID: {movieId})</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                    >
                        <CloseIcon size={24} />
                    </button>
                </div>

                <SessionFilter 
                    dateFrom={dateFrom} 
                    setDateFrom={setDateFrom}
                    dateTo={dateTo} 
                    setDateTo={setDateTo}
                />

                <SessionList sessions={sessions} isLoading={isLoading} />
                
                <div className="p-4 border-t border-white/10 flex justify-end">
                     <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium"
                    >
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieScheduleModal;