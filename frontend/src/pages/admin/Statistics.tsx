import React from 'react';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import StatsCards from '@/components/admin/stats/StatsCards';
import RevenueDetailsModal from '@/components/admin/stats/RevenueDetailsModal';
import MovieAnalyticsBlock from '@/components/admin/stats/MovieAnalyticsBlock';
import HallHeatmap from '@/components/admin/stats/HallHeatmap';
import { useStatisticsPage } from '@/hooks/useStatisticsPage';
import { StatisticsHeader } from '@/components/admin/stats/sections/StatisticsHeader';
import { DetailedStatsSection } from '@/components/admin/stats/sections/DetailedStatsSection';

const Statistics: React.FC = () => {
	const {
		dateRange, setDateRange,
		generalData, isGeneralLoading,
		localFilters, handleLocalFilterChange, handleFormReport,
		movies, isTableLoading,
		revenueModal,
	} = useStatisticsPage();

	return (
		<div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
			<BackgroundEffects />

			<div className="grow flex flex-col items-center relative z-10 px-4 py-8">
				<div className="w-full max-w-7xl">
                    
					<StatisticsHeader 
						dateRange={dateRange} 
						setDateRange={setDateRange} 
					/>

					<StatsCards 
						revenue={generalData.revenue} 
						ticketsCount={generalData.totalTickets} 
						isLoading={isGeneralLoading}
						onRevenueClick={revenueModal.open}
					/>

					<div className="my-8">
						<MovieAnalyticsBlock />
					</div>

					<div className="my-8">
						<HallHeatmap />
					</div>

					<DetailedStatsSection 
						localFilters={localFilters}
						onFilterChange={handleLocalFilterChange}
						onSearch={handleFormReport}
						movies={movies}
						isLoading={isTableLoading}
					/>
				</div>
			</div>

			<RevenueDetailsModal 
				isOpen={revenueModal.isOpen}
				onClose={() => revenueModal.setIsOpen(false)}
				movies={revenueModal.data}
				isLoading={revenueModal.isLoading}
				dateRange={dateRange}
			/>
		</div>
	);
};

export default Statistics;