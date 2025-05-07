import { LoginForm } from "@/components/forms";
import React from "react";

export const metadata = {
  title: "Iniciar sesión - Piggsy ENT",
};

export default function LoginPage() {
  return (
    <main className="grid place-items-center min-h-screen">
      <LoginForm />
    </main>
  );
}
