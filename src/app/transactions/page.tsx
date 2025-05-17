import { Navigation, Section, Transaction } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function TransactionsPage() {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <Section>
      <h1 className="text-2xl font-bold text-teal-900 mb-4">Transacciones</h1>
      <ul className="grid gap-4">
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <Navigation />
    </Section>
  );
}
