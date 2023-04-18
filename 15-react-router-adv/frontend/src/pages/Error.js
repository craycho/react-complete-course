import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError(); // new Response throwan u Events.js se moze ovdje koristiti

  let title = "An error occured!";
  let message = "Something went wrong.";

  // new Response(error.data, { status: error.status })
  if (error.status === 500) {
    message = error.data.message; // podaci returnani sa json(data, {}) se automatski parseaju
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
