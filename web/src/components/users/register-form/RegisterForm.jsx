import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { userRegister } from "../../../services/offer-user-service";

function RegisterForm() {
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleRegister = (user) => {
    userRegister(user)
      .then((data) => {
        console.log(`${data.username} created`);
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

  const showPassword = () => {
    let x = document.getElementById("password");
        if (x?.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="Username..."
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-envelope-o fa-fw"></i>
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
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password with at least 8 chars"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <span class="input-group-text"><i class="fa fa-eye fa-fw" onClick={() => showPassword()}></i></span>
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-phone fa-fw"></i>
          </span>
          <input
            type="number"
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            placeholder="Phone Number..."
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-file-image-o fa-fw"></i>
          </span>
          <input
            type="file"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            placeholder="Profile image..."
            {...register("image")}
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image.message}</div>
          )}
        </div>
        <div className="d-grid mt-3">
          <button className="btn btn-success" type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
        <hr className="dropdown-divider mb-4"></hr>
        <Link to={"/login"} className="text-decoration-none">
          <div className="d-grid mt-2">
            <button className="btn btn-primary">Login</button>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
