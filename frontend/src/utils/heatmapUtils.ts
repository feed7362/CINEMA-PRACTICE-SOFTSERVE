export const getSeatColorClass = (apiColor: string | null) => {
	if (!apiColor) return 'bg-zinc-700/50 border-zinc-600 text-zinc-500';

	const colorLower = apiColor.toLowerCase();
	if (colorLower.includes('red')) return 'bg-red-500 border-red-500 shadow-[0_0_15px_#ef4444] text-white';
	if (colorLower.includes('blue')) return 'bg-blue-500 border-blue-500 shadow-[0_0_15px_#3b82f6] text-white';
	if (colorLower.includes('green')) return 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_#10b981] text-white';

	return 'bg-zinc-700 border-zinc-600';
};