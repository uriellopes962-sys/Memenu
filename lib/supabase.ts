import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Lazily creates the Supabase service-role client on first use, so that
// simply importing this module (e.g. during Next.js's build-time page-data
// collection) never throws even if env vars aren't set yet.
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Faltan PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno."
    );
  }

  client = createClient(url, serviceKey, { auth: { persistSession: false } });
  return client;
}
