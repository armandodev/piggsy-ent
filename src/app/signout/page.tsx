import { signout } from "@/lib/supabase/actions";
import Link from "next/link";

export default async function SignoutPage() {
  await signout();
  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl text-teal-900 font-bold">Cierre de sesión</h1>
      <p className="text-lg">Has cerrado sesión correctamente, hasta pronto.</p>
      <Link
        className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
        href="/login"
        aria-label="Ir a la página de inicio de sesión"
      >
        Iniciar sesión
      </Link>
    </main>
  );
}
