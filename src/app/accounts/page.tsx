export default async function AccountsPage() {
  
  return (
    <main className="flex flex-col min-h-screen w-[90%] max-w-screen-sm mx-auto box-border">
      <section className="w-full bg-white shadow-md rounded-md my-4 text-lg">
        <header className="flex items-center justify-between border-b-2 border-gray-200 mb-4 p-4">
          <h1 className="text-3xl text-teal-900 font-bold">Cuentas</h1>
        </header>
        <p className="text-gray-500 p-4">No hay cuentas disponibles</p>
      </section>
    </main>
  );
}
