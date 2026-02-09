import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '@/components/ui/BaseButton';

const Forbidden: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-[#020617] text-white font-['Inter'] flex flex-col items-center justify-center relative overflow-hidden px-6">
      
			<div className="absolute top-1/2 left-1/2 w-150 h-150 bg-red-600/20 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

			<div className="relative z-10 text-center max-w-lg">
				<h1 className="text-9xl font-black text-white/5 mb-4 select-none">403</h1>
        
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
					<div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
						<svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
				</div>

				<h2 className="text-3xl font-bold mb-4">Доступ заборонено</h2>
				<p className="text-gray-400 mb-8">
					Вибачте, але у вас недостатньо прав для перегляду цієї сторінки. 
					Якщо ви вважаєте, що це помилка — зверніться до адміністратора.
				</p>

				<div className="flex justify-center gap-4">
					<BaseButton 
						onClick={() => navigate('/')}
						className="bg-[#0753E0] hover:bg-[#0642b5] px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/40"
					>
						На головну
					</BaseButton>
				</div>
			</div>
		</div>
	);
};

export default Forbidden;