import { useState, useEffect } from 'react';
import { sessionApi, type CreateSessionDto, type UpdateSessionDto } from '@/api/sessionApi';
import { hallApi } from '@/api/hallApi';
import axiosClient from '@/api/axiosClient';
import type { Session, SessionFormData, Option } from '@/types/session';
import { parseBackendError } from '@/utils/errorUtils';

export const useSessions = () => {
	const [sessions, setSessions] = useState<Session[]>([]);
	const [movieOptions, setMovieOptions] = useState<Option[]>([]);
	const [hallOptions, setHallOptions] = useState<Option[]>([]);

	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingSession, setEditingSession] = useState<SessionFormData | null>(null);
	const [editId, setEditId] = useState<number | null>(null);

	const [saveError, setSaveError] = useState<string | null>(null);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	useEffect(() => {
		loadInitialData();
	}, []);

	const loadInitialData = async () => {
		setIsLoading(true);
		try {
			const [hallsData, moviesResponse] = await Promise.all([
				hallApi.getAllHalls(),
				axiosClient.get('/movie', { params: { pageSize: 1000 } }),
			]);

			setHallOptions(hallsData.map((h: any) => ({
				value: h.id.toString(),
				label: h.name,
			})));

			const moviesList = moviesResponse.data.items || [];
			setMovieOptions(moviesList.map((m: any) => ({
				value: m.id.toString(),
				label: m.titleUkr || m.title || 'Без назви',
			})));

			await loadSessions();

		} catch (error) {
			console.error('Failed to load options', error);
		} finally {
			setIsLoading(false);
		}
	};

	const loadSessions = async () => {
		try {
			const sessionsData = await sessionApi.getAllSessions();
			setSessions(sessionsData);
		} catch (error) {
			console.error('Failed to load sessions', error);
		}
	};

	const getMovieName = (id: number | string | undefined | null) => {
		if (id === null || id === undefined) return 'Невідомий фільм';
		return movieOptions.find((o) => o.value === id.toString())?.label || 'Невідомий фільм';
	};

	const getHallName = (id: number | string | undefined | null) => {
		if (id === null || id === undefined) return 'Невідомий зал';
		return hallOptions.find((o) => o.value === id.toString())?.label || 'Невідомий зал';
	};

	const handleCreate = () => {
		setEditingSession(null);
		setEditId(null);
		setSaveError(null);
		setIsModalOpen(true);
	};

	const handleEdit = (session: Session) => {
		const dateObj = new Date(session.startTime);
		const dateStr = dateObj.toISOString().split('T')[0];
		const timeStr = dateObj.toTimeString().slice(0, 5);

		setEditingSession({
			movieId: session.movieId.toString(),
			hallId: session.hallId.toString(),
			date: dateStr,
			time: timeStr,
		});
		setEditId(session.id);
		setSaveError(null);
		setIsModalOpen(true);
	};

	const handleSave = async (data: SessionFormData) => {
		setSaveError(null);
		try {
			const dateTimeString = `${data.date}T${data.time}:00`;
			const dateObj = new Date(dateTimeString);
			const isoStartTime = dateObj.toISOString();

			const payload = {
				movieId: Number(data.movieId),
				hallId: Number(data.hallId),
				startTime: isoStartTime,
			};

			if (editId) {
				const updateDto: UpdateSessionDto = { id: editId, ...payload };
				await sessionApi.updateSession(updateDto);
				setSessions((prev) => prev.map((s) => s.id === editId ? { ...s, ...payload } : s));
			} else {
				const createDto: CreateSessionDto = payload;
				await sessionApi.createSession(createDto);
				await loadSessions();
			}

			setIsModalOpen(false);
		} catch (error: any) {
			console.error('Error saving session:', error);
			const message = parseBackendError(error.response?.data);
			setSaveError(message);
		}
	};

	const handleDeleteClick = (id: number) => {
		setDeleteId(id);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = async () => {
		if (!deleteId) return;
		try {
			await sessionApi.deleteSession(deleteId);
			setSessions((prev) => prev.filter((s) => s.id !== deleteId));
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error('Failed to delete session', error);
		}
	};

	const filteredSessions = sessions.filter((s) => {
		const movieName = getMovieName(s.movieId).toLowerCase();
		const hallName = getHallName(s.hallId).toLowerCase();
		const search = searchTerm.toLowerCase();
		return movieName.includes(search) || hallName.includes(search);
	});

	return {
		sessions: filteredSessions,
		movieOptions,
		hallOptions,
		isLoading,
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
		getHallName,
		saveError,
	};
};