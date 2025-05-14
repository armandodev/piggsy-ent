import { createClient } from "@/lib/supabase/server";

export async function createTransaction(formData: FormData) {
  try {
    const supabase = await createClient();
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const detailsJson = formData.get("details") as string;

    // Asegurar que los detalles sean objetos planos
    const details = JSON.parse(detailsJson).map((detail) => ({
      account_id: detail.account_id,
      amount: Number(detail.amount),
      type: detail.type,
    }));

    const { data, error } = await supabase.rpc("create_transaction", {
      t_date: date,
      t_description: description,
      t_status: status,
      t_details: details,
    });

    if (error) {
      console.error("Error en la transacción:", error);
      // Devolver un objeto de error plano
      return { error: { message: error.message, code: error.code } };
    }

    // Asegurar que data sea un objeto plano
    return { data: data ? JSON.parse(JSON.stringify(data)) : null };
  } catch (err) {
    console.error("Error inesperado:", err);
    return {
      error: {
        message: err instanceof Error ? err.message : "Error desconocido",
      },
    };
  }
}

export function formatCategoryName(category: string): string {
  return category.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
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
      return { error: { message: error.message } };
    }

    // Simplificar la estructura para evitar objetos anidados complejos
    const accountsByCategory = {};

    for (const account of data) {
      const category = account.category;

      if (!accountsByCategory[category]) {
        accountsByCategory[category] = {
          name: formatCategoryName(category),
          accounts: [],
        };
      }

      accountsByCategory[category].accounts.push({
        id: account.id,
        name: account.name,
        code: account.code,
      });
    }

    // Convertir a objeto plano con JSON
    return { data: JSON.parse(JSON.stringify(accountsByCategory)) };
  } catch (err) {
    console.error("Error inesperado:", err);
    return {
      error: {
        message: err instanceof Error ? err.message : "Error desconocido",
      },
    };
  }
}
