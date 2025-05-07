import { Navbar } from "@/components/ui";
import MoneyDisplay from "@/components/ui/MoneyDisplay";
import { createClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function transactionsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("id, title, amount, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching transactions:", error);
    return <p>Error loading transactions</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    const isSameDay =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isSameDay) {
      return new Intl.DateTimeFormat("es-ES", {
        timeStyle: "short",
      }).format(date);
    }

    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "long",
    }).format(date);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen w-[90%] max-w-screen-sm mx-auto box-border">
        <section className="w-full bg-white shadow-md rounded-md my-4">
          <header className="flex items-center justify-between border-b-2 border-gray-200">
            <h2 className="text-2xl font-bold p-4">Transacciones</h2>
            <Link
              href="/transactions/new"
              className="flex items-center justify-center bg-teal-600 hover:bg-teal-500 transition-colors text-white font-semibold py-2 px-4 rounded-md m-4"
            >
              <Plus />
            </Link>
          </header>
          <ul className="grid">
            {data.map((transaction) => (
              <li
                className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors cursor-pointer text-lg"
                key={transaction.id}
              >
                <Link
                  href={`/transactions/${transaction.id}`}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex flex-col items-start">
                    <h3>{transaction.title}</h3>
                    <p className="text-gray-500">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <MoneyDisplay amount={transaction.amount} />
                  </div>
                </Link>
              </li>
            ))}
            {data.length === 0 && (
              <li className="flex items-center justify-center w-full p-4 text-lg text-gray-500">
                No hay transacciones disponibles
              </li>
            )}
          </ul>
        </section>
      </main>
    </>
  );
}
