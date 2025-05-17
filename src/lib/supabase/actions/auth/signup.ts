"use server";

import { createClient } from "@/lib/supabase/server";

export async function signup({
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
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      return {
        success: false,
        message: "Error al registrarse",
      };
    }

    return {
      success: true,
      message:
        "Registro exitoso. Por favor, verifica tu correo electrónico para confirmar tu cuenta.",
    };
  } catch (e) {
    return {
      success: false,
      message: "Error inesperado durante el registro",
    };
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  return await signup({ email, password });
}
