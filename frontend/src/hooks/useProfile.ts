import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, getMyBookings } from '@/api/profileApi';
import type { BookingSummary } from '@/types/booking'; 
import type { UserProfile } from '@/types/user';

export const useProfile = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserProfile | null>(null);
	const [bookings, setBookings] = useState<BookingSummary[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
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
		navigate('/login');
	};

	const removeBookingFromState = (id: number) => {
		setBookings((prev) => prev.filter((b) => b.id !== id));
	};

	const { activeBookings, historyBookings } = useMemo<{
		activeBookings: BookingSummary[];
		historyBookings: BookingSummary[];
	}>(() => {
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

	return {
		user,
		loading,
		activeBookings,
		historyBookings,
		setUser,
		handleLogout,
		removeBookingFromState,
	};
};