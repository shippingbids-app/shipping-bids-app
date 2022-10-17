import React from "react";

function PasswordInput({ register, errors }) {
  const showPassword = () => {
    let x = document.getElementById("password");
    if (x?.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <div>
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
        <span class="input-group-text">
          <i class="fa fa-eye fa-fw" onClick={() => showPassword()}></i>
        </span>

        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
