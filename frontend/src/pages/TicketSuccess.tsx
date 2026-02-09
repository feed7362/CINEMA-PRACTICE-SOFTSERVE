import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import type { LockBookingResponse } from '@/types/booking';
import BaseButton from '@/components/ui/BaseButton';

const TicketSuccess: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const bookingData = location.state as LockBookingResponse | null;

	if (!bookingData) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="min-h-screen bg-[#020617] text-white font-['Inter'] flex flex-col relative overflow-hidden">
            
			<div className="absolute top-1/2 left-1/2 w-175 h-175 bg-[#0753E0] rounded-full blur-[200px] opacity-15 pointer-events-none -translate-x-1/2 -translate-y-1/2" />

			<main className="grow container mx-auto px-6 py-10 relative z-10 flex flex-col items-center justify-center pt-32 pb-20">
                
				<div className="text-center mb-10">
					<div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
						<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h1 className="text-3xl md:text-4xl font-bold">Оплата успішна!</h1>
					<p className="text-gray-400 mt-2">Ваш квиток успішно заброньовано</p>
				</div>

				<div className="w-full max-w-md bg-[#051329] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                    
					<div className="p-8 space-y-6">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Кінотеатр</p>
								<h3 className="text-xl font-bold text-white">NetFilm Cinema</h3> 
							</div>
							<div className="text-right">
								<p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">ID Бронювання</p>
								<p className="text-sm font-mono text-[#0753E0]">#{bookingData.id}</p>
							</div>
						</div>

						<div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-4">
							<div>
								<p className="text-xs text-gray-400 mb-1">Дата та Час</p>
								<p className="font-semibold text-lg text-white">
									{new Date(bookingData.hall).toLocaleString('uk-UA', {
										day: 'numeric',
										month: 'long',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</div>
						</div>

						<div>
							<p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Ваші місця</p>
							<div className="flex flex-wrap gap-2">
								{bookingData.seats.map((s: any, index: number) => (
									<span key={index} className="px-3 py-1 bg-[#0753E0]/20 border border-[#0753E0]/50 rounded-lg text-sm font-medium text-blue-200">
										Ряд {s.rowNumber}, Місце {s.seatNumber}
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="relative h-6 bg-[#020617] my-1px">
						<div className="absolute top-3 left-3 w-6 h-6 bg-[#020617] rounded-full border-r border-white/10"></div>
						<div className="absolute top-3 right-3 w-6 h-6 bg-[#020617] rounded-full border-l border-white/10"></div>
						<div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-gray-700"></div>
					</div>

					<div className="p-6 bg-[#051329] flex justify-between items-center">
						<p className="text-xs text-gray-500">Пред'явіть на вході</p>
						<div className="h-8 flex gap-1 opacity-40">
							{[...Array(15)].map((_, i) => (
								<div key={i} className={`h-full bg-white ${Math.random() > 0.5 ? 'w-1' : 'w-0.5'}`}></div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-10 flex flex-col md:flex-row gap-4 w-full max-w-md">
					<BaseButton 
						onClick={() => navigate('/profile')}
						className="w-full py-3 bg-[#0753E0] hover:bg-[#0642b5] shadow-lg shadow-blue-900/40 rounded-xl font-bold"
					>
						Мої квитки
					</BaseButton>
                    
					<button
						onClick={() => navigate('/')}
						className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-gray-300 font-semibold"
					>
						На головну
					</button>
				</div>

			</main>

		</div>
	);
};

export default TicketSuccess;