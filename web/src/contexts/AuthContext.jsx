import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as offerService from "../services/offer-user-service";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoaded = localStorage.getItem("user-loaded") === "true";
    if (isLoaded) {
      offerService
      .getProfile()
      .then((user) => setUser(user))
      .catch((user) => setUser(null));
    } else {
      setUser(null)
    }
    
  }, []);

  function logOut() {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  const authenticateUser = (user) => {
    localStorage.setItem("user-loaded", "true");
    setUser(user);
  };

  const value = {
    user,
    setUser: authenticateUser,
    logOut,
  };

  if (user === undefined) {
    return <></>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
