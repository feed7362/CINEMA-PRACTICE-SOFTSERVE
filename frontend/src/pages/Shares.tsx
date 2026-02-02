import React from 'react';
import PromotionCard from '@/components/promotions/PromotionCard';
import type { PromotionProps } from '@/components/promotions/PromotionCard';

const SHARES_DATA: PromotionProps[] = [
  {
    id: '1',
    title: 'Знижка до Дня народження',
    description: 'Святкуйте свій день разом з нами! Отримайте квиток у подарунок на будь-який сеанс.',
    discountValue: '-100%',
    conditions: 'Діє 7 днів до та після дня народження за наявності паспорта.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Студентський бум',
    description: 'Відпочинь від навчання! Спеціальна ціна на квитки для студентів з понеділка по середу.',
    discountValue: '-50%',
    conditions: 'Діє за наявності студентського квитка на сеанси до 18:00 (Пн-Ср).',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Дякуємо захисникам',
    description: 'Постійна пропозиція для військовослужбовців ЗСУ, НГУ та ТРО.',
    discountValue: 'БЕЗКОШТОВНО',
    conditions: 'Вхід вільний за наявності посвідчення УБД або військового квитка.',
    image: 'https://images.unsplash.com/photo-1579912437766-79b884d6b677?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Дитячий клуб',
    description: 'Знижка для маленьких глядачів до 12 років на всі ранкові сеанси мультфільмів.',
    discountValue: '-30%',
    conditions: 'Для дітей до 12 років. Діти до 5 років — безкоштовно (без місця).',
    image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=2069&auto=format&fit=crop'
  }
];

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
          {SHARES_DATA.map((promo) => (
            <PromotionCard 
              key={promo.id}
              {...promo}
            />
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-linear-to-r from-[#051838] to-[#0a2757] border border-white/5 text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-3">
            Залишилися питання?
          </h3>
          <p className="text-white/70 mb-0">
            Деталі уточнюйте на касі кінотеатру або за телефоном гарячої лінії.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Shares;