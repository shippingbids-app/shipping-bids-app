import React, { createContext, useEffect, useState } from 'react'
import * as offerService from "../services/offer-service";


export const AuthContext = createContext()

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    offerService.getProfile()
      .then((user) => setUser(user))
      .catch((user) => setUser(null))
  }, [])

  const value = {
    user,
    setUser,
  }

  if (user === undefined) {
    return <></>
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider