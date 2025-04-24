export interface InputProps {
  type?: string;
  id: string;
  name: string;
  autoComplete: string;
  label: string;
  required: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ReducedInputProps {
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputSubmitProps {
  label: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
