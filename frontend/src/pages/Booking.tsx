import React from 'react';
import { useParams } from 'react-router-dom';
import BaseButton from '@/components/ui/BaseButton';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import { useBooking } from '@/hooks/useBooking';
import type { Seat } from '@/types/booking';

const Booking: React.FC = () => {
	const { sessionId } = useParams<{ sessionId: string }>();
    
	const { 
		selectedIds, 
		isLoading, 
		error, 
		seatsByRow, 
		toggleSeat, 
		bookSeats, 
	} = useBooking(sessionId);

	const getSeatStyles = (seat: Seat) => {
		const isSelected = selectedIds.includes(seat.id);

		if (seat.isReserved) {
			return 'bg-white/5 text-white/10 cursor-not-allowed border-transparent';
		}
		if (isSelected) {
			return 'bg-[#0753E0] text-white border-[#0753E0] scale-110 shadow-[0_0_15px_rgba(7,83,224,0.6)] z-10';
		}
		if (seat.seatType.toLowerCase() === 'vip') {
			return 'bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]';
		}
		return 'bg-white/10 text-white/60 border-white/10 hover:bg-white/30 hover:text-white hover:border-white/30';
	};

	if (isLoading) return <LoadingSpinner />;
    
	if (error) {
		return (
			<div className="min-h-screen bg-[#020617] text-white flex flex-col">
				<div className="grow flex items-center justify-center">
					<div className="text-red-500 text-xl">{error}</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#020617] text-white font-['Inter'] flex flex-col relative overflow-hidden">
			<div className="absolute top-0 left-0 w-150 h-150 bg-[#0753E0] rounded-full blur-[150px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
			<div className="absolute bottom-20 right-0 w-125 h-125 bg-[#0753E0] rounded-full blur-[180px] opacity-10 pointer-events-none translate-x-1/3 translate-y-1/3" />

			<main className="grow container mx-auto px-6 pt-28 pb-40 relative z-10">
				<header className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-2">Оберіть місця</h2>
					<p className="text-gray-400">Сеанс №{sessionId}</p>
				</header>

				<div className="relative mb-24 max-w-3xl mx-auto">
					<div className="h-16 w-full bg-linear-to-b from-[#0753E0]/20 to-transparent transform perspective-125 rotate-x-30 rounded-t-[50%] blur-sm"></div>
					<div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-[#0753E0] to-transparent shadow-[0_0_20px_rgba(7,83,224,0.8)] rounded-full"></div>
					<p className="text-center text-xs text-[#0753E0] mt-6 tracking-[0.5em] uppercase font-semibold opacity-70">Екран</p>
				</div>

				<div className="flex flex-col gap-3 items-center w-full overflow-x-auto pb-10 no-scrollbar">
					{Object.entries(seatsByRow).map(([row, rowSeats]) => (
						<div key={row} className="flex items-center gap-4 min-w-max">
							<span className="w-8 text-right text-xs font-bold text-gray-500 mr-2">{row}</span>
							<div className="flex gap-2 sm:gap-3">
								{rowSeats.map((seat) => (
									<button
										key={seat.id}
										disabled={seat.isReserved}
										title={`${seat.seatType === 'Vip' ? 'VIP Місце' : 'Звичайне місце'} (Ряд ${row}, Місце ${seat.seatNumber})`}
										className={`w-8 h-8 sm:w-10 sm:h-10 text-[10px] sm:text-xs font-bold flex items-center justify-center rounded-t-lg border-b-[3px] transition-all duration-300 ease-out ${getSeatStyles(seat)}`}
										onClick={() => toggleSeat(seat.id, seat.isReserved)}
									>
										{seat.seatNumber}
									</button>
								))}
							</div>
							<span className="w-8 text-left text-xs font-bold text-gray-500 ml-2">{row}</span>
						</div>
					))}
				</div>
			</main>

			<div className="fixed bottom-0 left-0 right-0 z-50">
				<div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl border-t border-white/10" />
				<div className="relative container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    
					<div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-gray-400">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-white/10 rounded-sm border border-white/10"></div> Звичайне
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-amber-500/20 rounded-sm border border-amber-500/50"></div> VIP
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-[#0753E0] rounded-sm shadow-[0_0_10px_rgba(7,83,224,0.5)]"></div> Ваше
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-white/5 rounded-sm opacity-50"></div> Зайнято
						</div>
					</div>

					<div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
						<div className="text-right">
							<p className="text-gray-500 text-[10px] uppercase tracking-wider">Обрано квитків</p>
							<p className="text-2xl font-bold text-white leading-none">{selectedIds.length}</p>
						</div>
						<BaseButton
							className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
								selectedIds.length > 0 
									? 'bg-[#0753E0] hover:bg-[#0642b5] shadow-[#0753E0]/30' 
									: 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed shadow-none hover:bg-gray-800'
							}`}
							disabled={selectedIds.length === 0}
							onClick={bookSeats}
						>
							До оплати →
						</BaseButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Booking;