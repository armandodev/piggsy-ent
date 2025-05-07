import { formatMoney } from "@/lib/utils/formatters";

interface Props {
  className?: string;
  amount: number;
}

export default function MoneyDisplay({ className, amount }: Props) {
  const { integer, decimal, isNegative } = formatMoney(amount);

  return (
    <span className={className}>
      ${integer}
      <span className="align-top text-xs">{`.${decimal}`}</span>
    </span>
  );
}
