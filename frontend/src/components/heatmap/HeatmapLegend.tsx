import React from 'react';

export const HeatmapLegend: React.FC = () => (
	<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-4">
		<div className="flex items-center gap-2">
			<div className="w-5 h-5 bg-red-500 rounded-md border border-red-500 shadow-[0_0_10px_#ef4444]"></div>
			<span>Популярні</span>
		</div>
		<div className="flex items-center gap-2">
			<div className="w-5 h-5 bg-blue-500 rounded-md border border-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
			<span>Менш популярні</span>
		</div>
		<div className="flex items-center gap-2">
			<div className="w-5 h-5 bg-zinc-700/50 rounded-md border border-zinc-600"></div>
			<span>Жодного продажу</span>
		</div>
	</div>
);