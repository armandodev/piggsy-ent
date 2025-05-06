import { createBrowserClient } from "@supabase/ssr";
import { supabaseConfig } from "@/lib/supabase/config";

export function createClient() {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.anonKey);
}
