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
    <div>
      <h1>Hi {user?.user?.username}!</h1>

      <br />
      <h4>Welcome to Shipping Bids</h4>
      <div className="d-flex justify-content-around">
        {!user?.user ? (
          <Link to={"/login"} className="text-decoration-none">
            <div className="mt-5">
              <button className="btn btn-primary btn-lg">Login</button>
            </div>
          </Link>
        ) : (
          <>
            <Link to={"/offers"} className="text-decoration-none">
              <div className="mt-5">
                <button className="btn btn-danger btn-lg">Go to offers</button>
              </div>
            </Link>
            <Link to={"/offers/create"} className="text-decoration-none">
              <div className="mt-5">
                <button className="btn btn-outline-info btn-lg">Set an offer</button>
              </div>
            </Link>
          </>
        )}

        {user?.user ? (
          <></>
        ) : (
          <Link to={"/register"} className="text-decoration-none">
            <div className="mt-5">
              <button className="btn btn-success btn-lg">Register</button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
