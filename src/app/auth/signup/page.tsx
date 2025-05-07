import { SignupForm } from "@/components/forms";
import React from "react";

export const metadata = {
  title: "Registro - Piggsy ENT",
};

export default function SignupPage() {
  return (
    <main className="grid place-items-center min-h-screen">
      <SignupForm />
    </main>
  );
}
