import React from "react";

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`w-[90%] max-w-screen-sm mx-auto my-4 grid gap-4 p-4 bg-white rounded-lg shadow-md ${className}`}
    >
      {children}
    </section>
  );
}
