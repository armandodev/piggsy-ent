import { logout } from "@/lib/supabase/auth-actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main>
      <h1>Bienvenido a Piggsy ENT</h1>
      <h2>Hola {user?.user?.user_metadata?.email || "Usuario"}</h2>
      <form>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors duration-300 cursor-pointer"
          formAction={logout}
        >
          Logout
        </button>
      </form>
    </main>
  );
}
