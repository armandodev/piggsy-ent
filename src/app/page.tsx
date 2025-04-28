"use server";

import { Navbar } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl text-teal-900 font-bold">Piggsy ENT</h1>
        <h2 className="text-lg">Bienvenido {data.user.email}</h2>
      </main>
    </>
  );
}
