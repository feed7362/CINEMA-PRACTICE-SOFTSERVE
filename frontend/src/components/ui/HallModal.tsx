import React, { useState, useEffect } from 'react';
import AdminInput from './AdminInput';

interface Hall {
  id: number;
  name: string;
  rows: number;       
  seatsPerRow: number;
}

interface HallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, rows: number, seatsPerRow: number) => void; 
  initialData?: Hall | null;
}

const HallModal: React.FC<HallModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState('');
  const [rows, setRows] = useState('');
  const [seatsPerRow, setSeatsPerRow] = useState('');

  const totalSeats = Number(rows) * Number(seatsPerRow);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRows(initialData.rows.toString());
      setSeatsPerRow(initialData.seatsPerRow.toString());
    } else {
      setName('');
      setRows('');
      setSeatsPerRow('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, Number(rows), Number(seatsPerRow));
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
          {isEditMode ? 'Редагувати зал' : 'Новий зал'}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AdminInput 
            id="hall-name" 
            label="Назва залу" 
            placeholder="Наприклад: IMAX" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <AdminInput 
                id="hall-rows" 
                label="К-сть рядів" 
                type="number" 
                placeholder="10" 
                value={rows}
                onChange={(e) => setRows(e.target.value)}
            />
            <AdminInput 
                id="hall-col" 
                label="Місць у ряду" 
                type="number" 
                placeholder="15" 
                value={seatsPerRow}
                onChange={(e) => setSeatsPerRow(e.target.value)}
            />
          </div>

          <div className="bg-white/10 rounded-lg p-3 text-center border border-white/10">
            <span className="text-blue-200 text-sm">Всього місць: </span>
            <span className="text-white font-bold text-lg ml-2">
                {isNaN(totalSeats) ? 0 : totalSeats}
            </span>
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-2 bg-[#0041C4] hover:bg-[#0035A0] text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition-all active:scale-95"
          >
            {isEditMode ? 'Зберегти зміни' : 'Додати зал'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default HallModal;