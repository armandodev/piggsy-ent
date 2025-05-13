import { Section } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function TransactionPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: transaction_details, error } = await supabase
    .from("transaction_details")
    .select("*")
    .eq("transaction_id", params.id);

  console.log("Transaction data:", transaction_details);

  if (error) {
    console.error("Error fetching transaction:", error);
    return <div>Error loading transaction</div>;
  }

  // Obtener todos los account_ids únicos para hacer una sola consulta
  const accountIds = [
    ...new Set(transaction_details.map((item) => item.account_id)),
  ];

  // Obtener todos los nombres de cuentas en una sola consulta
  const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("id, name")
    .in("id", accountIds);

  if (accountsError) {
    console.error("Error fetching accounts:", accountsError);
    return <div>Error loading accounts</div>;
  }

  // Crear un mapa para buscar rápidamente los nombres de las cuentas
  const accountMap = {};
  accounts.forEach((account) => {
    accountMap[account.id] = account.name;
  });

  // Formatear los detalles de la transacción con los nombres de las cuentas
  const transaction_details_formatted = transaction_details.map(
    (transaction) => ({
      ...transaction,
      account_name: accountMap[transaction.account_id] || "Cuenta desconocida",
    })
  );

  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (transactionError) {
    console.error("Error fetching transaction:", transactionError);
    return <div>Error loading transaction</div>;
  }

  return (
    <Section>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {transaction?.description}
      </h1>

      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2 text-left">Cuenta</th>
            <th className="px-4 py-2 text-right">Cargo</th>
            <th className="px-4 py-2 text-right">Abono</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transaction_details_formatted.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-2">{transaction.account_name}</td>
              <td className="px-4 py-2 text-right">
                {transaction.type === "cargo"
                  ? transaction.amount.toFixed(2)
                  : "-"}
              </td>
              <td className="px-4 py-2 text-right">
                {transaction.type === "abono"
                  ? transaction.amount.toFixed(2)
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
