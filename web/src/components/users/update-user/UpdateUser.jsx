import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { userUpdateProfile } from "../../../services/offer-user-service";

function UpdateUser() {
  const navigation = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const showPassword = () => {
    let x = document.getElementById("password");
    if (x?.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const handleUpdateProfile = (user) => {
    if (user.image[0] === undefined) {
      user.image = ""
    }
    Object.keys(user).forEach((k) => {
      if (user[k] === "") {
        delete user[k];
      }
    });

    userUpdateProfile(id, user)
      .then((data) => {
        console.log(`${data.username} updated`);
        navigation(`/users/${id}`);
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
    <>
      <div>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <i className="fa fa-envelope-o fa-fw"></i>
            </span>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email..."
              {...register("email")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <i className="fa fa-phone fa-fw"></i>
            </span>
            <input
              type="number"
              className={`form-control ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              placeholder="Phone Number..."
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">
                {errors.phoneNumber.message}
              </div>
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
              {...register("password")}
            />
            <span className="input-group-text">
              <i className="fa fa-eye fa-fw" onClick={() => showPassword()}></i>
            </span>

            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
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
            <button className="btn btn-info" type="submit" disabled={!isValid}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateUser;
