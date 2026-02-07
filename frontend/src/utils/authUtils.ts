interface DecodedToken {
  exp: number;
  role?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  [key: string]: any;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded: DecodedToken = JSON.parse(jsonPayload);

    if (decoded.exp) {
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.warn("Token expired");
        localStorage.removeItem('token');
        return null;
      }
    }

    const roleClaim = 
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
      decoded.role || 
      null;

    if (!roleClaim) return null;

    if (Array.isArray(roleClaim)) {
       const adminRole = roleClaim.find(r => r.toLowerCase() === 'admin' || r.toLowerCase() === 'administrator');
       return adminRole || roleClaim[0];
    }

    return roleClaim as string;

  } catch (e) {
    console.error("Invalid token format", e);
    localStorage.removeItem('token');
    return null;
  }
};

export const isAdmin = (): boolean => {
  const role = getUserRole();
  return role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'administrator';
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token') && getUserRole() !== null;
};