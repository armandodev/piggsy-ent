"use client";

import { useState } from "react";
import { Input, InputEmail, Submit } from "@/components/ui";
import { signup } from "@/lib/supabase/actions";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="grid gap-4 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Crear cuenta
          </h1>
          <p className="text-sm text-gray-600">
            Ingresa tus credenciales para crear una cuenta
          </p>
        </div>

        <form className="grid gap-4">
          <InputEmail required value={email} onChange={handleEmailChange} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              label="Contraseña"
              required
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
            <Input
              type="password"
              id="confirm-password"
              name="confirm-password"
              autoComplete="current-password"
              label="Confirmar contraseña"
              required
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <Submit label="Crear cuenta" action={signup} />
        </form>
        <p className="text-sm text-center text-gray-600">
          Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            aria-label="Ir a la página de inicio de sesión"
            className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </section>
    </main>
  );
}
