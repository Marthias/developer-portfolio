import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DEFAULT_SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function ensureEnv(url?: string, key?: string) {
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

/**
 * Create a Supabase client.
 * If `url` and `key` are omitted, the function falls back to NEXT_PUBLIC_* env vars.
 */
export function createClient(
  url: string | undefined = DEFAULT_SUPABASE_URL,
  key: string | undefined = DEFAULT_SUPABASE_KEY
): SupabaseClient {
  ensureEnv(url, key);
  return createSupabaseClient(url as string, key as string);
}

export function createSupabaseBrowserClient(): SupabaseClient {
  return createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_KEY);
}

// Convenience singleton for modules that import `{ supabase }`.
export const supabase = createClient();
