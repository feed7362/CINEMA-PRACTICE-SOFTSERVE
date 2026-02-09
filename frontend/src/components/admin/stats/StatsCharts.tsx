// import React from 'react';

// interface StatsChartsProps {
//   trendData: number[];
//   isLoading: boolean;
// }

// const StatsCharts: React.FC<StatsChartsProps> = ({ trendData, isLoading }) => {
//   const chartWidth = 600;
//   const chartHeight = 150;
  
//   const maxAmount = Math.max(...trendData, 1); 

//   const points = trendData
//     .map((amount, i) => {
//       const x = (i / (trendData.length - 1)) * chartWidth;
//       const y = chartHeight - (amount / maxAmount) * (chartHeight - 20); 
//       return `${x},${y}`;
//     })
//     .join(' ');

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2 bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 shadow-xl">
//         <h3 className="text-lg font-bold text-white mb-6">Динаміка доходу (за тиждень)</h3>
        
//         <div className="w-full h-48 relative flex flex-col justify-end px-2">
//           {isLoading ? (
//             <div className="absolute inset-0 flex items-center justify-center text-blue-200 opacity-50">
//               Завантаження графіка...
//             </div>
//           ) : (
//             <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none">
//               <polyline 
//                 fill="none" 
//                 stroke="#3b82f6" 
//                 strokeWidth="3" 
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 points={points}
//               />
//             </svg>
//           )}
          
//           <div className="flex justify-between w-full mt-4">
//             {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day, i) => (
//               <span key={i} className="text-gray-400 text-sm">{day}</span>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl p-6 shadow-xl flex flex-col items-center">
//         <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Жанри</h3>
//         <div className="w-40 h-40 rounded-full relative mb-6" style={{ background: 'conic-gradient(#ef4444 0% 35%, #22c55e 35% 60%, #eab308 60% 100%)' }}>
//           <div className="absolute inset-4 bg-[#002D6E] rounded-full"></div>
//         </div>
//         <div className="w-full space-y-2 text-sm text-gray-300">
//           <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"/> Екшн (35%)</div>
//           <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"/> Комедії (25%)</div>
//           <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"/> Мульти (40%)</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatsCharts;