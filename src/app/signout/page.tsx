import { Section } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";

export default async function SignOutPage() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return <div>Error signing out</div>;
  }

  return (
    <main className="grid place-items-center min-h-screen">
      <Section className="grid">
        <h1 className="text-2xl font-bold">¡Hasta luego!</h1>
        <p className="mt-4 text-lg">
          Gracias por usar Piggsy, esperamos verte pronto.
        </p>
        <Link href="/" className="mt-4 text-teal-500 hover:underline">
          Ir al inicio de sesión
        </Link>
      </Section>
    </main>
  );
}
