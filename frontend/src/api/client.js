// Every call to the backend goes through api(). It sends the login cookie (credentials: 'include'), unwraps the
// backend's { success, data, message } envelope and turns failures into ApiError with the server's message.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(status, message, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

export async function api(path, { method = 'GET', body } = {}) {
  return send(path, {
    method,
    headers: body === undefined ? undefined : { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

// Uploads one file as multipart/form-data in the field "file" (the browser sets the boundary header itself)
export function upload(path, file) {
  const form = new FormData()
  form.append('file', file)
  return send(path, { method: 'POST', body: form })
}

// Files the API serves (uploaded UPI QR images) are stored as /api/... paths. When the API is on another domain
// (VITE_API_URL), they need that prefix; full https links are used as they are.
export const assetUrl = (p) => (typeof p === 'string' && p.startsWith('/api/') ? BASE + p : p)

async function send(path, init) {
  let res
  try {
    res = await fetch(`${BASE}/api${path}`, { ...init, credentials: 'include' })
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your connection and try again.')
  }
  let json = null
  try {
    json = await res.json()
  } catch {
    // empty or non-JSON body (e.g. a proxy error page)
  }
  if (!res.ok || json?.success === false) {
    const fallback = res.status === 429 ? 'Too many attempts. Please wait a few minutes and try again.' : `Something went wrong (${res.status}). Please try again.`
    throw new ApiError(res.status, json?.message || fallback, json?.data)
  }
  return json?.data ?? null
}
