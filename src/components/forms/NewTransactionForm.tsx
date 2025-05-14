"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui";
import { createTransaction } from "@/lib/supabase/transaction-actions";
import { useRouter } from "next/navigation"; // Cambiado desde redirect
import validateTransactionForm from "@/lib/utils/validators";
import { AccountCategoryMap } from "@/types/accounts";
import SelectAccount from "../ui/SelectAccount";

type TransactionDetail = {
  account_id: string;
  amount: number;
  type: "cargo" | "abono";
};

export default function NewTransactionForm({
  accounts,
}: {
  accounts: AccountCategoryMap;
}) {
  const router = useRouter(); // Añadido el useRouter hook
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pendiente" | "completada" | "anulada">(
    "completada"
  );
  const [details, setDetails] = useState<TransactionDetail[]>([
    { account_id: "", amount: 0, type: "cargo" },
    { account_id: "", amount: 0, type: "abono" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    let debit = 0;
    let credit = 0;
    details.forEach((detail) => {
      if (detail.type === "cargo") {
        debit += Number(detail.amount) || 0;
      } else if (detail.type === "abono") {
        credit += Number(detail.amount) || 0;
      }
    });

    setTotalDebit(debit);
    setTotalCredit(credit);
  }, [details]);

  const handleDetailChange = (
    index: number,
    field: keyof TransactionDetail,
    value: string | number
  ) => {
    const newDetails = [...details];
    if (field === "amount") {
      const numberValue = Number(value);
      if (isNaN(numberValue) || numberValue <= 0) {
        setError("El monto debe ser un número mayor que cero");
        return;
      }
      newDetails[index][field] = numberValue;
    } else {
      newDetails[index][field] = value as any;
    }

    setDetails(newDetails);
    setError(null);
  };

  const addDetail = () => {
    setDetails([...details, { account_id: "", amount: 0, type: "cargo" }]);
  };

  const removeLastDetail = () => {
    if (details.length <= 2) {
      setError("Una transacción debe tener al menos dos detalles");
      return;
    }
    const newDetails = details.slice(0, -1);
    setDetails(newDetails);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append("date", date);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("details", JSON.stringify(details));

      const { error: validationError } = validateTransactionForm(
        formData,
        totalDebit,
        totalCredit
      );

      if (validationError) {
        setError(validationError);
        return;
      }

      const result = await createTransaction(formData);

      if (result.error) {
        setError(`Error al crear la transacción: ${result.error.message}`);
        return;
      }

      // Usar router.push en lugar de redirect
      router.push("/transactions");
    } catch (err) {
      console.error("Error inesperado:", err);
      setError(
        `Error inesperado: ${
          err instanceof Error ? err.message : "Error desconocido"
        }`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-screen-sm mx-auto my-4 grid gap-4 p-6 bg-white shadow-md rounded-md"
    >
      <h1 className="text-3xl text-center text-teal-900">Nueva Transacción</h1>

      {error && (
        <p className="bg-red-100 text-red-500 p-3 rounded-md">{error}</p>
      )}

      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <legend className="w-full text-xl font-semibold text-teal-900 pb-2 mb-4 border-b-2 border-teal-900">
          <span>Información general</span>
        </legend>
        <Input
          id="date"
          label="Fecha"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="grid gap-2">
          <span className="text-teal-900 font-semibold">
            Estado <span className="text-teal-500">*</span>
          </span>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "pendiente" | "completada" | "anulada"
              )
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="completada">Completada</option>
            <option value="pendiente">Pendiente</option>
            <option value="anulada">Anulada</option>
          </select>
        </label>
      </fieldset>

      <Input
        id="description"
        label="Descripción"
        type="text"
        placeholder="Descripción de la transacción"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <fieldset className="grid gap-4">
        <legend className="w-full text-xl font-semibold text-teal-900 pb-2 mb-4 border-b-2 border-teal-900">
          Detalles de la transacción
        </legend>

        <ul className="grid gap-4 mb-4">
          {details.map((detail, index) => (
            <li
              key={index}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 border-b border-gray-200 pb-4"
            >
              <SelectAccount
                accounts={accounts}
                onChange={(e) =>
                  handleDetailChange(index, "account_id", e.target.value)
                }
                value={detail.account_id}
              />
              <label className="grid gap-2">
                <span className="text-teal-900 font-semibold">
                  Tipo <span className="text-teal-500">*</span>
                </span>
                <select
                  id={`type-${index}`}
                  value={detail.type}
                  onChange={(e) =>
                    handleDetailChange(index, "type", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="cargo">Cargo</option>
                  <option value="abono">Abono</option>
                </select>
              </label>
              <Input
                id={`amount-${index}`}
                label="Monto"
                type="number"
                placeholder="0.00"
                required
                value={detail.amount}
                onChange={(e) =>
                  handleDetailChange(index, "amount", e.target.value)
                }
              />
            </li>
          ))}
          <li className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <button
              type="button"
              onClick={removeLastDetail}
              className="w-full p-2 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200 font-medium"
            >
              Eliminar detalle
            </button>
            <button
              type="button"
              onClick={addDetail}
              className="w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200 font-medium"
            >
              Agregar detalle
            </button>
          </li>
        </ul>
      </fieldset>

      <button
        className="w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200 font-medium"
        type="submit"
        disabled={totalDebit !== totalCredit}
      >
        Registrar Transacción
      </button>
    </form>
  );
}
