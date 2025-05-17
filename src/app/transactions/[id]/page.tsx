import { deleteTransaction } from "@/lib/supabase/actions/transactions/transaction-actions";
import { Section } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";

export default async function TransactionPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Obtener detalles de la transacción
  const { data: transaction_details, error } = await supabase
    .from("transaction_details")
    .select("*")
    .eq("transaction_id", params.id);

  if (error) {
    console.error("Error fetching transaction details:", error);
    return <div>Error loading transaction details</div>;
  }

  // Obtener datos de la transacción principal
  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (transactionError) {
    console.error("Error fetching transaction:", transactionError);
    return <div>Error loading transaction</div>;
  }

  // Obtener las cuentas involucradas
  const accountIds = [
    ...new Set(transaction_details.map((item) => item.account_id)),
  ];

  const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("id, name, account_type")
    .in("id", accountIds);

  if (accountsError) {
    console.error("Error fetching accounts:", accountsError);
    return <div>Error loading accounts</div>;
  }

  // Crear mapa de cuentas para facilitar el acceso
  const accountMap = {};
  accounts.forEach((account) => {
    accountMap[account.id] = {
      name: account.name,
      account_type: account.account_type,
    };
  });

  // Formatear los detalles de la transacción con nombres de cuentas
  const transaction_details_formatted = transaction_details.map((detail) => ({
    ...detail,
    account_name: accountMap[detail.account_id]?.name || "Cuenta desconocida",
    account_type: accountMap[detail.account_id]?.account_type || "Desconocido",
  }));

  // Agrupar por tipo de cuenta para la visualización T
  const tAccounts = {};
  transaction_details_formatted.forEach((detail) => {
    if (!tAccounts[detail.account_id]) {
      tAccounts[detail.account_id] = {
        name: detail.account_name,
        type: detail.account_type,
        debits: [],
        credits: [],
      };
    }

    if (detail.type === "cargo") {
      tAccounts[detail.account_id].debits.push(detail);
    } else {
      tAccounts[detail.account_id].credits.push(detail);
    }
  });

  // Calcular totales
  const totals = transaction_details_formatted.reduce(
    (acc, detail) => {
      if (detail.type === "cargo") {
        acc.totalDebit += detail.amount;
      } else {
        acc.totalCredit += detail.amount;
      }
      return acc;
    },
    { totalDebit: 0, totalCredit: 0 }
  );

  // Función para manejar eliminación de transacción
  async function handleDelete() {
    "use server";

    const formData = new FormData();
    formData.append("id", params.id);
    await deleteTransaction(formData);
    redirect("/transactions");
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Section>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {transaction?.description}
        </h1>

        <div className="flex gap-2">
          <Link
            href={`/transactions/edit/${params.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Editar
          </Link>

          <form action={handleDelete}>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600">Fecha:</p>
            <p className="font-medium">{formatDate(transaction?.date)}</p>
          </div>
          <div>
            <p className="text-gray-600">Importe total:</p>
            <p className="font-medium">${totals.totalDebit.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Estado:</p>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                transaction?.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {transaction?.status === "completed" ? "Completada" : "Pendiente"}
            </span>
          </div>
          {transaction?.reference && (
            <div>
              <p className="text-gray-600">Referencia:</p>
              <p className="font-medium">{transaction.reference}</p>
            </div>
          )}
        </div>

        {transaction?.notes && (
          <div className="mt-2">
            <p className="text-gray-600">Notas:</p>
            <p className="mt-1">{transaction.notes}</p>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">Asientos contables</h2>

      {/* Vista de tabla tradicional */}
      <div className="mb-8">
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left">Cuenta</th>
              <th className="px-4 py-2 text-right">Cargo</th>
              <th className="px-4 py-2 text-right">Abono</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transaction_details_formatted.map((detail) => (
              <tr key={detail.id} className="bg-white">
                <td className="px-4 py-3">{detail.account_name}</td>
                <td className="px-4 py-3 text-right">
                  {detail.type === "cargo"
                    ? `$${detail.amount.toFixed(2)}`
                    : "-"}
                </td>
                <td className="px-4 py-3 text-right">
                  {detail.type === "abono"
                    ? `$${detail.amount.toFixed(2)}`
                    : "-"}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td className="px-4 py-3">Totales</td>
              <td className="px-4 py-3 text-right">
                ${totals.totalDebit.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right">
                ${totals.totalCredit.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vista de Cuentas T */}
      <h2 className="text-xl font-semibold mb-4">Cuentas T</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(tAccounts).map((account) => (
          <div key={account.name} className="border border-gray-200 rounded-lg">
            <div className="bg-gray-100 px-4 py-2 font-medium rounded-t-lg">
              {account.name}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              {/* Lado izquierdo - Débitos */}
              <div className="p-3">
                <p className="text-center text-gray-500 mb-2">Cargo</p>
                {account.debits.map((debit) => (
                  <p key={debit.id} className="text-right mb-1">
                    ${debit.amount.toFixed(2)}
                  </p>
                ))}
                {account.debits.length === 0 && (
                  <p className="text-right text-gray-400">-</p>
                )}
              </div>

              {/* Lado derecho - Créditos */}
              <div className="p-3">
                <p className="text-center text-gray-500 mb-2">Abono</p>
                {account.credits.map((credit) => (
                  <p key={credit.id} className="text-right mb-1">
                    ${credit.amount.toFixed(2)}
                  </p>
                ))}
                {account.credits.length === 0 && (
                  <p className="text-right text-gray-400">-</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
