import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import UserProfileCard from '@/components/profile/UserProfileCard';
import BookingItem, {type BookingSummaryDto} from '@/components/profile/BookingItem';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import {getMe, getMyBookings, refundBooking} from '@/api/profileApi';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<BookingSummaryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [refundId, setRefundId] = useState<number | null>(null);
    const [isRefunding, setIsRefunding] = useState(false);
    const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);

            const [me, bookingsData] = await Promise.all([
                getMe(),
                getMyBookings()
            ]);

            setUser({
                name: me.email,
                email: me.email,
            });

            setBookings(bookingsData.items || []);

        } catch (e) {
            console.error("Profile load error:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    const {activeBookings, historyBookings} = useMemo(() => {
        const now = new Date();

        const active: BookingSummaryDto[] = [];
        const history: BookingSummaryDto[] = [];

        bookings.forEach(b => {
            const bookingDate = new Date(b.startTime);
            const isConfirmed = b.status === 'CONFIRMED';

            if (isConfirmed && bookingDate > now) {
                active.push(b);
            } else {
                history.push(b);
            }
        });

        active.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        history.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

        return {activeBookings: active, historyBookings: history};
    }, [bookings]);

    const handleRefund = (id: number) => {
        setRefundId(id);
    };

    const confirmRefund = async () => {
        if (!refundId) return;

        try {
            setIsRefunding(true);
            const response = await refundBooking(refundId);

            setFeedback({
                msg: `Успішно! ₴${response.amountRefunded} буде повернуто на вашу карту.`,
                type: 'success'
            });

            setBookings(prev => prev.map(b =>
                b.id === refundId ? {...b, status: 'CANCELLED'} : b
            ));

            setRefundId(null);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || "Не вдалося повернути кошти";
            setFeedback({msg: errorMsg, type: 'error'});
        } finally {
            setIsRefunding(false);
            setTimeout(() => setFeedback(null), 5000);
        }
    };

    if (loading) return <LoadingSpinner/>;

    if (!user) {
        return <div className="text-white p-10">Не вдалося завантажити профіль</div>;
    }

    return (
        <div id="profile-page" className="text-white p-10 font-['Inter']">
            <div className="max-w-6xl mx-auto space-y-12">
                {feedback && (
                    <div
                        className={`fixed top-10 right-10 z-100 p-4 rounded-2xl border shadow-2xl animate-in fade-in slide-in-from-right-10 ${
                            feedback.type === 'success' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'
                        }`}>
                        <p className="font-bold">{feedback.msg}</p>
                    </div>
                )}
                <UserProfileCard
                    user={user}
                    onUpdate={setUser}
                    onLogout={handleLogout}
                />
                <ConfirmationModal
                    isOpen={refundId !== null}
                    title="Скасувати бронювання?"
                    message="Кошти будуть повернуті на карту. Ви впевнені?"
                    onCancel={() => !isRefunding && setRefundId(null)}
                    onConfirm={confirmRefund}
                />
                <div
                    id="profile-active"
                    className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6"
                >
                    <h3 className="text-3xl font-bold">Активні бронювання</h3>

                    {activeBookings.length === 0 && (
                        <p className="text-zinc-400">Немає активних бронювань</p>
                    )}

                    {activeBookings.map(booking => (
                        <BookingItem
                            key={booking.id}
                            booking={booking}
                            onRefund={handleRefund}
                            isHistory={false}
                        />
                    ))}
                </div>

                <div
                    id="profile-history"
                    className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6"
                >
                    <h3 className="text-3xl font-bold">Історія сеансів</h3>

                    {historyBookings.length === 0 && (
                        <p className="text-zinc-400">Історія порожня</p>
                    )}

                    {historyBookings.map(booking => (
                        <BookingItem
                            key={booking.id}
                            booking={booking}
                            onRefund={handleRefund}
                            isHistory={true}
                        />
                    ))}
                </div>

            </div>

            <ConfirmationModal
                isOpen={refundId !== null}
                title="Скасувати бронювання?"
                message="Кошти будуть повернуті на карту. Ви впевнені?"
                onCancel={() => setRefundId(null)}
                onConfirm={confirmRefund}
            />
        </div>
    );
};

export default Profile;