import { createClient } from "@/lib/supabase/server";
import { Balance } from "@/types/balance";

export async function getBalance(user_id: string): Promise<Balance> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("balance")
    .select("balance, details, budget")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return data[0] ?? (await setDefaultBalance(user_id));
}

async function setDefaultBalance(user_id: string): Promise<Balance> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("balance")
    .insert([{ user_id, balance: 0 }])
    .select();

  if (error) throw new Error(error.message);

  return data[0];
}
