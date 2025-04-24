"use server";

import { createClient } from "@/lib/supabase/server";
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
      <a href="/signout">Cerrar sesión</a>
    </main>
  );
}
