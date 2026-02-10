import { useState, useEffect, useMemo } from 'react';
import { statsApi } from '@/api/statsApi';
import type { PopularMoviesParams, IStatsMovie, ISoldTicket, IDiscountStats } from '@/types/admin';

export const useStatisticsPage = () => {
    const [dateRange, setDateRange] = useState({
        from: '', 
        to: '',
    });

    const [localFilters, setLocalFilters] = useState<PopularMoviesParams>({
        Amount: 5,
        MinImdbRating: 0,
        DateFrom: '',
        DateTo: '',
    });

    const [allTickets, setAllTickets] = useState<ISoldTicket[]>([]); 
    const [availableDiscounts, setAvailableDiscounts] = useState<IDiscountStats[]>([]);
    const [moviesMetadata, setMoviesMetadata] = useState<IStatsMovie[]>([]); 
    const [serverRevenue, setServerRevenue] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
    const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);

    useEffect(() => {
        const loadAllData = async () => {
            if (!dateRange.from || !dateRange.to) {
                setAllTickets([]);
                setServerRevenue(0);
                setMoviesMetadata([]);
                return;
            }

            setIsLoading(true);
            try {
                const [moviesMetaRes, discountsRes, revenueRes] = await Promise.all([
                    statsApi.getPopularMovies({ Amount: 1000 }), 
                    statsApi.getDiscountStats(dateRange.from, dateRange.to).catch(() => []),
                    statsApi.getRevenue(dateRange.from, dateRange.to).catch(() => ({ totalRevenue: 0 }))
                ]);

                setMoviesMetadata(moviesMetaRes);
                setAvailableDiscounts(discountsRes);
                setServerRevenue(revenueRes.totalRevenue || 0);

                const fetchedTickets: any[] = [];
                let currentPage = 1;
                let hasMore = true;
                
                const fromDate = new Date(dateRange.from); fromDate.setHours(0, 0, 0, 0);
                const toDate = new Date(dateRange.to); toDate.setHours(23, 59, 59, 999);
                const fromTime = fromDate.getTime();
                const toTime = toDate.getTime();

                while (hasMore) {
                    const response: any = await statsApi.getTicketsReport(currentPage, 100);
                    let items: any[] = [];
                    
                    if (response.items && Array.isArray(response.items)) items = response.items;
                    else if (Array.isArray(response)) items = response;

                    if (items.length === 0) {
                        hasMore = false;
                        break;
                    }

                    const relevant = items.filter((item: any) => {
                        const tTime = new Date(item.startTime).getTime();
                        return tTime >= fromTime && tTime <= toTime;
                    });

                    fetchedTickets.push(...relevant);

                    if (response.totalPages && currentPage >= response.totalPages) hasMore = false;
                    else if (items.length < 100) hasMore = false;
                    else if (currentPage > 100) hasMore = false; 
                    else currentPage++;
                }

                const finalTickets: ISoldTicket[] = fetchedTickets.map((item: any) => ({
                    id: item.ticketId || item.id,
                    movieTitle: item.movieTitle,
                    hallName: item.hallName,
                    seatNumber: `R${item.rowNumber} S${item.seatNumber}`,
                    price: item.price || 0,
                    discountCode: item.discountType || null,
                    discountAmount: 0,
                    soldAt: item.startTime
                }));

                setAllTickets(finalTickets);
                
                setLocalFilters((prev) => ({ 
                    ...prev, 
                    DateFrom: dateRange.from, 
                    DateTo: dateRange.to 
                }));

            } catch (error) {
                console.error("Failed to load data", error);
                setAllTickets([]);
                setServerRevenue(0);
            } finally {
                setIsLoading(false);
            }
        };

        loadAllData();
    }, [dateRange]);
    
    const totalTicketsCount = allTickets.length;
    const totalRevenue = serverRevenue;

    const aggregatedMovies = useMemo(() => {
        if (allTickets.length === 0) return [];

        const statsMap: Record<string, { count: number }> = {};

        allTickets.forEach(t => {
            const title = t.movieTitle; 
            if (!statsMap[title]) statsMap[title] = { count: 0 };
            statsMap[title].count += 1;
        });

        const tableData: IStatsMovie[] = Object.entries(statsMap).map(([title, stats]) => {
            const meta = moviesMetadata.find(m => m.title === title) || {};

            return {
                id: (meta as any).id || 0,
                title: title,
                ticketsSold: stats.count,
                revenue: 0,
                posterUrl: (meta as any).posterUrl || null,
                genres: (meta as any).genres || "Невідомо",
                rating: (meta as any).rating || 0,
                imdbRating: (meta as any).imdbRating || 0,
                releaseYear: (meta as any).releaseYear || new Date().getFullYear(),
                director: (meta as any).director || "—",
                country: (meta as any).country || "Unknown",
                ageRating: (meta as any).ageRating || "PG-13"
            };
        });

        let result = tableData.sort((a, b) => b.ticketsSold - a.ticketsSold);

        const minRating = localFilters.MinImdbRating || 0;
        if (minRating > 0) {
            result = result.filter(m => m.imdbRating >= minRating);
        }
        
        return result.slice(0, localFilters.Amount);

    }, [allTickets, moviesMetadata, localFilters]);
    
    const handleLocalFilterChange = (newFilters: Partial<PopularMoviesParams>) => {
        setLocalFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const handleFormReport = () => {
        console.log("Filters applied:", localFilters);
    };

    return {
        dateRange, setDateRange,
        
        generalData: { 
            revenue: totalRevenue, 
            totalTickets: totalTicketsCount 
        }, 
        isGeneralLoading: isLoading,

        localFilters, 
        handleLocalFilterChange, 
        handleFormReport,

        movies: aggregatedMovies, 
        isTableLoading: isLoading,

        revenueModal: {
            isOpen: isRevenueModalOpen,
            setIsOpen: setIsRevenueModalOpen,
            data: aggregatedMovies,
            isLoading: false,
            open: () => {
                if (totalRevenue > 0 || totalTicketsCount > 0) setIsRevenueModalOpen(true);
            },
        },
        ticketsModal: {
            isOpen: isTicketsModalOpen,
            setIsOpen: setIsTicketsModalOpen,
            data: allTickets,
            discountsList: availableDiscounts,
            isLoading: false,
            open: () => {
                if (totalRevenue > 0 || totalTicketsCount > 0) setIsTicketsModalOpen(true);
            },
        },
    };
};