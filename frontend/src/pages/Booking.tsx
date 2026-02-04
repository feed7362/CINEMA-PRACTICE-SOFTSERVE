import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeatGrid from '../components/booking/SeatGrid';
import BookingSummary from '../components/booking/BookingSummary';

// Розширений інтерфейс місця
interface SeatData {
  row: number;
  col: number;
  price: number;
  type: 'standard' | 'premium';
}

const Booking: React.FC = () => {
  const navigate = useNavigate();
  
  // === КОНФІГУРАЦІЯ (70 місць) ===
  const rows = 7; 
  const cols = 10;
  
  // Ціни
  const STANDARD_PRICE = 200;
  const PREMIUM_PRICE = 350;

  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);

  const occupiedSeats = [
    { row: 3, col: 4 }, 
    { row: 3, col: 5 },
    { row: 6, col: 2 }, // Зайняте в преміум ряду
  ];

  // Функція, яка визначає тип місця і ціну залежно від ряду
  const getSeatInfo = (r: number, c: number): { price: number; type: 'standard' | 'premium' } => {
    // Нехай останні 2 ряди (індекси 5 і 6) будуть Premium
    if (r >= 5) {
      return { price: PREMIUM_PRICE, type: 'premium' };
    }
    return { price: STANDARD_PRICE, type: 'standard' };
  };

  const isOccupied = (r: number, c: number) => occupiedSeats.some(s => s.row === r && s.col === c);
  const isSelected = (r: number, c: number) => selectedSeats.some(s => s.row === r && s.col === c);

  // Оновлена функція кліку
  const handleToggleSeat = (r: number, c: number, type: 'standard' | 'premium', price: number) => {
    if (isOccupied(r, c)) return;
    
    if (isSelected(r, c)) {
      setSelectedSeats(selectedSeats.filter(s => !(s.row === r && s.col === c)));
    } else {
      setSelectedSeats([...selectedSeats, { row: r, col: c, price, type }]);
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 pt-10 pb-10">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-white drop-shadow-lg">
        Бронювання квитка
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        
        {/* ЛІВА ЧАСТИНА */}
        <div className="flex-grow bg-[#001233]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-xl font-medium mb-8 text-blue-100 text-center">Вибір місця</h2>
          
          <SeatGrid 
            rows={rows} 
            cols={cols} 
            selectedSeats={selectedSeats} 
            occupiedSeats={occupiedSeats} 
            onToggleSeat={handleToggleSeat}
            getSeatInfo={getSeatInfo} // Передаємо логіку цін в сітку
          />
        </div>

        {/* ПРАВА ЧАСТИНА */}
        <div className="w-full lg:w-96 shrink-0">
          <BookingSummary 
            movieTitle="Джокер"
            date="Пт, 16 січня"
            time="16:00"
            // Передаємо базову ціну, хоча Summary краще рахуватиме на основі масиву selectedSeats
            ticketPrice={STANDARD_PRICE} 
            selectedSeats={selectedSeats}
            onBack={() => navigate(-1)}
            onPay={() => alert('Перехід до оплати...')} 
          />
        </div>

      </div>
    </div>
  );
};

export default Booking;