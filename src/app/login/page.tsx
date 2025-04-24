"use client";

import { useState } from "react";
import { Input, InputEmail, Submit } from "@/components/ui";
import { login } from "@/lib/supabase/actions/auth";

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
    <main>
      <h1>Iniciar sesión</h1>
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
        <Submit label="Ingresar" action={login} />
      </form>
      <p>
        ¿No tienes una cuenta?{" "}
        <a href="/signup" aria-label="Ir a la página de registro">
          Regístrate aquí
        </a>
      </p>
    </main>
  );
}
