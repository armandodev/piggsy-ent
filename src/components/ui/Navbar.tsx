import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav
      className="absolute top-0 left-0 right-0 flex items-center justify-between p-4"
      aria-label="Main navigation"
    >
      <Link className="text-xl font-bold text-gray-800" href="/">
        Dashboard
      </Link>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/transactions">Transacciones</Link>
        </li>
        <li>
          <Link href="/accounts">Cuentas</Link>
        </li>
        <li>
          <Link href="/profile">Perfil</Link>
        </li>
        <li>
          <Link
            className="bg-teal-600 hover:bg-teal-500 transition-colors text-white font-semibold py-2 p-4 rounded"
            href="/signout"
          >
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
