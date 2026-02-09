import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const LayoutsDemo: React.FC = () => {
	return (
		<div className="space-y-12 pb-20 text-white">
      
			<div>
				<h1 className="text-3xl font-bold mb-2">Layout</h1>
				<p className="text-gray-400">
					Демонстрація Header та Footer у контексті сторінки.
				</p>
			</div>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Page Simulation
				</h2>
        
				<div className="w-full h-[600px] rounded-xl border border-white/10 overflow-hidden relative flex flex-col bg-[#020617] shadow-2xl">
					<div className="bg-[#0f172a] px-4 py-2 border-b border-white/5 flex items-center gap-2">
						<div className="flex gap-1.5">
							<div className="w-3 h-3 rounded-full bg-red-500/50" />
							<div className="w-3 h-3 rounded-full bg-yellow-500/50" />
							<div className="w-3 h-3 rounded-full bg-green-500/50" />
						</div>
						<div className="mx-auto bg-black/20 px-4 py-1 rounded text-xs text-gray-500 font-mono">
							netfilm.cinema/home
						</div>
					</div>

					<div className="flex-grow overflow-y-auto flex flex-col relative scroll-smooth">
						<Header />

						<main className="flex-grow container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-6">
							<div className="w-24 h-24 bg-[#0753E0]/10 rounded-full flex items-center justify-center text-[#0753E0] animate-pulse">
								<span className="text-4xl">🍿</span>
							</div>
							<h1 className="text-3xl font-bold text-white">Основний контент сторінки</h1>
							<p className="text-gray-400 max-w-lg">
								Це демонстраційний контейнер. Хедер зверху має властивість sticky, 
								тому він залишатиметься закріпленим при скролі, а футер завжди буде притиснутий до низу 
								завдяки flex-grow на цьому блоці.
							</p>
              
							<div className="grid grid-cols-3 gap-4 w-full max-w-2xl mt-10 opacity-30">
								{[...Array(6)].map((_, i) => (
									<div key={i} className="h-40 bg-white/5 rounded-lg"></div>
								))}
							</div>
						</main>

						<Footer />
					</div>
				</div>
			</section>

			<section className="grid grid-cols-1 gap-8">
				<div className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
					<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
						Isolated Footer
					</h2>
					<div className="border border-white/10 rounded-xl overflow-hidden">
						<Footer />
					</div>
				</div>
			</section>
		</div>
	);
};

export default LayoutsDemo;