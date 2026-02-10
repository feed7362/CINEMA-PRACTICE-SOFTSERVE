export const getUserRole = (token: string | null): string | null => {
    if (!token) return null;

    try {
        const payload = JSON.parse(
            atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        );

        const possibleRoles: string[] = [];

        Object.values(payload).forEach((value) => {
            if (typeof value === 'string') {
                possibleRoles.push(value);
            }
            if (Array.isArray(value)) {
                value.forEach((v) => typeof v === 'string' && possibleRoles.push(v));
            }
        });

        const adminRole = possibleRoles.find((r) =>
            r.toLowerCase().includes('admin')
        );

        return adminRole ?? null;
    } catch {
        return null;
    }
};

export const isAdmin = (token: string | null): boolean => {
    return Boolean(getUserRole(token));
};
