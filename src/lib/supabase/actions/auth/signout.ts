import { createClient } from "@/lib/supabase/server";

export default async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
