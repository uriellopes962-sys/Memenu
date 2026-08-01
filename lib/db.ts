import { sql } from "@vercel/postgres";

let schemaReady: Promise<void> | null = null;

export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT now()
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS weeks (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          data JSONB NOT NULL,
          saved_at TIMESTAMPTZ DEFAULT now()
        );
      `;
    })();
  }
  return schemaReady;
}

export { sql };
