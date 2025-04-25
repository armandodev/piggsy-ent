import { signout } from "@/lib/supabase/actions";

export default async function SignoutPage() {
  await signout();
  return (
    <main>
      <h1>Cierre de sesión</h1>
      <p>Has cerrado sesión correctamente.</p>
      <p>
        <a href="/login" aria-label="Ir a la página de inicio de sesión">
          Inicia sesión aquí
        </a>
      </p>
    </main>
  );
}
