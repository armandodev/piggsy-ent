export interface InputProps {
  type?: string;
  id: string;
  name: string;
  autoComplete?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ReducedInputProps {
  required?: boolean;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
