import Navigation from "./Navigation";

export default function Layout({
  children,
  authenticated = false,
}: {
  children: React.ReactNode;
  authenticated?: boolean;
}) {
  return (
    <>
      <main
        className={`grid place-items-center ${
          !authenticated ? "min-h-screen" : ""
        }`}
      >
        {children}
      </main>
      {authenticated && <Navigation />}
    </>
  );
}
