import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false, // Default values
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = function (props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true); // U protivnom je default state vec "false"
    }
  }, []);

  const logoutHandler = function () {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = function () {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
  /* <AuthContextProvider> ustvari jeste <AuthContext>, sa proslijedjenim 
  vrijednostima potrebnim za obavljanje login funkcije, dok se ostatak contenta
  cisto prikaze sa {props.children}*/
};

export default AuthContext;
