import { React, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { authenticate } from "../../services/offer-user-service";
import Section from "../../components/section/Section";

function LoginScreen() {
  const navigation = useNavigate();
  const value = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

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

  return (
    <div className="mt-3">
      <Section title="Login" icon="sign-in">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <i className="fa fa-user fa-fw"></i>
            </span>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email..."
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="input-group mb-1">
            <span className="input-group-text">
              <i className="fa fa-key fa-fw"></i>
            </span>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password..."
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="d-grid mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isValid}
            >
              Login
            </button>
          </div>
          <hr className="dropdown-divider mb-4"></hr>
          <Link to={"/register"} className="text-decoration-none">
            <div className="d-grid mt-2">
              <button className="btn btn-success">Register</button>
            </div>
          </Link>
        </form>
      </Section>
    </div>
  );
}

export default LoginScreen;
