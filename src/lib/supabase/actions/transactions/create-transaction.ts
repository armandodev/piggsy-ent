import { createClient } from "@/lib/supabase/server";
import { ensureSerializable } from "@/lib/utils";

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
        error: "Error al crear la transacción",
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
      error: "Error inesperado",
    };
  }
}
