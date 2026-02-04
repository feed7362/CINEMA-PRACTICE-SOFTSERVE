import React, { useState } from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import DeleteModal from '../components/ui/DeleteModal';
import HallModal from '../components/ui/HallModal';
import effect1 from '../assets/images/backgroundEffects/effect1.png';
import effect2 from '../assets/images/backgroundEffects/effect2.png';

interface Hall {
  id: number;
  name: string;
  rows: number;
  seatsPerRow: number;
}

const MOCK_HALLS: Hall[] = [
  { id: 1, name: 'Головний зал', rows: 10, seatsPerRow: 12 }, 
  { id: 2, name: 'IMAX', rows: 8, seatsPerRow: 15 },
  { id: 3, name: 'Samsung Onyx', rows: 5, seatsPerRow: 8 },
  { id: 4, name: 'Laser (Лазерний зал)', rows: 7, seatsPerRow: 10 },
];

const Halls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>(MOCK_HALLS);
  
  const [isHallModalOpen, setIsHallModalOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hallToDelete, setHallToDelete] = useState<number | null>(null);

  const handleAddClick = () => {
    setEditingHall(null);
    setIsHallModalOpen(true);
  };

  const handleEditClick = (hall: Hall) => {
    setEditingHall(hall);
    setIsHallModalOpen(true);
  };

  const handleSaveHall = (name: string, rows: number, seatsPerRow: number) => {
    if (editingHall) {
      setHalls(halls.map(h => h.id === editingHall.id ? { ...h, name, rows, seatsPerRow } : h));
    } else {
      const newHall = { id: Date.now(), name, rows, seatsPerRow };
      setHalls([...halls, newHall]);
    }
  };

  const handleDeleteClick = (id: number) => {
    setHallToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (hallToDelete) {
      setHalls(halls.filter(h => h.id !== hallToDelete));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        <HeaderAdmin />

        <HallModal 
            isOpen={isHallModalOpen} 
            onClose={() => setIsHallModalOpen(false)} 
            onSave={handleSaveHall}
            initialData={editingHall}
        />
        <DeleteModal 
            isOpen={isDeleteModalOpen}
            title="Видалити зал?"
            message="Ви впевнені? Це також видалить усі сеанси в цьому залі."
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
        />

        <img src={effect1} alt="" className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen -translate-x-1/5 -translate-y-1/10" />
        <img src={effect2} alt="" className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen translate-x-1/5 translate-y-1/5" />

        <div className="flex-grow flex flex-col items-center relative z-10 px-4 py-10">
            <div className="w-full max-w-5xl">
                
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-8">Керування залами</h1>
                    
                    <div className="w-full flex justify-start">
                        <button 
                            onClick={handleAddClick}
                            className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white font-medium rounded-lg shadow-lg shadow-blue-900/30 transition-all active:scale-95"
                        >
                            Новий зал
                        </button>
                    </div>
                </div>

                <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <div className="grid grid-cols-[2fr_1fr_1.5fr] bg-[#0284c7] text-white font-bold py-4 px-6">
                        <div>Назва</div>
                        <div>Місткість</div>
                        <div className="text-right pr-10">Налаштування</div>
                    </div>

                    <div className="flex flex-col">
                        {halls.map((hall) => (
                            <div key={hall.id} className="grid grid-cols-[2fr_1fr_1.5fr] items-center py-4 px-6 border-b border-blue-400/10 hover:bg-white/5 transition-colors">
                                <div className="font-medium text-lg text-white">
                                    {hall.name}
                                </div>

                                <div className="text-blue-200">
                                    {hall.rows * hall.seatsPerRow} місць 
                                    <span className="text-xs text-gray-400 ml-2">({hall.rows} рядів по {hall.seatsPerRow})</span>
                                </div>
                                
                                <div className="flex items-center justify-end gap-3">
                                    <button 
                                        onClick={() => handleEditClick(hall)}
                                        className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/40 active:scale-95"
                                    >
                                        Редагувати
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDeleteClick(hall.id)}
                                        className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-red-500/80 text-white rounded-lg transition-all active:scale-95 group"
                                    >
                                        <svg className="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Halls;