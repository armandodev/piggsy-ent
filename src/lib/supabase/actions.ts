"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
}

export async function getTransactions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }
  return data;
}

export async function getTransaction(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
  return data;
}

export async function getAccounts(id: string) {
  const transaction = await getTransaction(id);
  if (!transaction) {
    return null;
  }
  const chargeId = transaction.charge;
  const creditId = transaction.credit;

  const supabase = await createClient();
  const charged_account = await supabase
    .from("account")
    .select("*")
    .eq("id", chargeId)
    .single();
  if (charged_account.error) {
    console.error("Error fetching account:", charged_account.error);
    return null;
  }

  const credit_account = await supabase
    .from("account")
    .select("*")
    .eq("id", creditId)
    .single();
  if (credit_account.error) {
    console.error("Error fetching account:", credit_account.error);
    return null;
  }
  return {
    charged_account: charged_account.data,
    credit_account: credit_account.data,
  };
}
