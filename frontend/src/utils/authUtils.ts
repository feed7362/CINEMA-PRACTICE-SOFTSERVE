export const getUserRole = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);

    if (decoded.exp) {
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.warn("Token expired");
        localStorage.removeItem('token'); 
        return null;
      }
    }

    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role || null;
    
    if (Array.isArray(role)) {
       return role.find(r => r.toLowerCase() === 'admin') || role[0];
    }

    return role;
  } catch (e) {
    console.error("Invalid token", e);
    localStorage.removeItem('token');
    return null;
  }
};

export const isAdmin = (): boolean => {
  const role = getUserRole();
  return role?.toLowerCase() === 'admin';
};