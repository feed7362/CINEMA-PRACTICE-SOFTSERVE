import React from 'react';

interface Seat {
	row: number;
	col: number;
	price: number;
}

interface BookingSummaryProps {
	movieTitle?: string;
	date?: string;
	time?: string;
	ticketPrice: number;
	selectedSeats: Seat[];
	onPay: () => void;
	onBack: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ 
	movieTitle = 'Назва фільму', 
	date = 'Дата сеансу', 
	time = '00:00', 
	ticketPrice, 
	selectedSeats, 
	onPay, 
	onBack, 
}) => {
  
	const totalPrice = selectedSeats.length * ticketPrice;

	return (
		<div className="bg-[#001233]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl h-full flex flex-col justify-between">
			<div>
				<h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
					{movieTitle}
				</h3>

				<div className="flex justify-between items-start mb-6">
					<div>
						<span className="text-gray-400 text-sm block mb-1">Дата</span>
						<div className="text-lg font-medium text-gray-200">{date}</div>
					</div>
					<div className="text-right">
						<span className="text-gray-400 text-sm block mb-1">Ціна квитка</span>
						<div className="text-lg font-medium text-blue-400">{ticketPrice} грн</div>
					</div>
				</div>

				<div className="mb-8">
					<span className="text-gray-400 text-sm block mb-2">Час сеансу</span>
					<div className="inline-block px-4 py-2 rounded-lg border border-blue-500/50 bg-blue-500/10 text-blue-300 font-mono">
						{time}
					</div>
				</div>

				{selectedSeats.length > 0 && (
					<div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5 animate-in fade-in zoom-in duration-200">
						<div className="text-sm text-gray-400 mb-2">Обрані місця:</div>
						<div className="flex flex-wrap gap-2">
							{selectedSeats.map((seat, i) => (
								<span key={i} className="text-xs font-bold bg-blue-600 px-2 py-1 rounded text-white">
									Р{seat.row + 1} / М{seat.col + 1}
								</span>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="space-y-4 pt-6 border-t border-white/10">
				<div className="flex justify-between items-center text-lg">
					<span className="text-gray-300">До сплати:</span>
					<span className="text-2xl font-bold text-white">{totalPrice} грн</span>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<button 
						onClick={onBack}
						className="py-3 rounded-xl bg-[#0041C4] hover:bg-[#0035A0] text-white font-medium transition-all active:scale-95"
					>
						Назад
					</button>
					<button 
						onClick={onPay}
						className={`py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
							selectedSeats.length > 0 
								? 'bg-[#0041C4] hover:bg-[#0035A0] text-white shadow-blue-900/40' 
								: 'bg-white/10 text-gray-500 cursor-not-allowed'
						}`}
						disabled={selectedSeats.length === 0}
					>
						Оплатити
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookingSummary;