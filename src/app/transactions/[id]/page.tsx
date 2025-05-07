import MoneyDisplay from "@/components/ui/MoneyDisplay";
import { getAccounts, getTransaction } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/formatters";
import Link from "next/link";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = await getTransaction(id);
  const accounts = await getAccounts(id);

  return (
    <>
      {transaction ? (
        <main className="flex flex-col min-h-screen w-[90%] max-w-screen-sm mx-auto box-border">
          <section className="w-full bg-white shadow-md rounded-md my-4 text-lg">
            <header className="flex items-center justify-between border-b-2 border-gray-200 mb-4 p-4">
              <h1 className="text-3xl text-teal-900 font-bold">
                {transaction.title}
              </h1>
              <p>{formatDate(transaction.created_at)}</p>
            </header>
            <p className="text-gray-500 p-4">
              {transaction.description}
              {!transaction.description &&
                "No se ha proporcionado una descripción"}
            </p>
            <div className="grid gap-4 p-4">
              <h2 className="text-2xl font-bold text-teal-900">
                Detalles de la transacción
              </h2>
              <table>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Cuenta</th>
                    <th className="p-2 text-left">Cargo</th>
                    <th className="p-2 text-left">Abono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-gray-200">
                    <td className="p-2">{accounts?.charged_account.name}</td>
                    <td className="p-2 text-green-500">
                      <MoneyDisplay amount={transaction.amount} />
                    </td>
                    <td className="p-2">-</td>
                  </tr>
                  <tr className="border-b-2 border-gray-200">
                    <td className="p-2">{accounts?.credit_account.name}</td>
                    <td className="p-2">-</td>
                    <td className="p-2 text-red-500">
                      <MoneyDisplay amount={transaction.amount} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <footer className="p-4 text-right">
              <Link
                href={`/transactions/${transaction.id}/delete`}
                className="bg-gray-100 hover:bg-red-500 transition-colors text-gray-300 hover:text-white py-2 px-4 rounded-md mr-2"
              >
                Eliminar
              </Link>
              <Link
                href={`/transactions/${transaction.id}/edit`}
                className="bg-teal-600 hover:bg-teal-500 transition-colors text-white font-semibold py-2 px-4 rounded-md"
              >
                Editar
              </Link>
            </footer>
          </section>
        </main>
      ) : (
        <p>Error loading transaction</p>
      )}
    </>
  );
}
