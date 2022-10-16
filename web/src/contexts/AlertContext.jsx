import React, { createContext, useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">{alert}</Alert>
            </Stack>
          )}

          <div>{children}</div>
        </div>
      }
    </AlertContext.Provider>
  );
}

export default AlertContextProvider;
