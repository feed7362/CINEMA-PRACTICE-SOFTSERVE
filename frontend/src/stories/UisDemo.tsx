import React, { useState } from 'react';
import BaseButton from '@/components/ui/BaseButton';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import EditProfileButton from '@/components/profile/EditProfileButton';
import IconSidebar from '@/components/ui/IconSidebar'; 
import InfoRow from '@/components/ui/InfoRow';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/loader/LoadingSpinner';
import PasswordInput from '@/components/ui/PasswordInput';
import SessionButton from '@/components/session/SessionButton';

const UisDemo: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [selectedSession, setSelectedSession] = useState('14:30');

	const handleModalConfirm = () => {
		alert('Confirmed!');
		setIsModalOpen(false);
	};

	return (
		<div className="space-y-12 pb-20 text-white">
      
			<div>
				<h1 className="text-3xl font-bold mb-2">General UI Components</h1>
				<p className="text-gray-400">
					Базові компоненти інтерфейсу: кнопки, поля вводу, модальні вікна та індикатори.
				</p>
			</div>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Buttons & Controls
				</h2>
        
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-500 uppercase">BaseButton</h3>
						<div className="flex flex-wrap gap-4">
							<BaseButton onClick={() => {}}>Default</BaseButton>
							<BaseButton disabled onClick={() => {}}>Disabled</BaseButton>
							<BaseButton className="w-full">Full Width</BaseButton>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-500 uppercase">EditProfileButton</h3>
						<div className="flex flex-wrap gap-4">
							<EditProfileButton onClick={() => {}} />
							<EditProfileButton onClick={() => {}} className="px-8">
								Custom Text
							</EditProfileButton>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-500 uppercase">SessionButton</h3>
						<div className="flex flex-wrap gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
							{['10:00', '12:15', '14:30', '18:00'].map((time) => (
								<SessionButton 
									key={time}
									time={time}
									isSelected={selectedSession === time}
									onClick={() => setSelectedSession(time)}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Inputs & Forms
				</h2>
        
				<div className="max-w-xl space-y-6">
					<Input 
						id="demo-input"
						label="Standard Input"
						placeholder="Введіть текст..."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>

					<PasswordInput 
						id="demo-password"
						label="Password Input"
						placeholder="Введіть пароль..."
						value={passwordValue}
						onChange={(e) => setPasswordValue(e.target.value)}
					/>
				</div>
			</section>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Feedback & Information
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-500 uppercase">InfoRow</h3>
						<div className="bg-white/5 p-4 rounded-xl">
							<InfoRow label="Статус" value="Активний" />
							<InfoRow label="ID Користувача" value="#12345" />
							<InfoRow label="Баланс" value="500 ₴" />
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-500 uppercase">LoadingSpinner</h3>
						<div className="bg-white/5 p-4 rounded-xl flex items-center justify-center min-h-32">
							<LoadingSpinner />
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-bold text-gray-500 uppercase">IconSidebar</h3>
						<div className="flex justify-center">
							<IconSidebar />
						</div>
					</div>

				</div>
			</section>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Modals
				</h2>

				<div className="flex flex-col items-start gap-4">
					<p className="text-gray-400 text-sm">Натисніть кнопку, щоб викликати модальне вікно підтвердження.</p>
					<BaseButton onClick={() => setIsModalOpen(true)} className="px-8 bg-red-600 hover:bg-red-700">
						Open Confirmation Modal
					</BaseButton>
				</div>

				<ConfirmationModal 
					isOpen={isModalOpen}
					title="Підтвердження дії"
					message="Ви впевнені, що хочете виконати цю дію? Це лише демонстрація компонента."
					onConfirm={handleModalConfirm}
					onCancel={() => setIsModalOpen(false)}
				/>
			</section>

		</div>
	);
};

export default UisDemo;