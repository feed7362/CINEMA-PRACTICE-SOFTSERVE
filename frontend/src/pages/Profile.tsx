import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import UserProfileCard from '@/components/profile/UserProfileCard';
import BookingItem from '@/components/profile/BookingItem';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import BaseButton from '@/components/ui/BaseButton';
import { useProfile } from '@/hooks/useProfile';
import { useRefundLogic } from '@/hooks/useRefundLogic';
import type { BookingSummary } from '@/types/booking';
import { isAdmin } from '@/utils/authUtils';

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

    const isUserAdmin = useMemo(() => isAdmin(), []);

    if (loading) return <LoadingSpinner />;

    if (!user) {
        return <div className="text-white p-10 text-center">Не вдалося завантажити профіль</div>;
    }

    return (
        <div id="profile-page" className="text-white p-10 font-['Inter']">
            <div className="max-w-6xl mx-auto space-y-12">

                <div className="space-y-6">
                    <UserProfileCard
                        user={user}
                        onUpdate={setUser}
                        onLogout={handleLogout}
                    />

                    {isUserAdmin && (
                        <div className="flex justify-end animate-in fade-in slide-in-from-top-2 duration-500">
                            <Link to="/admin">
                                <BaseButton className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20 border border-emerald-500/30 transition-all flex items-center gap-2">
                                    Панель Адміністратора
                                </BaseButton>
                            </Link>
                        </div>
                    )}
                </div>

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