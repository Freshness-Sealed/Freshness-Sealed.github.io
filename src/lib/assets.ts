/**
 * Prefix a /public path with the site's base URL so it works both locally
 * ("/") and on a GitHub Pages project site ("/repo-name/").
 */
export function asset(path: string) {
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}
