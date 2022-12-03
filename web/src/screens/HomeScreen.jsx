import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../services/offer-user-service";

function HomeScreen() {
  const navigation = useNavigate()
  const value = useContext(AuthContext);
  const [user, setUser] = useState(null);
  
  const {
    register,
    handleSubmit,
    setError,
  } = useForm({ mode: "all" });

  useEffect(() => {
    setUser(value);
  }, [value]);

  const handleLogin = (data) => {
    authenticate(data)
      .then((data) => {
        value.setUser(data);
        navigation("/offers");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.error(errors);
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };

  if (!user) return <></>;
  return (
    <div className="container">
    
    <div className="d-flex justify-content-around">
        {!user?.user && (
          <>
            <Link to={"/login"} className="text-decoration-none">
              <div className="mt-2">
                <button className="btn btn-primary btn-lg shadow">Login</button>
              </div>
            </Link>

            <form onSubmit={handleSubmit(handleLogin)}>
              <div>
                <input
                  type="email"
                  value="guest@example.com" 
                  hidden
                  {...register("email", {
                    required: "Email is required",
                  })}
                  />
              </div>
              <div>
                <input
                  type="password"
                  value="12345678" 
                  hidden
                  {...register("password", {
                    required: "Password is required",
                  })}
                  />
              </div>
              <div className="d-grid mt-2">
                <button
                  className="btn btn-dark btn-lg shadow"
                  type="submit"
                >
                Guest
                </button>
              </div>
            </form>

            <Link to={"/register"} className="text-decoration-none">
              <div className="mt-2">
                <button className="btn btn-success btn-lg shadow">Register</button>
              </div>
            </Link>
          </>
        )}
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <img
            src="../assets/landing_page.png"
            alt="Welcome to Shipping Bids"
            className="img-fluid mt-2 rounded shadow"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
