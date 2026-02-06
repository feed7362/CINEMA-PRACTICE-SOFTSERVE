import React, { useState, useEffect } from 'react';
import AdminInput from '../admin/AdminInput';
import AdminSelect from '../admin/AdminSelect';

interface Option {
  value: string;
  label: string;
}

interface SessionData {
  id: number;
  movieId: string;
  hallId: string;
  time: string;
  date: string;
}

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: Omit<SessionData, 'id'>) => void; 
  initialData?: SessionData | null;
  movieOptions: Option[];
  hallOptions: Option[];
}

const SessionModal: React.FC<SessionModalProps> = ({ 
  isOpen, onClose, onSave, initialData, movieOptions, hallOptions 
}) => {
  
  const [movieId, setMovieId] = useState('');
  const [hallId, setHallId] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setMovieId(initialData.movieId);
      setHallId(initialData.hallId);
      setTime(initialData.time);
      setDate(initialData.date);
    } else {
      setMovieId('');
      setHallId('');
      setTime('');
      setDate('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ movieId, hallId, time, date });
    onClose();
  };

  const isEditMode = !!initialData;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[#002D6E] border border-blue-400/30 rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          {isEditMode ? 'Редагувати сеанс' : 'Створити сеанс'}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <AdminSelect 
            id="session-movie" 
            label="Фільм" 
            options={[{ value: '', label: 'Оберіть фільм' }, ...movieOptions]}
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
          />

          <AdminSelect 
            id="session-hall" 
            label="Зал" 
            options={[{ value: '', label: 'Оберіть зал' }, ...hallOptions]}
            value={hallId}
            onChange={(e) => setHallId(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <AdminInput 
                id="session-time" 
                label="Час" 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <AdminInput 
                id="session-date" 
                label="Дата" 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-4 bg-[#0041C4] hover:bg-[#0035A0] text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition-all active:scale-95"
          >
            {isEditMode ? 'Зберегти зміни' : 'Створити сеанс'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default SessionModal;