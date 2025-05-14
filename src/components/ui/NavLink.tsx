import Link from "next/link";
import React from "react";

export default function NavLink({
  href,
  children,
  label,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <li>
      <Link
        className={`flex flex-wrap gap-2 items-center justify-center text-gray-500 transition-transform hover:scale-110 p-2 rounded-full sm:rounded-lg ${className}`}
        href={href}
      >
        {children}
        <span className="hidden sm:block text-sm font-medium">{label}</span>
      </Link>
    </li>
  );
}
