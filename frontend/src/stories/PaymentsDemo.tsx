import React, { useState, useEffect } from 'react';

const MOCK_SEATS = Array.from({ length: 40 }, (_, i) => ({
	id: i + 1,
	rowNumber: Math.ceil((i + 1) / 8),
	seatNumber: (i % 8) + 1,
	isReserved: [2, 3, 15, 16, 30].includes(i + 1),
	type: [18, 19, 20, 21].includes(i + 1) ? 'VIP' : 'STANDARD',
}));

const PaymentsDemo: React.FC = () => {
	const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
	const [timerState] = useState<'active' | 'expired'>('active');
	const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		if (timerState === 'expired') return;
		const interval = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(interval);
	}, [timerState]);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	const toggleSeat = (id: number) => {
		if (selectedSeats.includes(id)) {
			setSelectedSeats((prev) => prev.filter((s) => s !== id));
		} else {
			setSelectedSeats((prev) => [...prev, id]);
		}
	};

	return (
		<div className="space-y-12 pb-20 text-white">
      
			<div>
				<h1 className="text-3xl font-bold mb-2">Booking & Payments</h1>
				<p className="text-gray-400">
					Демонстрація інтерфейсу вибору місць та процесу оплати (Mocked Data).
				</p>
			</div>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Seat Selection UI
				</h2>
        
				<div className="flex flex-col items-center max-w-2xl mx-auto">
					{/* Screen */}
					<div className="relative mb-12 w-full">
						<div className="h-12 w-full bg-linear-to-b from-[#0753E0]/20 to-transparent transform perspective-normal rotate-x-30 rounded-t-[50%] blur-sm"></div>
						<div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-[#0753E0] to-transparent shadow-[0_0_20px_rgba(7,83,224,0.8)] rounded-full"></div>
						<p className="text-center text-[10px] text-[#0753E0] mt-4 tracking-[0.5em] uppercase font-bold opacity-70">Екран</p>
					</div>

					{/* Grid */}
					<div className="grid grid-cols-8 gap-3 mb-10">
						{MOCK_SEATS.map((seat) => {
							const isSelected = selectedSeats.includes(seat.id);
							let seatClass = 'bg-white/10 border-white/10 text-white/60 hover:bg-white/30'; // Standard

							if (seat.isReserved) {
								seatClass = 'bg-white/5 border-transparent text-white/10 cursor-not-allowed';
							} else if (isSelected) {
								seatClass = 'bg-[#0753E0] border-[#0753E0] text-white shadow-[0_0_15px_rgba(7,83,224,0.6)] scale-110 z-10';
							} else if (seat.type === 'VIP') {
								seatClass = 'bg-amber-500/20 border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black shadow-[0_0_5px_rgba(245,158,11,0.2)]';
							}

							return (
								<button
									key={seat.id}
									disabled={seat.isReserved}
									onClick={() => toggleSeat(seat.id)}
									className={`w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg border-b-[3px] flex items-center justify-center text-xs font-bold transition-all duration-200 ${seatClass}`}
								>
									{seat.seatNumber}
								</button>
							);
						})}
					</div>

					<div className="flex gap-6 text-xs text-gray-400">
						<div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/10 rounded-sm"></div> Вільне</div>
						<div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500/20 border-b-2 border-amber-500/50 rounded-sm"></div> VIP</div>
						<div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#0753E0] rounded-sm shadow-lg"></div> Обране</div>
						<div className="flex items-center gap-2"><div className="w-3 h-3 bg-white/5 rounded-sm opacity-50"></div> Зайнято</div>
					</div>
				</div>
			</section>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Checkout UI States
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
					<div className="flex flex-col gap-6 p-6 bg-[#020617] rounded-xl border border-white/5">
						<h3 className="text-gray-400 text-sm font-bold uppercase">State: Active Timer</h3>
                
						<div className="text-center py-3 rounded bg-amber-500/10 border border-amber-500/20 font-mono text-amber-500 font-bold">
							Залишилося часу: {formatTime(timeLeft)}
						</div>

						<div className="bg-[#0f172a] p-4 rounded-md border border-white/10 h-12 flex items-center text-gray-500 text-sm">
							[ Stripe Card Element Placeholder ]
						</div>

						<button 
							onClick={() => setIsProcessing(!isProcessing)}
							className="w-full py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest shadow-lg shadow-blue-600/30 transition-all active:scale-95"
						>
							{isProcessing ? 'Обробка...' : 'Оплатити 400 ₴'}
						</button>
					</div>

					<div className="flex flex-col gap-6 p-6 bg-[#020617] rounded-xl border border-white/5">
						<h3 className="text-gray-400 text-sm font-bold uppercase">State: Expired / Error</h3>
                
						<div className="text-center py-3 rounded bg-red-500/10 border border-red-500/20 font-mono text-red-500 font-bold">
							Час бронювання вичерпано!
						</div>

						<div className="bg-[#0f172a] p-4 rounded-md border border-white/10 h-12 flex items-center text-gray-500 text-sm opacity-50">
							[ Stripe Card Element Disabled ]
						</div>

						<div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-xs text-center">
							Помилка оплати: Недостатньо коштів на картці.
						</div>

						<button 
							disabled
							className="w-full py-4 rounded-full bg-gray-800 text-gray-600 font-black uppercase tracking-widest cursor-not-allowed"
						>
							Оплатити зараз
						</button>
					</div>

				</div>
			</section>

		</div>
	);
};

export default PaymentsDemo;