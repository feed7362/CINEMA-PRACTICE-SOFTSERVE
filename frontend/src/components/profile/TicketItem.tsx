import React from 'react';
import BaseButton from '@/components/ui/BaseButton';

interface TicketMovie {
  title: string;
  poster: string;
  ageRating: string;
}

interface TicketItemProps {
  movie: TicketMovie;
  sessionTime: string;
  onRefund: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ movie, sessionTime, onRefund }) => {
  return (
    <div className="bg-black/30 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 border border-white/5">
      <div className="flex gap-6 items-center w-full">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-20 h-28 object-cover rounded-xl shadow-lg"
        />
        <div className="space-y-2 text-white">
          <h4 className="text-xl font-bold">{movie.title}</h4>
          <p className="text-zinc-300 text-sm">
            Сеанс: {sessionTime} · Вік: {movie.ageRating}
          </p>
          <span className="inline-block bg-green-600/20 text-green-400 border border-green-600/50 text-xs font-bold px-3 py-1 rounded-full">
            ACTIVE
          </span>
        </div>
      </div>
      
      <BaseButton
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 font-semibold transition-all duration-300 shadow-lg shadow-red-900/20"
        onClick={onRefund}
      >
        Повернути
      </BaseButton>
    </div>
  );
};

export default TicketItem;