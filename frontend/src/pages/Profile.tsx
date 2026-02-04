import React, {useEffect, useMemo, useState} from 'react';
import UserProfileCard from '@/components/profile/UserProfileCard';
import BookingItem, {type BookingSummaryDto} from '@/components/profile/BookingItem';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

import {getMe, getMyBookings, refundBooking} from '@/api/profileApi';

const Profile: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<BookingSummaryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [refundId, setRefundId] = useState<number | null>(null);

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
            await refundBooking(refundId);

            setBookings(prev => prev.filter(b => b.id !== refundId));
            setRefundId(null);
        } catch (error) {
            console.error(error);
            alert("Не вдалося повернути кошти");
        }
    };

    if (loading) return <LoadingSpinner/>;

    if (!user) {
        return <div className="text-white p-10">Не вдалося завантажити профіль</div>;
    }

    return (
        <div id="profile-page" className="text-white p-10 font-['Inter']">
            <div className="max-w-6xl mx-auto space-y-12">

                <UserProfileCard
                    user={user}
                    onUpdate={setUser}
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