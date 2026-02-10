import { useState, useEffect, useMemo } from 'react';
import { sessionApi, type ReadSessionDto } from '@/api/sessionApi';

export const useMovieSessions = (isOpen: boolean, movieId: number) => {
	const [allSessions, setAllSessions] = useState<ReadSessionDto[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dateFrom, setDateFrom] = useState(() => {
		const d = new Date();
		d.setMonth(d.getMonth() - 1);
		return d.toISOString().split('T')[0];
	});
    
	const [dateTo, setDateTo] = useState(() => {
		const d = new Date();
		d.setMonth(d.getMonth() + 3);
		return d.toISOString().split('T')[0];
	});

	useEffect(() => {
		if (isOpen) {
			const loadSessions = async () => {
				setIsLoading(true);
				try {
					const data = await sessionApi.getAllSessions();
					setAllSessions(data);
				} catch (error) {
					console.error('Помилка завантаження сеансів:', error);
				} finally {
					setIsLoading(false);
				}
			};
			loadSessions();
		}
	}, [isOpen]);

	const filteredSessions = useMemo(() => {
		if (!allSessions.length) return [];

		const fromTs = new Date(dateFrom).setHours(0, 0, 0, 0);
		const toTs = new Date(dateTo).setHours(23, 59, 59, 999);

		return allSessions
			.filter((session) => {
				const sessionTime = new Date(session.startTime).getTime();
				const isTargetMovie = Number(session.movieId) === Number(movieId);
				const isInDateRange = sessionTime >= fromTs && sessionTime <= toTs;
				return isTargetMovie && isInDateRange;
			})
			.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
	}, [allSessions, movieId, dateFrom, dateTo]);

	return {
		sessions: filteredSessions,
		isLoading,
		dateFrom, setDateFrom,
		dateTo, setDateTo,
	};
};