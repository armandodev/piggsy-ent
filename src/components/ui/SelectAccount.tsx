import { AccountCategoryMap } from "@/types/accounts";
import React from "react";

type SelectAccountProps = {
  accounts: AccountCategoryMap;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export default function SelectAccount({
  accounts,
  onChange,
  value,
}: SelectAccountProps) {
  if (!accounts || Object.keys(accounts).length === 0) {
    return (
      <label className="grid gap-2">
        <span className="text-teal-900 font-semibold">
          Cuenta <span className="text-teal-500">*</span>
        </span>
        <select
          onChange={onChange}
          value={value}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">No hay cuentas disponibles</option>
        </select>
      </label>
    );
  }

  return (
    <label className="grid gap-2">
      <span className="text-teal-900 font-semibold">
        Cuenta <span className="text-teal-500">*</span>
      </span>
      <select
        onChange={onChange}
        value={value}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
      >
        <option value="">Selecciona una cuenta</option>
        {Object.keys(accounts).map((category) => (
          <optgroup key={category} label={accounts[category].name}>
            {accounts[category].accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
