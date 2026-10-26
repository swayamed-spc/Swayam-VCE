// Helpers shared by the raw SQL queries in the registrations, payments and events modules.
import { sql } from 'drizzle-orm'

// ADMIN manages every event; EVENT_HEAD only events they created. `createdBy` is the events.created_by column to test.
export const canManageEvent = (user, createdBy) =>
  user.role === 'ADMIN' ? sql`true` : sql`${createdBy} = ${user.id}::uuid`

// Raw queries return snake_case columns; the API speaks camelCase like Drizzle's builder does
export const camelRow = (row) =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()), v]))
