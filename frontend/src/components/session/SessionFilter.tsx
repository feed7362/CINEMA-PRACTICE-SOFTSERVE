import React from 'react';

interface Props {
	dateFrom: string;
	setDateFrom: (d: string) => void;
	dateTo: string;
	setDateTo: (d: string) => void;
}

export const SessionFilter: React.FC<Props> = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => (
	<div className="p-6 grid grid-cols-2 gap-4 border-b border-white/5">
		<div>
			<label className="text-xs text-zinc-500 uppercase font-bold block mb-1">З дати</label>
			<input 
				type="date" 
				value={dateFrom}
				onChange={(e) => setDateFrom(e.target.value)}
				className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 transition-all"
			/>
		</div>
		<div>
			<label className="text-xs text-zinc-500 uppercase font-bold block mb-1">По дату</label>
			<input 
				type="date" 
				value={dateTo}
				onChange={(e) => setDateTo(e.target.value)}
				className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500 transition-all"
			/>
		</div>
	</div>
);