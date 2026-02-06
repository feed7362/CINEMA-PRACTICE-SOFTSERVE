import React, { useState, useEffect } from 'react';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import StatsFilters from '@/components/stats/StatsFilters';
import StatsCards from '@/components/stats/StatsCards';
import StatsCharts from '@/components/stats/StatsCharts';
import StatsTable from '@/components/stats/StatsTable';
import { statsApi } from '@/api/statsApi';

const Statistics: React.FC = () => {
  const [data, setData] = useState({
    revenue: 0,
    specialTickets: 0,
    popularMovies: [] as any[]
  });
  const [isLoading, setIsLoading] = useState(false);

  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  const loadAllStats = async (from: string, to: string) => {
    setIsLoading(true);
    try {
      const [revRes, specRes, popRes] = await Promise.all([
        statsApi.getRevenue(from, to),
        statsApi.getSpecialTicketsCount(from, to),
        statsApi.getPopularMovies({ DateFrom: from, DateTo: to, Amount: 5 })
      ]);

      setData({
        revenue: revRes.totalRevenue,
        specialTickets: specRes.specialTicketsCount,
        popularMovies: popRes
      });
    } catch (error) {
      console.error("Помилка завантаження статистики:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllStats(dateRange.from, dateRange.to);
  }, [dateRange]);

  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
      <BackgroundEffects />

      <div className="grow flex flex-col items-center relative z-10 px-4 py-8">
        <div className="w-full max-w-6xl space-y-8">
          
          <StatsFilters 
            currentFilters={dateRange}
            onFilterChange={(newRange) => setDateRange(newRange)} 
          />

          <StatsCards 
            revenue={data.revenue} 
            specialTickets={data.specialTickets}
            isLoading={isLoading} 
          />

          <StatsCharts />

          <StatsTable 
            movies={data.popularMovies} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;