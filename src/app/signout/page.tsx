import { signout } from "@/lib/supabase/actions";
import Link from "next/link";

export default async function SignoutPage() {
  await signout();
  return (
    <main>
      <h1>Cierre de sesión</h1>
      <p>Has cerrado sesión correctamente.</p>
      <p>
        <Link href="/login" aria-label="Ir a la página de inicio de sesión">
          Inicia sesión aquí
        </Link>
      </p>
    </main>
  );
}
