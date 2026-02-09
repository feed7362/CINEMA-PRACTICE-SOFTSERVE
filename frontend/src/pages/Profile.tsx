import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserProfileCard from '@/components/profile/UserProfileCard';
import BookingItem from '@/components/profile/BookingItem';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import BaseButton from '@/components/ui/BaseButton';
import { getMe, getMyBookings, refundBooking } from '@/api/profileApi';
import type { BookingSummary } from '@/types/booking';
import { isAdmin } from '@/utils/authUtils';

const Profile: React.FC = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<any>(null);
	const [bookings, setBookings] = useState<BookingSummary[]>([]);
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
				getMyBookings(),
			]);

			setUser({
				name: me.email,
				email: me.email,
			});
			setBookings(bookingsData.items || []);
		} catch (e) {
			console.error('Profile load error:', e);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/auth');
	};

	const { activeBookings, historyBookings } = useMemo(() => {
		const now = new Date();
		const active: BookingSummary[] = [];
		const history: BookingSummary[] = [];

		bookings.forEach((b) => {
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

		return { activeBookings: active, historyBookings: history };
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
				msg: `Успішно! ₴${response.amountRefunded} буде повернуто на карту.`,
				type: 'success',
			});
			setBookings((prev) => prev.map((b) => b.id === refundId ? { ...b, status: 'CANCELLED' } : b));
			setRefundId(null);
		} catch (error: any) {
			const errorMsg = error.response?.data?.message || 'Не вдалося повернути кошти';
			setFeedback({ msg: errorMsg, type: 'error' });
		} finally {
			setIsRefunding(false);
			setTimeout(() => setFeedback(null), 5000);
		}
	};

	const isUserAdmin = useMemo(() => isAdmin(), []);

	if (loading) return <LoadingSpinner />;
	if (!user) return <div className="text-white p-10 text-center">Не вдалося завантажити профіль</div>;

	return (
		<div id="profile-page" className="text-white p-10 font-['Inter']">
			<div className="max-w-6xl mx-auto space-y-12">
				{feedback && (
					<div className={`fixed top-10 right-10 z-100 p-4 rounded-2xl border shadow-2xl ${
						feedback.type === 'success' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'
					}`}>
						<p className="font-bold">{feedback.msg}</p>
					</div>
				)}

				<div className="space-y-6">
					<UserProfileCard
						user={user}
						onUpdate={setUser}
						onLogout={handleLogout}
					/>

					{isUserAdmin && (
						<div className="flex justify-end">
							<Link to="/admin">
								<BaseButton className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20 border border-emerald-500/30 transition-all">
									Панель Адміністратора
								</BaseButton>
							</Link>
						</div>
					)}
				</div>

				<section id="profile-active" className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6">
					<h3 className="text-3xl font-bold">Активні бронювання</h3>
					{activeBookings.length === 0 ? (
						<p className="text-zinc-400">Немає активних бронювань</p>
					) : (
						activeBookings.map((booking) => (
							<BookingItem key={booking.id} booking={booking} onRefund={handleRefund} isHistory={false} />
						))
					)}
				</section>

				<section id="profile-history" className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6">
					<h3 className="text-3xl font-bold">Історія сеансів</h3>
					{historyBookings.length === 0 ? (
						<p className="text-zinc-400">Історія порожня</p>
					) : (
						historyBookings.map((booking) => (
							<BookingItem key={booking.id} booking={booking} onRefund={handleRefund} isHistory={true} />
						))
					)}
				</section>
			</div>

			<ConfirmationModal
				isOpen={refundId !== null}
				title="Скасувати бронювання?"
				message="Кошти будуть повернуті на карту. Ви впевнені?"
				onCancel={() => !isRefunding && setRefundId(null)}
				onConfirm={confirmRefund}
			/>
		</div>
	);
};

export default Profile;