import { React } from "react";
import { useForm } from "react-hook-form";


function LoginScreen() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <div className="d-grid mt-2">
          <button className="btn btn-primary" type="submit" disabled={!isValid}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
