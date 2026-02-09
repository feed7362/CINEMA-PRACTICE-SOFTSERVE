import React from 'react';
import { Link } from 'react-router-dom';
import PromotionCard from '@/components/shares/ShareCard';
import { PROMOTIONS_DATA } from '@/data/shares';

const Shares: React.FC = () => {
	return (
		<div className="relative w-full min-h-screen bg-[#020617] font-['Inter'] pb-20 overflow-hidden">
      
			<div className="absolute top-0 right-0 w-125 h-125 bg-[#0753E0] rounded-full blur-[200px] opacity-15 pointer-events-none z-0" />
			<div className="absolute bottom-0 left-0 w-100 h-100 bg-[#051838] rounded-full blur-[150px] opacity-30 pointer-events-none z-0" />

			<div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
						Акції та <span className="text-[#3b82f6]">Знижки</span>
					</h1>
					<p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
						Ми цінуємо кожного глядача! Ознайомтеся з нашими постійними пропозиціями.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
					{PROMOTIONS_DATA.map((promo) => (
						<PromotionCard 
							key={promo.id}
							{...promo}
						/>
					))}
				</div>

				<Link 
					to="/contacts"
					className="block mt-20 p-8 rounded-3xl bg-linear-to-r from-[#051838] to-[#0a2757] border border-white/5 text-center shadow-2xl group hover:border-[#0753E0]/30 transition-all duration-300"
				>
					<h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#3b82f6] transition-colors">
						Залишилися питання?
					</h3>
					<p className="text-white/70 mb-0 group-hover:text-white transition-colors">
						Натисніть сюди, щоб зв'язатися з нами або знайти контакти гарячої лінії.
					</p>
				</Link>

			</div>
		</div>
	);
};

export default Shares;