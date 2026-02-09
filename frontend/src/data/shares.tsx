import type { PromotionProps } from '@/components/shares/ShareCard';

export const PROMOTIONS_DATA: PromotionProps[] = [
	{
		id: '1',
		title: 'Знижка до Дня народження',
		description: 'Святкуйте свій день разом з нами! Даруємо приємну знижку на квиток іменинника.',
		discountValue: '-30%',
		conditions: 'Діє в день народження та наступного дня за наявності паспорта.',
		image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: '2',
		title: 'Студентський бум',
		description: 'Відпочинь від навчання! Студентський тариф діє на денні сеанси.',
		discountValue: '-20%',
		conditions: 'Діє за наявності студентського квитка з Пн по Ср до 18:00.',
		image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: '3',
		title: 'Дякуємо захисникам',
		description: 'Спеціальна пропозиція для військовослужбовців ЗСУ, НГУ та ТРО на всі сеанси.',
		discountValue: '-35%',
		conditions: 'Знижка надається за наявності посвідчення УБД або військового квитка.',
		image: 'https://images.unsplash.com/photo-1579912437766-79b884d6b677?q=80&w=2070&auto=format&fit=crop',
	},
	{
		id: '4',
		title: 'Дитячий клуб',
		description: 'Знижка для маленьких глядачів до 10 років на ранкові мультфільми.',
		discountValue: '-15%',
		conditions: 'Для дітей до 10 років на сеанси до 12:00. Діти до 5 років — безкоштовно без місця.',
		image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=2069&auto=format&fit=crop',
	},
];