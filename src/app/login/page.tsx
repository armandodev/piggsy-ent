"use client";

import type React from "react";

import { useState } from "react";
import { Input, InputEmail, Submit } from "@/components/ui";
import { login } from "@/lib/supabase/actions";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="grid gap-4 w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h1>
          <p className="text-sm text-gray-600">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        <form className="grid gap-4">
          <InputEmail required value={email} onChange={handleEmailChange} />
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
          <Submit label="Ingresar" action={login} />
        </form>

        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/signup"
            aria-label="Ir a la página de registro"
            className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </section>
    </main>
  );
}
