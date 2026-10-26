// Checked before querying, because PostgreSQL throws (a 500) on a malformed uuid instead of finding no row
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const isUuid = (value) => typeof value === 'string' && UUID.test(value)
