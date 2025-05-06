import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o ha sido eliminada.</p>
        <Link href="/">Volver al inicio</Link>
      </section>
    </main>
  );
}
