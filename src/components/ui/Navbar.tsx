const Navbar: React.FC = () => {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li>
          <a href="/transactions">Transacciones</a>
        </li>
        <li>
          <a href="/accounts">Cuentas</a>
        </li>
        <li>
          <a href="/profile">Perfil</a>
        </li>
        <li>
          <a href="/signout">Cerrar sesión</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
