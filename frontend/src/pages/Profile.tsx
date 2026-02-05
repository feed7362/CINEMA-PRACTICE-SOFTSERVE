import React from 'react';
import UserProfileCard from '@/components/profile/UserProfileCard';
import BookingItem from '@/components/profile/BookingItem';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useProfile } from '@/hooks/useProfile';
import { useRefundLogic } from '@/hooks/useRefundLogic';
import type { BookingSummary } from '@/types/booking';

const Profile: React.FC = () => {
    const { 
        user, 
        loading, 
        activeBookings, 
        historyBookings, 
        setUser, 
        handleLogout, 
        removeBookingFromState 
    } = useProfile();

    const { 
        refundId, 
        openRefundModal, 
        closeRefundModal, 
        confirmRefund 
    } = useRefundLogic(removeBookingFromState);

    if (loading) return <LoadingSpinner />;

    if (!user) {
        return <div className="text-white p-10 text-center">Не вдалося завантажити профіль</div>;
    }

    return (
        <div id="profile-page" className="text-white p-10 font-['Inter']">
            <div className="max-w-6xl mx-auto space-y-12">

                <UserProfileCard
                    user={user}
                    onUpdate={setUser}
                    onLogout={handleLogout}
                />

                <section
                    id="profile-active"
                    className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6"
                >
                    <h3 className="text-3xl font-bold">Активні бронювання</h3>
                    
                    {activeBookings.length === 0 ? (
                        <p className="text-zinc-400">Немає активних бронювань</p>
                    ) : (
                        activeBookings.map((booking: BookingSummary) => (
                            <BookingItem
                                key={booking.id}
                                booking={booking}
                                onRefund={openRefundModal}
                                isHistory={false}
                            />
                        ))
                    )}
                </section>

                <section
                id="profile-history"
                className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6"
            >
                <h3 className="text-3xl font-bold">Історія сеансів</h3>

                {historyBookings.length === 0 ? (
                    <p className="text-zinc-400">Історія порожня</p>
                ) : (
                    historyBookings.map((booking: BookingSummary) => (
                        <BookingItem
                            key={booking.id}
                            booking={booking}
                            onRefund={openRefundModal}
                            isHistory={true}
                        />
                    ))
                )}
                </section>

            </div>

            <ConfirmationModal
                isOpen={refundId !== null}
                title="Скасувати бронювання?"
                message="Кошти будуть повернуті на карту. Ви впевнені?"
                onCancel={closeRefundModal}
                onConfirm={confirmRefund}
            />
        </div>
    );
};

export default Profile;