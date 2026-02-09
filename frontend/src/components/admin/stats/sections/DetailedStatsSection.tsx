import React from 'react';
import PopularMoviesFilters from '@/components/admin/stats/PopularMoviesFilters';
import StatsTable from '@/components/admin/stats/StatsTable';
import type { PopularMoviesParams, IStatsMovie } from '@/types/admin';

interface Props {
	localFilters: PopularMoviesParams;
	onFilterChange: (filters: Partial<PopularMoviesParams>) => void;
	onSearch: () => void;
	movies: IStatsMovie[];
	isLoading: boolean;
}

export const DetailedStatsSection: React.FC<Props> = ({ 
	localFilters, onFilterChange, onSearch, movies, isLoading, 
}) => (
	<div className="space-y-6 mt-12">
		<h2 className="text-2xl font-bold px-1 border-l-4 border-emerald-500 pl-3">
			Детальна статистика стрічок
		</h2>
        
		<PopularMoviesFilters 
			filters={localFilters} 
			onChange={onFilterChange} 
			onSearch={onSearch}
		/>

		<StatsTable 
			movies={movies} 
			isLoading={isLoading} 
		/>
	</div>
);