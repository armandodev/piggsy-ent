import React from 'react';

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
        <a href="/">Go back to the homepage</a>
      </footer>
    </main>
  );
};

export default ErrorPage;
