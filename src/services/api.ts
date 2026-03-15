export const API_BASE = import.meta.env.VITE_API_URL || '';

export const authFetch = async (path: string, init: RequestInit = {}) => {
  const token = localStorage.getItem('auth_token');
  const headers = new Headers(init.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  return response;
};
