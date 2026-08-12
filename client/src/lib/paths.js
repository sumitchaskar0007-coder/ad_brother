const baseUrl = import.meta.env.BASE_URL || '/';
const basePath = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '');

export function withBase(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}` || '/';
}

export function withoutBase(pathname) {
  if (!basePath) return pathname;
  if (pathname === basePath) return '/';
  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
}
