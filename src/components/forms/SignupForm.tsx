"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui";
import { signup } from "@/lib/supabase/auth-actions";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El correo electrónico no es válido");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    signup(new FormData(e.currentTarget));
    setSuccess(
      "Registro exitoso. Por favor, verifica tu correo electrónico para confirmar tu cuenta."
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-md mx-auto my-4 grid gap-4 p-4 bg-white shadow-md rounded-md"
    >
      <h1 className="grid text-center">
        <span className="text-3xl text-teal-900">Registro</span>
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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Input
          id="password"
          label="Contraseña"
          type="password"
          placeholder="********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          id="confirm-password"
          label="Confirmar contraseña"
          type="password"
          placeholder="********"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200"
        type="submit"
      >
        Registrar
      </button>

      <p className="text-center text-gray-500">
        ¿Ya tienes una cuenta?{" "}
        <a href="/auth/login" className="text-teal-500 hover:underline">
          Iniciar sesión
        </a>
      </p>
    </form>
  );
}
