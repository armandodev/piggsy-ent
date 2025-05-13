import React from "react";
import MoneyDisplay from "./MoneyDisplay";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatters";

export default function Transaction({
  transaction,
}: {
  transaction: {
    id: string;
    date: string;
    total_amount: number;
    description: string;
  };
}) {
  const date = formatDate(transaction.date);
  return (
    <li>
      <Link
        className="flex justify-between items-center"
        href={`/transactions/${transaction.id}`}
      >
        <div>
          <p>{transaction.description}</p>
          <p className="text-gray-500">{date}</p>
        </div>
        <MoneyDisplay amount={transaction.total_amount} transactions />
      </Link>
    </li>
  );
}
