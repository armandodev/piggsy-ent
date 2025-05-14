export default function validateTransactionForm(
  formData: FormData,
  totalDebit: number,
  totalCredit: number
) {
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const detailsJson = formData.get("details") as string;
  const details = JSON.parse(detailsJson) as {
    account_id: string;
    amount: number;
    type: "cargo" | "abono";
  }[];
  if (!description.trim() || !date) {
    return { error: "Por favor, completa todos los campos" };
  }
  for (const detail of details) {
    if (!detail.account_id) {
      return { error: "Por favor, selecciona una cuenta para cada detalle" };
    }
    if (!detail.amount || detail.amount <= 0) {
      return { error: "Todos los montos deben ser mayores que cero" };
    }
  }
  if (totalDebit !== totalCredit) {
    return {
      error: `Los montos no cuadran: Cargo=${totalDebit}, Abono=${totalCredit}`,
    };
  }
  return { error: null };
}
