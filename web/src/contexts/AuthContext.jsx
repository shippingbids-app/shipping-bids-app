import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as offerService from "../services/offer-user-service";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate()
  useEffect(() => {
    offerService
      .getProfile()
      .then((user) => setUser(user))
      .catch((user) => setUser(null));
  }, []);

  function logOut() {
    localStorage.clear()
    setUser(null)
    navigate('/')
  }

  const value = {
    user,
    setUser,
    logOut
  };

  if (user === undefined) {
    return <></>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
