import { useEffect, useState } from 'react';
import { hallApi } from '@/api/hallApi';
import type { Hall } from '@/types/hall';
import { HALL_FORMAT_MAP } from '@/utils/formatters.ts';

export const useHalls = () => {
	const [halls, setHalls] = useState<Hall[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const [isHallModalOpen, setIsHallModalOpen] = useState(false);
	const [editingHall, setEditingHall] = useState<Hall | null>(null);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [hallToDelete, setHallToDelete] = useState<number | null>(null);

	useEffect(() => {
		const loadHalls = async () => {
			setIsLoading(true);
			try {
				const data = await hallApi.getAllHalls();
				setHalls(data);
			} finally {
				setIsLoading(false);
			}
		};

		loadHalls();
	}, []);

	const openAddModal = () => {
		setEditingHall(null);
		setIsHallModalOpen(true);
	};

	const openEditModal = (hall: Hall) => {
		setEditingHall(hall);
		setIsHallModalOpen(true);
	};
	const saveHall = async (name: string, rows: number, seatsPerRow: number, premiumRows: number[], formatId: number) => {
		const seatMap = Array.from({ length: rows }, (_, i) => {
			const char = premiumRows.includes(i + 1) ? 'V' : 'R';
			return char.repeat(seatsPerRow);
		});

		const payload = {
			id: editingHall?.id,
			name,
			format: formatId,
			seatMap,
		};

		if (editingHall) {
			await hallApi.updateHall(payload);

			const formatKey = Object.keys(HALL_FORMAT_MAP).find((k) => HALL_FORMAT_MAP[k].id === formatId) || 'REGULAR';

			setHalls((prev) => prev.map((h) =>
				h.id === editingHall.id ? { ...h, name, format: formatKey, seatMap } : h,
			));
		} else {
			const created = await hallApi.createHall(payload);
			setHalls((prev) => [...prev, created]);
		}
		setIsHallModalOpen(false);
	};

	const askToDelete = (id: number) => {
		setHallToDelete(id);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = async () => {
		if (!hallToDelete) return;

		await hallApi.deleteHall(hallToDelete);
		setHalls(halls.filter((h) => h.id !== hallToDelete));
		setIsDeleteModalOpen(false);
	};

	return {
		halls,
		isLoading,
		editingHall,
		isHallModalOpen,
		setIsHallModalOpen,
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		openAddModal,
		openEditModal,
		saveHall,
		askToDelete,
		confirmDelete,
	};
};
