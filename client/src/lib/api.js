const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function apiUrl(path) {
  return `${apiBase}${path}`;
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json().catch(() => ({})) : {};
  if (!response.ok) {
    const unavailable = !isJson && path.startsWith('/api/');
    throw new Error(payload.error || (unavailable
      ? 'The dashboard server is not connected. Deploy the API and MongoDB Atlas to sign in.'
      : 'The request could not be completed.'));
  }
  return payload;
}
