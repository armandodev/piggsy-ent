import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-[90%] max-w-screen-sm mx-auto my-4 grid gap-4 p-4 bg-white rounded-lg shadow-md">
      {children}
    </section>
  );
}
