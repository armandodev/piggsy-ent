"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = {
    email: email.trim(),
    password: password.trim(),
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.error("Error signing up:", error.message);
    return {
      error: "Error signing up: " + error.message,
    };
  }
  console.log("User signed up successfully:", data);
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = {
    email: email.trim(),
    password: password.trim(),
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.error("Error logging in:", error.message);
    return {
      error: "Error logging in: " + error.message,
    };
  }
  console.log("User logged in successfully:", data);
  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
    return {
      error: "Error logging out: " + error.message,
    };
  }
  console.log("User logged out successfully");
  redirect("/auth/login");
}
