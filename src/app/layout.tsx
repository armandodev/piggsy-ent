import React from "react";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
});

export const metadata = {
  title: "Piggsy ENT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={onest.className}>
      <body>{children}</body>
    </html>
  );
}
