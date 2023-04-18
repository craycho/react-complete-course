import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  /* Prije je <App> sadrzavao <AuthContext.Provider>, a drugi components
su ga koristili pomocu {useContext}. Sada index.js sadrzi <AuthContextProvider>
u kojem je .Provider automatski obezbijedjen. Taj .Provider wrapa oko svega, pa je 
dovoljno samo iskoristiti isti (subscribeati) pomocu useContext() */

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
