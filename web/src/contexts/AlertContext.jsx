import React, { createContext, useState } from "react";

export const AlertContext = createContext();

function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(undefined);


  const value = { alert, setAlert }
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

export default AlertContextProvider;
