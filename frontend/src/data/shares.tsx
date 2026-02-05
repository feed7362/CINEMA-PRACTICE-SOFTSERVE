import type { PromotionProps } from '@/components/shares/ShareCard';

export const PROMOTIONS_DATA: PromotionProps[] = [
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