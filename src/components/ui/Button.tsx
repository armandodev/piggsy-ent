import React from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  formAction,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  formAction?: (e: React.FormEvent) => Promise<void>;
}) {
  const handleClick = (e: React.FormEvent) => {
    if (formAction) {
      formAction(e);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`w-full p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 ${
        disabled ? "opacity-50 cursor-progress" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}
