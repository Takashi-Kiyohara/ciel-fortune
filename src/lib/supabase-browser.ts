import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Browser-side Supabase client (anon key — respects RLS)
// Supabase未設定時は null を返す（デモモード対応）

let client: SupabaseClient | null = null;

export function createSupabaseBrowser(): SupabaseClient | null {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("xxxx")) {
    return null;
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
