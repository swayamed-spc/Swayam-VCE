// Neon over HTTP: each query is one stateless HTTPS request, so there is no connection pool to manage.
// neon-http does not support interactive transactions; use db.batch([...]) for multi-statement atomic writes.
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema.js'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set (see backend/.env.example)')

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle({ client: sql, schema })
