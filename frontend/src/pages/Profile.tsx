import React, { useEffect, useMemo, useState } from 'react';
import UserProfileCard from '@/components/profile/UserProfileCard';
import TicketItem from '@/components/profile/TicketItem';
import type { TicketDto } from '@/components/profile/TicketItem';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import { getMe, getMyTickets, getMyBookings } from '@/api/profileApi';

type BookingDto = {
  id: number;
  createdAt?: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [tickets, setTickets] = useState<TicketDto[]>([]);
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refundId, setRefundId] = useState<number | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const me = await getMe();
      const t = await getMyTickets();
      const b = await getMyBookings();

      setUser({
        name: me.email, 
        email: me.email,
        phone: '',
      });

      setTickets(t.items ?? t);
      setBookings(b.items ?? b);

    } catch (e) {
      console.error("Profile load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const { activeTickets, historyTickets } = useMemo(() => {
    const now = new Date();

    const active: TicketDto[] = [];
    const history: TicketDto[] = [];

    tickets.forEach(t => {
      if (new Date(t.startTime) > now && t.status === 'ACTIVE') {
        active.push(t);
      } else {
        history.push(t);
      }
    });

    return { activeTickets: active, historyTickets: history };
  }, [tickets]);

  const handleRefund = (ticketId: number) => {
    setRefundId(ticketId);
  };

  const confirmRefund = () => {
    if (!refundId) return;

    setTickets(prev => prev.filter(t => t.ticketId !== refundId));
    setRefundId(null);
  };

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <div className="text-white p-10">Не вдалося завантажити профіль</div>;
  }

  return (
    <div id="profile-page" className="text-white p-10">
      <div className="max-w-6xl mx-auto space-y-12">

        <UserProfileCard
          user={user}
          onUpdate={setUser}
        />

        <div
          id="profile-active-tickets"
          className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6"
        >
          <h3 className="text-3xl font-bold">Активні квитки</h3>

          {activeTickets.length === 0 && (
            <p className="text-zinc-400">Немає активних квитків</p>
          )}

          {activeTickets.map(ticket => (
            <TicketItem
              key={ticket.ticketId}
              ticket={ticket}
              onRefund={handleRefund}
            />
          ))}
        </div>

        <div
          id="profile-history"
          className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6"
        >
          <h3 className="text-3xl font-bold">Історія сеансів</h3>

          {historyTickets.length === 0 && (
            <p className="text-zinc-400">Історія порожня</p>
          )}

          {historyTickets.map(ticket => (
            <div
              key={ticket.ticketId}
              id={`history-ticket-${ticket.ticketId}`}
              className="bg-black/30 rounded-2xl p-6 border border-white/5"
            >
              <div className="font-bold text-lg">
                {ticket.movieTitle}
              </div>

              <div className="text-sm text-zinc-400">
                {new Date(ticket.startTime).toLocaleString()}
              </div>

              <div className="text-xs text-zinc-500">
                {ticket.hallName} · ряд {ticket.rowNumber} · місце {ticket.seatNumber}
              </div>
            </div>
          ))}
        </div>

      </div>

      <ConfirmationModal
        isOpen={refundId !== null}
        title="Повернути квиток?"
        message="Ви впевнені що хочете скасувати квиток?"
        onCancel={() => setRefundId(null)}
        onConfirm={confirmRefund}
      />
    </div>
  );
};

export default Profile;
