import { useState, useEffect } from 'react';
import { statsApi } from '@/api/statsApi';
import { usePopularMovies } from '@/hooks/movies/usePopularMovies';
import type { PopularMoviesParams, IStatsMovie } from '@/types/admin';

export const useStatisticsPage = () => {
	const [dateRange, setDateRange] = useState({
		from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
		to: new Date().toISOString().split('T')[0],
	});

	const [generalData, setGeneralData] = useState({ revenue: 0, totalTickets: 0 });
	const [isGeneralLoading, setIsGeneralLoading] = useState(false);

	useEffect(() => {
		const loadGeneralStats = async () => {
			setIsGeneralLoading(true);
			try {
				const revenuePromise = statsApi.getRevenue(dateRange.from, dateRange.to);
				const allMoviesPromise = statsApi.getPopularMovies({
					DateFrom: dateRange.from,
					DateTo: dateRange.to,
					Amount: 10000, 
				});

				const [revRes, moviesRes] = await Promise.all([revenuePromise, allMoviesPromise]);
				const totalTicketsCount = moviesRes.reduce((sum, movie) => sum + movie.ticketsSold, 0);

				setGeneralData({
					revenue: revRes.totalRevenue || 0,
					totalTickets: totalTicketsCount,
				});
                
				setLocalFilters((prev) => ({ 
					...prev, 
					DateFrom: dateRange.from, 
					DateTo: dateRange.to, 
				}));
                
			} catch (e) {
				console.error('Failed to load general stats', e);
			} finally {
				setIsGeneralLoading(false);
			}
		};
		loadGeneralStats();
	}, [dateRange]);

	const [localFilters, setLocalFilters] = useState<PopularMoviesParams>({
		Amount: 5,
		MinImdbRating: 0,
		DateFrom: dateRange.from,
		DateTo: dateRange.to,
	});

	const { movies, filters: activeFilters, isLoading: isTableLoading, setFilters } = usePopularMovies({
		DateFrom: dateRange.from,
		DateTo: dateRange.to,
		Amount: 5,
	});

	const handleFormReport = () => {
		setFilters((prev) => ({ ...prev, ...localFilters }));
	};

	const handleLocalFilterChange = (newFilters: Partial<PopularMoviesParams>) => {
		setLocalFilters((prev) => ({ ...prev, ...newFilters }));
	};

	// 4. Модалка деталей доходу
	const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
	const [revenueMovies, setRevenueMovies] = useState<IStatsMovie[]>([]);
	const [isRevenueLoading, setIsRevenueLoading] = useState(false);

	const handleOpenRevenueDetails = async () => {
		setIsRevenueModalOpen(true);
		setIsRevenueLoading(true);
		try {
			const allMoviesData = await statsApi.getPopularMovies({
				DateFrom: dateRange.from,
				DateTo: dateRange.to,
				Amount: 10000,
			});
			const sorted = allMoviesData.sort((a, b) => b.revenue - a.revenue);
			setRevenueMovies(sorted);
		} catch (e) {
			console.error(e);
		} finally {
			setIsRevenueLoading(false);
		}
	};

	return {
		dateRange, setDateRange,
		generalData, isGeneralLoading,
		localFilters, handleLocalFilterChange, handleFormReport,
		movies, isTableLoading,
		revenueModal: {
			isOpen: isRevenueModalOpen,
			setIsOpen: setIsRevenueModalOpen,
			data: revenueMovies,
			isLoading: isRevenueLoading,
			open: handleOpenRevenueDetails,
		},
	};
};