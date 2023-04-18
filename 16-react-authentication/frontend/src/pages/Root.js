import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData(); // Basically getAuthToken();
  const submit = useSubmit();

  /* 1. RootLayout se renderuje kada aplikacija starta, pa je savrsen za useEffect 
     2. useEffect se desi kada se god "token" varijabla, fetchana iz localStorage promijeni
     3. U njemu se provjeri da li token postoji, te da li mu je isteklo vrijeme (1h)
  */
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    // Starta timer koji logouta nakon tokenDuration vremena (sat minus vec proteklo vrijeme)
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
