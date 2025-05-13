import { formatMoney } from "@/lib/utils/formatters";

interface Props {
  className?: string;
  amount: number;
  transactions?: boolean;
  label?: string;
}

export default function MoneyDisplay({
  className,
  amount,
  transactions = false,
  label,
}: Props) {
  const { integer, decimal, isNegative } = formatMoney(amount);

  return (
    <span
      className={`grid ${
        isNegative ? "text-red-500" : transactions && "text-teal-500"
      } ${className}`}
    >
      <span>
        {isNegative ? "-" : transactions && "+"}${integer}
        <span className="align-top text-xs">{`.${decimal}`}</span>
      </span>
      <span className="text-black text-lg">{label}</span>
    </span>
  );
}
