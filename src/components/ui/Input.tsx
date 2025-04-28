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
    <label className="grid gap-2">
      <span>
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <input
        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
