import React, { useState } from 'react';
import UserProfileCard from '@/components/profile/UserProfileCard';
import BookingItem, { type BookingSummaryDto } from '@/components/profile/BookingItem';

const MOCK_USER = {
	name: 'Олександр Петренко',
	email: 'alex.petrenko@example.com',
};

const MOCK_BOOKINGS: BookingSummaryDto[] = [
	{
		id: 101,
		movieTitle: 'Дюна: Частина друга',
		startTime: new Date(Date.now() + 86400000).toISOString(), 
		bookingTime: new Date(Date.now() - 10000000).toISOString(),
		ticketCount: 2,
		totalAmount: 400,
		status: 'CONFIRMED',
	},
	{
		id: 102,
		movieTitle: 'Кунг-фу Панда 4',
		startTime: new Date(Date.now() + 172800000).toISOString(),
		bookingTime: new Date(Date.now() - 5000000).toISOString(),
		ticketCount: 3,
		totalAmount: 450,
		status: 'PENDING',
	},
	{
		id: 103,
		movieTitle: 'Оппенгеймер',
		startTime: '2023-12-10T19:00:00',
		bookingTime: '2023-12-05T15:20:00',
		ticketCount: 1,
		totalAmount: 200,
		status: 'CANCELLED',
	},
];

const ProfilesDemo: React.FC = () => {
	const [user, setUser] = useState(MOCK_USER);
	const [bookings, setBookings] = useState<BookingSummaryDto[]>(MOCK_BOOKINGS);

	const handleUserUpdate = (updatedUser: typeof MOCK_USER) => {
		setUser(updatedUser);
		alert(`API Call: Update User \nName: ${updatedUser.name}\nEmail: ${updatedUser.email}`);
	};

	const handleLogout = () => {
		alert('API Call: Logout triggered');
	};

	const handleRefund = (id: number) => {
		if (window.confirm('Ви впевнені, що хочете скасувати це бронювання?')) {
			setBookings((prev) => prev.map((b) => 
				b.id === id ? { ...b, status: 'CANCELLED' } : b,
			));
		}
	};

	return (
		<div className="space-y-12 pb-20 text-white">
      
			<div>
				<h1 className="text-3xl font-bold mb-2">Profile & Bookings</h1>
				<p className="text-gray-400">
					Демонстрація картки профілю та списку бронювань.
				</p>
			</div>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					User Profile Card
				</h2>
        
				<div className="max-w-3xl">
					<UserProfileCard 
						user={user} 
						onUpdate={handleUserUpdate} 
						onLogout={handleLogout} 
					/>
				</div>
			</section>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Booking History List
				</h2>
				<p className="text-sm text-gray-400 mb-6">
					Список квитків з різними статусами. Кнопка "Місця" робить запит до API (у демо режимі може не працювати без моку).
				</p>
        
				<div className="max-w-4xl space-y-4">
					{bookings.map((booking) => (
						<BookingItem 
							key={booking.id} 
							booking={booking} 
							onRefund={handleRefund}
							isHistory={booking.status === 'CANCELLED'}
						/>
					))}
				</div>
			</section>

		</div>
	);
};

export default ProfilesDemo;