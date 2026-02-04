import React from 'react';
import BaseButton from '@/components/ui/BaseButton';

export type TicketDto = {
  ticketId: number;
  movieTitle: string;
  hallName: string;
  rowNumber: number;
  seatNumber: number;
  seatType: string;
  startTime: string;
  status: string;
};

interface TicketItemProps {
  ticket: TicketDto;
  onRefund: (ticketId: number) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onRefund }) => {
  const date = new Date(ticket.startTime);

  return (
    <div
      id={`ticket-item-${ticket.ticketId}`}
      className="bg-black/30 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 border border-white/5"
    >
      <div className="space-y-2 text-white">
        <h4 className="text-xl font-bold">
          {ticket.movieTitle}
        </h4>

        <p className="text-zinc-300 text-sm">
          🎬 {ticket.hallName}
        </p>

        <p className="text-zinc-300 text-sm">
          💺 Ряд {ticket.rowNumber}, місце {ticket.seatNumber}
        </p>

        <p className="text-zinc-300 text-sm">
          🕒 {date.toLocaleDateString()} —{" "}
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>

        <span className="inline-block bg-green-600/20 text-green-400 border border-green-600/50 text-xs font-bold px-3 py-1 rounded-full">
          {ticket.status}
        </span>
      </div>

      <BaseButton
        className="px-5 py-2 rounded-lg text-sm font-semibold"
        onClick={() => onRefund(ticket.ticketId)}
      >
        Повернути
      </BaseButton>
    </div>
  );
};

export default TicketItem;
