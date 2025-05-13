import React from "react";
import { Section, Transaction } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

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
        <h2 className="text-lg">Transacciones recientes</h2>
        <Link
          href="/transactions/new"
          className="text-teal-500 hover:underline"
        >
          Nueva transacción
        </Link>
      </header>
      <ul className="grid">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </Section>
  );
}
