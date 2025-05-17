"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Asegura que un objeto sea serializable convirtiéndolo a JSON y de vuelta a objeto
 */
function ensureSerializable<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Crea una nueva transacción
 */
export async function createTransaction(formData: FormData) {
  try {
    const supabase = await createClient();

    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const detailsJson = formData.get("details") as string;

    const details = JSON.parse(detailsJson).map((detail: any) => ({
      account_id: String(detail.account_id),
      amount: Number(detail.amount),
      type: String(detail.type),
    }));

    const { data, error } = await supabase.rpc("create_transaction", {
      t_date: date,
      t_description: description,
      t_status: status,
      t_details: details,
    });

    if (error) {
      console.error("Error en la transacción:", error);
      return {
        error: {
          message: error.message || "Error desconocido",
          code: error.code || "UNKNOWN",
        },
        data: null,
      };
    }

    return {
      data: data ? ensureSerializable(data) : null,
      error: null,
    };
  } catch (err) {
    console.error("Error inesperado:", err);
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Error desconocido",
        code: "UNKNOWN",
      },
    };
  }
}

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
