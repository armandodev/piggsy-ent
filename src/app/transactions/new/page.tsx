"use client";
import { Input } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { useState } from "react";

export default function NewTransactionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [chargedAccount, setChargedAccount] = useState("");
  const [creditAccount, setCreditAccount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const getAccounts = async () => {
    const supabase = await createClient();
    const accounts = await supabase
      .from("accounts")
      .select("id, name")
      .order("name", { ascending: true });
    if (accounts.error) {
      console.error("Error fetching accounts:", accounts.error);
      return null;
    }
    return accounts.data;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleChargedAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChargedAccount(event.target.value);
  };

  const handleCreditAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreditAccount(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <main className="flex flex-col min-h-screen w-[90%] max-w-screen-sm mx-auto box-border">
      <section className="w-full bg-white shadow-md rounded-md my-4 text-lg">
        <header className="flex items-center justify-between border-b-2 border-gray-200 mb-4 p-4">
          <h1 className="text-3xl text-teal-900 font-bold">
            Nueva transacción
          </h1>
        </header>
        <form className="p-4">
          <Input
            label="Título"
            id="title"
            name="title"
            autoComplete="off"
            placeholder="Compra/venta de..."
            value={title}
            onChange={handleTitleChange}
          />

          <Input
            label="Descripción"
            id="description"
            name="description"
            autoComplete="off"
            placeholder="Descripción de la transacción"
            value={description}
            onChange={handleDescriptionChange}
          />

          <Input
            label="Monto"
            id="amount"
            name="amount"
            type="number"
            autoComplete="off"
            placeholder="Ingrese el monto"
            value={amount}
            onChange={handleAmountChange}
          />

          <select
            id="chargedAccount"
            name="chargedAccount"
            value={chargedAccount}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">Seleccione la cuenta cargada</option>
            {getAccounts().then((accounts) =>
              accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))
            )}
          </select>
        </form>
      </section>
    </main>
  );
}
