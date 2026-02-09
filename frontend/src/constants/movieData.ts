export const MOVIE_GENRES = [
	'Бойовик', 'Комедія', 'Драма', 'Жахи', 'Фантастика', 
	'Трилер', 'Мелодрама', 'Детектив', 'Мультфільм', 'Історичний',
].map((g) => ({ value: g, label: g }));

export const MOVIE_STATUS_OPTIONS = [
	{ value: 'soon', label: 'Скоро в кіно' },
	{ value: 'now', label: 'В кіно' },
	{ value: 'sale', label: 'Акція' },
	{ value: 'ended', label: 'Прокат завершено' },
];