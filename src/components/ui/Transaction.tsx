import React from "react";
import MoneyDisplay from "./MoneyDisplay";
import Link from "next/link";
import { formatLongDate, formatShortDate } from "@/lib/utils/formatters";

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
  const longDate = formatLongDate(transaction.date);
  const shortDate = formatShortDate(transaction.date);
  return (
    <li>
      <Link
        className="flex gap-4 justify-between items-center"
        href={`/transactions/${transaction.id}`}
      >
        <div>
          <p className="text-gray-800">{transaction.description}</p>
          <p className="text-gray-500 hidden sm:block">{longDate}</p>
          <p className="text-gray-500 block sm:hidden">{shortDate}</p>
        </div>
        <MoneyDisplay amount={transaction.total_amount} />
      </Link>
    </li>
  );
}
