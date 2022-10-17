import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import { userUpdateProfile } from "../../../services/offer-user-service";
import ImageInput from "./ImageInput";
import PasswordInput from "./PasswordInput";

function UpdateUser() {
  const navigation = useNavigate();
  const { id } = useParams();
  const user = useContext(AuthContext)
  const [pwrd, setPwrd] = useState(false)
  const [img, setImg] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleUpdateProfile = (user) => {
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
            className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            placeholder="Phone Number..."
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber.message}</div>
          )}
        </div>
        {pwrd && <PasswordInput register={register} errors={errors} />}
        {img && <ImageInput register={register} errors={errors} />}
        <div className="d-flex flex-row justify-content-evenly mt-2">          
          <button className="btn btn-danger btn-sm" type="submit" onClick={() => setPwrd(!pwrd) }>
            Update Password
          </button>
          <button className="btn btn-info btn-sm" type="submit" onClick={() => setImg(!img)}>
            Update profile image
          </button>  
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
