export interface AdminDashboardCard {
	title: string;
	description: string;
	buttonText: string;
	link: string;
}

export const ADMIN_DASHBOARD_CARDS: AdminDashboardCard[] = [
	{ 
		title: 'Фільми', 
		description: 'Додавання фільмів та іншої інформації', 
		buttonText: 'Додати', 
		link: '/admin/addMovie', 
	},
	{ 
		title: 'Редагування фільмів', 
		description: 'Редагування інформації фільмів', 
		buttonText: 'Редагування', 
		link: '/admin/editMoviesList', 
	},
	{ 
		title: 'Зали', 
		description: 'Керування залами', 
		buttonText: 'Зали', 
		link: '/admin/halls', 
	},
	{ 
		title: 'Статистика заробітку', 
		description: 'Перегляд фінансової статистики', 
		buttonText: 'Переглянути', 
		link: '/admin/statistic', 
	},
	{ 
		title: 'Сеанси', 
		description: 'Керування сеансами', 
		buttonText: 'Переглянути', 
		link: '/admin/sessions', 
	},
];