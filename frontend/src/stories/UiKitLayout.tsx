import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const UiKitLayout: React.FC = () => {
	const links = [
		{ to: 'buttons', label: 'Buttons (Кнопки)' },
		{ to: 'uis', label: 'General UI (Інпути, Модалки)' },
		{ to: 'movies', label: 'Movies (Картки, Трейлер)' },
		{ to: 'schedule', label: 'Schedule (Календар)' },
		{ to: 'profiles', label: 'Profile & Booking' },
		{ to: 'payments', label: 'Payments & Seats' },
		{ to: 'filters', label: 'Filters Sidebar' },
		{ to: 'contacts', label: 'Contacts Page' },
		{ to: 'promotions', label: 'Promotions' },
		{ to: 'layout', label: 'Layout (Header/Footer)' },
	];

	return (
		<div className="min-h-screen bg-[#020617] text-white font-['Inter'] flex">
			<aside className="w-64 border-r border-white/10 p-6 flex flex-col shrink-0 bg-[#051329] h-screen sticky top-0 overflow-y-auto custom-scrollbar">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0]">UI Kit <span className="text-xs text-gray-500 font-normal ml-2">v1.0</span></h2>
				<nav className="flex flex-col gap-2">
					{links.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							className={({ isActive }) =>
								`px-4 py-2 rounded-lg text-sm transition-colors ${
									isActive 
										? 'bg-[#0753E0] text-white font-bold shadow-lg shadow-blue-900/20' 
										: 'text-gray-400 hover:bg-white/5 hover:text-white'
								}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>
			</aside>

			<main className="grow p-10 overflow-y-auto h-screen bg-[#020617]">
				<div className="max-w-5xl mx-auto">
					<Outlet /> 
				</div>
			</main>
		</div>
	);
};

export default UiKitLayout;