import React, { useState } from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import DeleteModal from '../components/ui/DeleteModal';
import SessionModal from '../components/ui/SessionModal';
import effect1 from '../assets/images/backgroundEffects/effect1.png';
import effect2 from '../assets/images/backgroundEffects/effect2.png';

// === ТИПИ ДАНИХ ===
interface Session {
  id: number;
  movieId: string;
  hallId: string;
  time: string;
  date: string; // формат YYYY-MM-DD
}

// === МОКОВІ ДАНІ (Імітація бази даних) ===
const MOVIES_LIST = [
  { value: '1', label: 'Інтерстеллар' },
  { value: '2', label: 'Джокер' },
  { value: '3', label: 'Гарі Потер' },
];

const HALLS_LIST = [
  { value: '1', label: 'Головний зал' },
  { value: '2', label: 'IMAX' },
  { value: '3', label: 'VIP зал' },
];

const INITIAL_SESSIONS: Session[] = [
  { id: 1, movieId: '1', hallId: '1', time: '12:50', date: '2026-01-30' },
  { id: 2, movieId: '2', hallId: '3', time: '15:30', date: '2026-01-30' },
];

const Sessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [searchTerm, setSearchTerm] = useState('');

  // Стейт модалок
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

  // === ЛОГІКА ===

  // Знайти назву фільму по ID для відображення в таблиці
  const getMovieName = (id: string) => MOVIES_LIST.find(m => m.value === id)?.label || 'Невідомий фільм';
  // Знайти назву залу по ID
  const getHallName = (id: string) => HALLS_LIST.find(h => h.value === id)?.label || 'Невідомий зал';

  // Відкриття створення
  const handleCreate = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  // Відкриття редагування
  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  // Збереження
  const handleSave = (data: Omit<Session, 'id'>) => {
    if (editingSession) {
      setSessions(sessions.map(s => s.id === editingSession.id ? { ...s, ...data } : s));
    } else {
      const newSession = { ...data, id: Date.now() };
      setSessions([...sessions, newSession]);
    }
  };

  // Видалення
  const handleDeleteClick = (id: number) => {
    setSessionToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (sessionToDelete) {
      setSessions(sessions.filter(s => s.id !== sessionToDelete));
      setIsDeleteModalOpen(false);
    }
  };

  // Пошук
  const filteredSessions = sessions.filter(s => 
    getMovieName(s.movieId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        <HeaderAdmin />

        {/* Модалки */}
        <SessionModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialData={editingSession}
            movieOptions={MOVIES_LIST} // Передаємо списки
            hallOptions={HALLS_LIST}
        />
        <DeleteModal 
            isOpen={isDeleteModalOpen}
            title="Видалити сеанс?"
            message="Ви впевнені? Це скасує показ фільму."
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
        />

        <img src={effect1} alt="" className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen -translate-x-1/5 -translate-y-1/10" />
        <img src={effect2} alt="" className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen translate-x-1/5 translate-y-1/5" />

        <div className="flex-grow flex flex-col items-center relative z-10 px-4 py-10">
            <div className="w-full max-w-6xl">
                
                {/* Заголовок */}
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Керування Сеансами</h1>

                {/* Панель керування: Кнопка + Пошук */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <button 
                        onClick={handleCreate}
                        className="shrink-0 px-8 py-3 bg-[#0041C4] hover:bg-[#0035A0] text-white font-medium rounded-lg shadow-lg shadow-blue-900/30 transition-all active:scale-95"
                    >
                        Створити сеанс
                    </button>
                    
                    <div className="w-full relative">
                        <input 
                            type="text" 
                            placeholder="Пошук" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white text-black rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-500/30 text-lg transition-shadow"
                        />
                    </div>
                </div>

                {/* Таблиця */}
                <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <div className="grid grid-cols-[1.5fr_1.5fr_0.8fr_1fr_1.2fr] bg-[#0284c7] text-white font-bold py-4 px-6 text-center md:text-left">
                        <div>Фільм</div>
                        <div>Назва Зала</div>
                        <div>Час</div>
                        <div>Дата</div>
                        <div className="text-right pr-10"></div>
                    </div>

                    <div className="flex flex-col">
                        {filteredSessions.map((session) => (
                            <div key={session.id} className="grid grid-cols-[1.5fr_1.5fr_0.8fr_1fr_1.2fr] items-center py-4 px-6 border-b border-blue-400/10 hover:bg-white/5 transition-colors">
                                
                                <div className="font-medium text-lg text-white">
                                    {getMovieName(session.movieId)}
                                </div>
                                <div className="text-blue-200">
                                    {getHallName(session.hallId)}
                                </div>
                                <div className="text-white font-bold">
                                    {session.time}
                                </div>
                                <div className="text-gray-300">
                                    {session.date.split('-').reverse().join('.').slice(0, 5)} {/* Форматуємо 2026-01-30 -> 30.01 */}
                                </div>

                                <div className="flex items-center justify-end gap-3">
                                    <button 
                                        onClick={() => handleEdit(session)}
                                        className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/40 active:scale-95"
                                    >
                                        Редагувати
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDeleteClick(session.id)}
                                        className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-lg transition-all active:scale-95 group"
                                    >
                                        <svg className="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {filteredSessions.length === 0 && (
                            <div className="p-10 text-center text-gray-400">Сеансів не знайдено</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Sessions;