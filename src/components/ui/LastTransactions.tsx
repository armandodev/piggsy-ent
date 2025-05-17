import React from "react";
import { Section, Transaction } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function LastTransactions() {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching transactions:", error);
    return <div>Error loading transactions</div>;
  }
  return (
    <Section>
      <header className="flex justify-between items-center">
        <h2>Transacciones recientes</h2>
        <Link
          href="/transactions/new"
          className="flex gap-2 items-center text-teal-500 hover:text-teal-600 transition-colors hover:bg-teal-100 p-2 rounded-full sm:rounded-lg"
        >
          <Plus />
          <span className="hidden sm:block">Nueva</span>
        </Link>
      </header>
      <ul className="grid gap-4">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </Section>
  );
}
