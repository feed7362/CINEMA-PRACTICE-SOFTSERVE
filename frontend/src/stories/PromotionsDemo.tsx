import React from 'react';
import PromotionCard, { type PromotionProps } from '@/components/shares/ShareCard';

const MOCK_PROMOTIONS: PromotionProps[] = [
  {
    id: '1',
    title: 'Студентський квиток',
    description: 'Отримуй знижку на будь-який фільм у будні дні до 18:00. Просто предʼяви студентський квиток на касі або введи номер при покупці онлайн.',
    discountValue: '-20%',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1000&auto=format&fit=crop',
    conditions: 'Діє з понеділка по пʼятницю до 18:00. Не сумується з іншими акціями.'
  },
  {
    id: '2',
    title: 'День народження',
    description: 'Твій день — твої правила! Отримуй безкоштовний квиток у кіно в день народження та протягом 3 днів після нього.',
    discountValue: 'Free',
    image: 'https://images.unsplash.com/photo-1464349153912-65637303d729?q=80&w=1000&auto=format&fit=crop',
    conditions: 'При наявності паспорта. Діє на сеанси формату 2D та 3D.'
  },
  {
    id: '3',
    title: 'Ранкова пташка',
    description: 'Для тих, хто не любить спати довго. Спеціальна ціна на ранкові сеанси для чудового початку дня.',
    discountValue: '100 ₴',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    conditions: 'Фіксована ціна на всі сеанси, що починаються до 11:00 ранку.'
  },
  {
    id: '4',
    title: 'Тест битого зображення',
    description: 'Це картка для перевірки відображення плейсхолдера, якщо картинка не завантажилась.',
    discountValue: '-50%',
    image: 'https://invalid-url.com/broken-image.jpg',
    conditions: 'Якщо ви бачите синій фон з текстом "Акція" — компонент працює вірно.'
  }
];

const PromotionsDemo: React.FC = () => {
  return (
    <div className="space-y-12 pb-20 text-white">
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Promotions & Shares</h1>
        <p className="text-gray-400">
          Картки акційних пропозицій для сторінки "Акції".
        </p>
      </div>

      <section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
          Promotion Cards Grid
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROMOTIONS.map((promo) => (
            <PromotionCard 
              key={promo.id}
              {...promo}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default PromotionsDemo;