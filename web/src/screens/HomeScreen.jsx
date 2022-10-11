import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function HomeScreen() {
  const value = useContext(AuthContext);
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(value)
  }, [value])
  console.log(user)
  if (!user) return <></>
  return (
    <div>
      <h1>Hi {user?.user?.username}!</h1>

      <br />
      <h4>Welcome to Shipping Bids</h4>

      <div className="d-flex justify-content-around">
        <Link to={"/offers"} className="text-decoration-none">
          <div className="mt-5">
            <button className="btn btn-danger">Go to offers</button>
          </div>
        </Link>

        {user?.user ? ( 
          <></>
        ) : (
          <Link to={"/register"} className="text-decoration-none">
            <div className="mt-5">
              <button className="btn btn-success">Register</button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
