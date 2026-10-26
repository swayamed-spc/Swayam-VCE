// Only https links are stored, so nothing like javascript: or http: ever reaches an <img> or <a> on the site
export function isHttpsUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}
