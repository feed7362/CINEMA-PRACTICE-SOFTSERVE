import { useState } from 'react';
import { type Hall, MOCK_HALLS } from '../types/hall';

export const useHalls = () => {
  const [halls, setHalls] = useState<Hall[]>(MOCK_HALLS);

  const [isHallModalOpen, setIsHallModalOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hallToDelete, setHallToDelete] = useState<number | null>(null);

  const openAddModal = () => {
    setEditingHall(null);
    setIsHallModalOpen(true);
  };

  const openEditModal = (hall: Hall) => {
    setEditingHall(hall);
    setIsHallModalOpen(true);
  };

  const saveHall = (name: string, rows: number, seatsPerRow: number, premiumRows: number[]) => {
    if (editingHall) {
      setHalls(halls.map(h => 
        h.id === editingHall.id 
          ? { ...h, name, rows, seatsPerRow, premiumRows }
          : h
      ));
    } else {
      const newHall = { id: Date.now(), name, rows, seatsPerRow, premiumRows };
      setHalls([...halls, newHall]);
    }
  };

  const askToDelete = (id: number) => {
    setHallToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (hallToDelete) {
      setHalls(halls.filter(h => h.id !== hallToDelete));
      setIsDeleteModalOpen(false);
    }
  };

  return {
    halls,
    editingHall,
    isHallModalOpen,
    setIsHallModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    openAddModal,
    openEditModal,
    saveHall,
    askToDelete,
    confirmDelete
  };
};