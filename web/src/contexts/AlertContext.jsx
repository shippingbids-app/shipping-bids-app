import React, { createContext, useState } from "react";

export const AlertContext = createContext();

function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState("socorro");

  const [alertBanner, setAlertBanner] = useState(false);

  const value = { alert, setAlert, alertBanner, setAlertBanner };
  return (
    <AlertContext.Provider value={value}>
      {alert && (<div>
                {alertBanner && (
                  <span>
                    <h1 className="text-danger text-center">
                      {alert}
                    </h1>
                  </span>)}
                  
                  <div>{children}</div>
                
              </div>)}
    </AlertContext.Provider>
  );
}

export default AlertContextProvider;
