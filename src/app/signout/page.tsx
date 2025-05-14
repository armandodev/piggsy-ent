import { Section } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function SignOutPage() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return <div>Error signing out</div>;
  }

  return (
    <Section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">¡Hasta luego!</h1>
      <p className="mt-4 text-lg">Gracias por usar Piggsy.</p>
      <p className="mt-2 text-lg">Esperamos verte pronto.</p>
    </Section>
  );
}
