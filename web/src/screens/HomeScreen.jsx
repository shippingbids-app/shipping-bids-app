import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function HomeScreen() {
  const value = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(value);
  }, [value]);

  if (!user) return <></>;
  return (
    <>
      <img src="../assets/landing_page.png" alt="Welcome to Shipping Bids" className="img-fluid mt-2" style={{width: "100%"}}/>
      <div className="d-flex justify-content-around">
        {!user?.user && (
          <>
            <Link to={"/login"} className="text-decoration-none">
              <div className="m-3">
                <button className="btn btn-primary btn-lg">Login</button>
              </div>
            </Link>

            <Link to={"/register"} className="text-decoration-none">
              <div className="m-3">
                <button className="btn btn-success btn-lg">Register</button>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default HomeScreen;
