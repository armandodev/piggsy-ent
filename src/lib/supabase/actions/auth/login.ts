"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const data = {
    email: email.trim(),
    password: password.trim(),
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return {
        success: false,
        message: "Error al iniciar sesión, verifica tus credenciales",
      };
    }

    return { success: true };
  } catch (e) {
    return {
      success: false,
      message: "Error inesperado durante la validación",
    };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Campos requeridos" };
  }

  const result = await login({ email, password });

  if (result.success) {
    redirect("/");
  }

  return result;
}
