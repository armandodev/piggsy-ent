import React from "react";

export default function Input({
  id,
  label,
  type = "text",
  placeholder = "Ingresa un valor",
  required = false,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-teal-900 font-semibold">
        {label} {required && <span className="text-teal-500">*</span>}
      </span>
      <input
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
