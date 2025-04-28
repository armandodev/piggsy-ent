"use server";

import { Navbar } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <main>
      <h1>Piggsy ENT</h1>
      <h2>Bienvenido {data.user.email}</h2>
      <Link href="/signout">Cerrar sesión</Link>
    </main>
  );
}
