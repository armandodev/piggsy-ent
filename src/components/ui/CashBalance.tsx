import React from "react";
import { MoneyDisplay, Section } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";

export default async function CashBalance() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_user_cash_account");
  if (error) {
    console.error("Error fetching cash account:", error);
    return <div>Error loading cash account</div>;
  }
  console.log("Cash balance data:", data);
  return (
    <Section>
      <p className="grid">
        <MoneyDisplay
          className="text-3xl"
          amount={data[0]?.balance}
          label="Caja"
        />
      </p>
    </Section>
  );
}
