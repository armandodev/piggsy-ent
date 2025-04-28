export default function Submit({
  label,
  action,
}: {
  label: string;
  action: (formData: FormData) => void;
}) {
  return (
    <button
      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors cursor-pointer"
      formAction={action}
    >
      {label}
    </button>
  );
}
