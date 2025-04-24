export default function Submit({
  label,
  action,
}: {
  label: string;
  action: (formData: FormData) => void;
}) {
  return <button formAction={action}>{label}</button>;
}
