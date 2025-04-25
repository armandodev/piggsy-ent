"use client";

import { useState } from "react";
import { Input, InputEmail, Submit } from "@/components/ui";
import { signup } from "@/lib/supabase/actions";

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
    <main>
      <h1>Crear cuenta</h1>
      <form>
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
        <Submit label="Crear cuenta" action={signup} />
      </form>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" aria-label="Ir a la página de inicio de sesión">
          Inicia sesión aquí
        </a>
      </p>
    </main>
  );
}
