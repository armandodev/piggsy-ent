"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui";
import { login } from "@/lib/supabase/auth-actions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    const { error } = await login(new FormData(e.currentTarget));
    if (error) {
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
      return;
    }
    setSuccess("Inicio de sesión exitoso. Redirigiendo...");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-md mx-auto my-4 grid gap-4 p-4 bg-white shadow-md rounded-md"
    >
      <h1 className="grid text-center">
        <span className="text-3xl text-teal-900">Iniciar sesión</span>
        <span className="text-teal-500">Piggsy ENT</span>
      </h1>
      {error && (
        <p className="bg-red-100 text-red-500 p-2 rounded-md">{error}</p>
      )}
      {success && (
        <p className="bg-teal-100 text-teal-500 p-2 rounded-md">{success}</p>
      )}
      <Input
        id="email"
        label="Correo electrónico"
        type="email"
        placeholder="john.doe@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        placeholder="********"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200"
        type="submit"
      >
        Iniciar sesión
      </button>

      <p className="text-center text-gray-500">
        ¿No tienes una cuenta?{" "}
        <a href="/auth/signup" className="text-teal-500 hover:underline">
          Regístrate aquí
        </a>
      </p>
    </form>
  );
}
