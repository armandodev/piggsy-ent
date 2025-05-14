import { NewTransactionForm } from "@/components/forms";
import { getAccounts } from "@/lib/supabase/transaction-actions";
import React from "react";

export const metadata = {
  title: "Nueva transacción - Piggsy ENT",
};

export default async function NewTransactionPage() {
  const { data: accounts } = await getAccounts();
  return (
    <main className="grid place-items-center min-h-screen">
      <NewTransactionForm accounts={accounts} />
    </main>
  );
}
