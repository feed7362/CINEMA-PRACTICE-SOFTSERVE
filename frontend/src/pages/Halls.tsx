import React from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import BackgroundEffects from '../components/ui/BackgroundEffects';
import DeleteModal from '../components/ui/DeleteModal';
import HallModal from '../components/ui/HallModal';
import HallsTable from '../components/halls/HallsTable'; 
import { useHalls } from '../hooks/useHalls';

const Halls: React.FC = () => {
  const { 
    halls, editingHall, isHallModalOpen, setIsHallModalOpen, 
    isDeleteModalOpen, setIsDeleteModalOpen, openAddModal, 
    openEditModal, saveHall, askToDelete, confirmDelete 
  } = useHalls();

  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        <HeaderAdmin />
        <BackgroundEffects />

        <div className="flex-grow flex flex-col items-center relative z-10 px-4 py-10">
            <div className="w-full max-w-5xl">
                
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-8">Керування залами</h1>
                    <div className="w-full flex justify-start">
                        <button 
                            onClick={openAddModal}
                            className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white font-medium rounded-lg shadow-lg shadow-blue-900/30 transition-all active:scale-95"
                        >
                            Новий зал
                        </button>
                    </div>
                </div>

                <HallsTable 
                    halls={halls} 
                    onEdit={openEditModal} 
                    onDelete={askToDelete} 
                />

            </div>
        </div>

        <HallModal 
            isOpen={isHallModalOpen} 
            onClose={() => setIsHallModalOpen(false)} 
            onSave={saveHall}
            initialData={editingHall}
        />
        <DeleteModal 
            isOpen={isDeleteModalOpen}
            title="Видалити зал?"
            message="Ви впевнені? Це також видалить усі сеанси в цьому залі."
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
        />
    </div>
  );
};

export default Halls;