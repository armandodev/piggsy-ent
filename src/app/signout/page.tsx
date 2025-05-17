import { Layout, Section } from "@/components/ui";
import { signout } from "@/lib/supabase/actions/auth";
import Link from "next/link";
import React from "react";

export default function SignOutPage() {
  signout();
  return (
    <Layout>
      <Section>
        <h1 className="text-2xl font-bold">¡Hasta luego!</h1>
        <p className="text-lg">
          Gracias por usar Piggsy, esperamos verte pronto.
        </p>
        <Link href="/" className="text-teal-500 hover:underline">
          Ir al inicio de sesión
        </Link>
      </Section>
    </Layout>
  );
}
