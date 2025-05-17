import { NewTransactionForm } from "@/components/forms";
import { getAccounts } from "@/lib/supabase/actions/transactions/transaction-actions";
import React from "react";
import { Section } from "@/components/ui";

export const metadata = {
  title: "Nueva transacción - Piggsy ENT",
};

export default async function NewTransactionPage() {
  // Obtener las cuentas del servidor
  const result = await getAccounts();

  // Si hay un error al obtener las cuentas
  if (result.error) {
    return (
      <main className="grid place-items-center min-h-screen">
        <Section className="bg-red-50 border border-red-200">
          <h1 className="text-2xl text-red-800 text-center mb-4">Error</h1>
          <p className="text-red-600">
            No se pudieron cargar las cuentas: {result.error.message}
          </p>
          <p className="mt-4 text-red-600">
            Por favor, intenta recargar la página o contacta al administrador.
          </p>
        </Section>
      </main>
    );
  }

  // Si no hay cuentas
  if (!result.data || Object.keys(result.data).length === 0) {
    return (
      <main className="grid place-items-center min-h-screen">
        <Section className="bg-yellow-50 border border-yellow-200">
          <h1 className="text-2xl text-yellow-800 text-center mb-4">
            No hay cuentas disponibles
          </h1>
          <p className="text-yellow-600">
            No se encontraron cuentas en el sistema. Por favor, crea cuentas
            antes de registrar transacciones.
          </p>
        </Section>
      </main>
    );
  }

  // Si todo está bien, renderizar el formulario
  return (
    <main className="grid place-items-center min-h-screen">
      <NewTransactionForm accounts={result.data} />
    </main>
  );
}
