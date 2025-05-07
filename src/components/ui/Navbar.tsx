import { House, LogOut, NotebookText, Wallet } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="absolute bottom-0 left-0 w-full grid place-items-center mb-4"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="grid grid-cols-4 place-items-center gap-4 w-[90%] max-w-screen-sm bg-white shadow-md border-2 border-gray-200 rounded-md p-4">
        <li>
          <Link href="/">
            <House />
          </Link>
        </li>
        <li>
          <Link href="/transactions">
            <NotebookText />
          </Link>
        </li>
        <li>
          <Link href="/accounts">
            <Wallet />
          </Link>
        </li>
        <li className="bg-teal-600 hover:bg-teal-500 transition-colors text-white font-semibold py-2 p-4 rounded">
          <Link href="/signout">
            <LogOut />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
