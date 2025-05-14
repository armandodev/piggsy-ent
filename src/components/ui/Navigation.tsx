import { House, List, LogOut, Wallet } from "lucide-react";
import React from "react";
import NavLink from "./NavLink";

export default function Navigation() {
  const navLinks = [
    { href: "/", label: "Dashboard", icon: <House /> },
    { href: "/transactions", label: "Transacciones", icon: <List /> },
    { href: "/reports", label: "Reportes", icon: <Wallet /> },
    { href: "/signout", label: "Cerrar sesión", icon: <LogOut /> },
  ];
  return (
    <nav
      className="
        fixed bottom-4 left-0 right-0 z-50 w-[90%] max-w-screen-sm mx-auto bg-white shadow-md rounded-lg p-4"
    >
      <ul className="flex gap-4 justify-around">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label}>
            {link.icon}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
