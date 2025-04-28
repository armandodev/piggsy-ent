import Link from "next/link";
import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <main>
      <header>
        <h1>Oops! Something went wrong.</h1>
      </header>
      <section>
        <p>We couldn't find the page you were looking for.</p>
      </section>
      <footer>
        <Link href="/">Go back to the homepage</Link>
      </footer>
    </main>
  );
};

export default ErrorPage;
