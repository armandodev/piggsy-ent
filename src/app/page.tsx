import React from "react";
import { CashBalance, LastTransactions, Navigation } from "@/components/ui";

export default async function Page() {
  return (
    <>
      <main>
        <CashBalance />
        <LastTransactions />
      </main>
      <Navigation />
    </>
  );
}
