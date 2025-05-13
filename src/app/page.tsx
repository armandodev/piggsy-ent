import React from "react";
import { CashBalance, LastTransactions } from "@/components/ui";

export default async function Page() {
  return (
    <main>
      <CashBalance />
      <LastTransactions />
    </main>
  );
}
