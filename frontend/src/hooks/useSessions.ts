import { useState } from 'react';
import { type Session, INITIAL_SESSIONS, MOVIES_LIST, HALLS_LIST } from '../types/session';

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);


  const getMovieName = (id: string) => MOVIES_LIST.find(m => m.value === id)?.label || 'Невідомий фільм';
  const getHallName = (id: string) => HALLS_LIST.find(h => h.value === id)?.label || 'Невідомий зал';

  const handleCreate = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<Session, 'id'>) => {
    if (editingSession) {
      setSessions(sessions.map(s => s.id === editingSession.id ? { ...s, ...data } : s));
    } else {
      const newSession = { ...data, id: Date.now() };
      setSessions([...sessions, newSession]);
    }
  };

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

  const filteredSessions = sessions.filter(s => 
    getMovieName(s.movieId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    sessions: filteredSessions, 
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    editingSession,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleCreate,
    handleEdit,
    handleSave,
    handleDeleteClick,
    confirmDelete,
    getMovieName, 
    getHallName   
  };
};