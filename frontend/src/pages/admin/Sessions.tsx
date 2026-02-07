import React from 'react';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import DeleteModal from '@/components/ui/DeleteModal';
import {useSessions} from '@/hooks/useSessions';
import SessionModal from "@/components/session/SessionModal.tsx";
import SessionsTable from "@/components/session/SessionsTable.tsx";

const Sessions: React.FC = () => {
    const {
        sessions,
        movieOptions,
        hallOptions,
        searchTerm, setSearchTerm,
        isModalOpen, setIsModalOpen,
        editingSession,
        isDeleteModalOpen, setIsDeleteModalOpen,
        handleCreate, handleEdit, handleSave,
        handleDeleteClick, confirmDelete,
        getMovieName, getHallName,
        saveError
    } = useSessions();

    return (
        <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
            <BackgroundEffects/>

            <SessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingSession}
                movieOptions={movieOptions}
                hallOptions={hallOptions}
                error={saveError}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                title="Видалити сеанс?"
                message="Ви впевнені? Це скасує показ фільму."
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />

            <div className="grow flex flex-col items-center relative z-10 px-4 py-10">
                <div className="w-full max-w-6xl">
                    <h1 className="text-3xl font-bold text-white mb-8 text-center">Керування Сеансами</h1>

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
                                placeholder="Пошук..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-black rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-500/30 text-lg transition-shadow"
                            />
                        </div>
                    </div>

                    <SessionsTable
                        sessions={sessions}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        getMovieName={getMovieName}
                        getHallName={getHallName}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sessions;