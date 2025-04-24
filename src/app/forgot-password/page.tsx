"use client";

import { useState } from "react";
import { InputEmail } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <main>
      <h1>Recuperar contraseña</h1>
      <form onSubmit={handleSubmit}>
        <InputEmail required value={email} onChange={handleEmailChange} />
        <button type="submit">Recuperar contraseña</button>
      </form>
      <p>
        ¿Recordaste tu contraseña?{" "}
        <a href="/login" aria-label="Ir a la página de inicio de sesión">
          Inicia sesión aquí
        </a>
      </p>
    </main>
  );
}
