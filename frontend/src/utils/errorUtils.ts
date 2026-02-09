export const parseBackendError = (data: any): string => {
	if (!data) return 'Сталася невідома помилка.';

	if (data.detail) return data.detail;

	if (Array.isArray(data)) {
		return data.map((err: any) => err.description || err.message).join('. ');
	}

	if (data.errors && typeof data.errors === 'object') {
		return Object.values(data.errors)
			.flat()
			.map((err: any) => typeof err === 'string' ? err : err.description)
			.join('. ');
	}

	return data.message || data.title || 'Не вдалося виконати запит.';
};