/**
 * Prepends the Vite base URL to an internal link if necessary.
 */
export function resolveHref(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  if (path.startsWith(base)) {
    return path
  }

  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}
