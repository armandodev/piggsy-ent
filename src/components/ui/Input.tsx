import { InputProps } from "@/types/input";

const Input: React.FC<InputProps> = ({
  type = "text",
  id,
  name,
  autoComplete,
  required,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <label>
      {label}
      <input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
