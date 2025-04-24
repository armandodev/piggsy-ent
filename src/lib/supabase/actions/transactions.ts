import { createClient } from "@/lib/supabase/server";
import { getUserId } from "./auth";
import { getBalance } from "./balance";
import { redirect } from "next/navigation";

interface Props {
  homepage: boolean;
}

export async function fetchTransactions({ homepage }: Props) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) throw new Error("Error al obtener las transacciones");

  if (homepage) {
    return data.slice(0, 5);
  }

  return data;
}

export async function createTransaction(formData: FormData) {
  const type = Number(formData.get("type"));
  const amount = formData.get("amount");
  const formattedAmount =
    type === 0 ? Math.abs(Number(amount)) * -1 : Math.abs(Number(amount));

  const data = {
    user_id: await getUserId(),
    amount: formattedAmount,
    description: formData.get("description"),
    type: type,
    budget: Number(formData.get("budget")),
    detail: Number(formData.get("detail")),
    created_at: new Date().toISOString(),
  };

  const balance = await getBalance(data.user_id);
  const newBalance = {
    balance: balance.balance + data.amount,
    details: balance.details.map((detail, i) => {
      if (i === data.detail) {
        return {
          ...detail,
          value: detail.value + data.amount,
        };
      }

      return detail;
    }),
    budget: balance.budget.map((budget, i) => {
      if (i === data.budget) {
        return {
          ...budget,
          value: budget.value + data.amount,
        };
      }

      return budget;
    }),
  };

  const supabase = await createClient();
  const { error: transactionError } = await supabase
    .from("transactions")
    .insert(data)
    .select()
    .single();

  if (transactionError) throw new Error("Error al agregar la transacción");

  const { error: balanceError } = await supabase
    .from("balance")
    .update(newBalance)
    .eq("user_id", data.user_id)
    .single();

  if (balanceError) throw new Error("Error al actualizar el balance");

  if (!transactionError && !balanceError) redirect("/transactions");
}
