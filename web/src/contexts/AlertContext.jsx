import React, { createContext, useEffect, useState } from "react";

export const AlertContext = createContext();
let timeOut
function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const value = { setAlert };

  useEffect(() => {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      setAlert(null);
    }, 3000);
  }, [alert])
  

  return (
    <AlertContext.Provider value={value}>
      {
        <div>
          {alert && (
            <div className="alert alert-danger fixed-top text-center">{alert}</div>
          )}

          <div>{children}</div>
        </div>
      }
    </AlertContext.Provider>
  );
}

export default AlertContextProvider;
