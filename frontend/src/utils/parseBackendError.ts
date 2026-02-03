export const parseBackendError = (data: any): string => {
    if (!data) return "Сталася невідома помилка.";

    if (Array.isArray(data)) {
        return data.map((err: any) => err.description).join(". ");
    }

    if (data.errors && typeof data.errors === 'object') {
        return Object.values(data.errors)
            .flat()
            .join(". ");
    }

    return data.message || data.title || "Не вдалося виконати запит.";
};