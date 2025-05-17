"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getAccounts() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("vw_accounts_category")
      .select("id, name, code, category")
      .order("code", { ascending: true });

    if (error) {
      console.error("Error al obtener cuentas:", error);
      return {
        data: null,
        error: {
          message: error.message || "Error desconocido",
        },
      };
    }

    if (!data || data.length === 0) {
      return { data: {}, error: null };
    }

    const accountsByCategory: Record<
      string,
      {
        name: string;
        accounts: Array<{ id: string; name: string; code: string }>;
      }
    > = {};

    for (const account of data) {
      const category = String(account.category);

      if (!accountsByCategory[category]) {
        accountsByCategory[category] = {
          name: category
            .replace(/_/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase()),
          accounts: [],
        };
      }

      accountsByCategory[category].accounts.push({
        id: String(account.id),
        name: String(account.name),
        code: String(account.code),
      });
    }

    return {
      data: ensureSerializable(accountsByCategory),
      error: null,
    };
  } catch (err) {
    console.error("Error inesperado:", err);
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Error desconocido",
      },
    };
  }
}

export async function deleteTransaction(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) {
      console.error("Error al eliminar la transacción:", error);
      return;
    }

    const { error: detailsError } = await supabase
      .from("transaction_details")
      .delete()
      .eq("transaction_id", id);
    if (detailsError) {
      console.error(
        "Error al eliminar los detalles de la transacción:",
        detailsError
      );
      return;
    }
    redirect("/transactions");
  } catch (err) {
    console.error("Error inesperado:", err);
    return;
  }
}
