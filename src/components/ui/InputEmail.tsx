import { ReducedInputProps } from "@/types/input";
import { Input } from "@/components/ui";

const InputEmail: React.FC<ReducedInputProps> = ({
  required = false,
  value,
  onChange,
}) => {
  return (
    <Input
      type="email"
      id="email"
      name="email"
      autoComplete="email"
      label="Correo electrónico"
      required={required}
      aria-required={required}
      placeholder="ejemplo@dominio.com"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputEmail;
