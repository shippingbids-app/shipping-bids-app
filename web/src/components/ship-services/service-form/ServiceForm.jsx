import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Select from "react-select";
import { serviceRegister } from "../../../services/offer-user-service";
import { capacities, vehicles } from "../../../data";
import { AuthContext } from "../../../contexts/AuthContext";
import { AlertContext } from "../../../contexts/AlertContext";

function ServiceForm() {
  const navigation = useNavigate();
  const user = useContext(AuthContext);
  const alertText = useContext(AlertContext);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleServiceRegister = (data) => {
    if (user.user?.services?.length > 0) {
      alertText.setAlert("This user already has a service");
    }

    serviceRegister(data)
      .then((data) => {
        console.log("service created");
        navigation(`/users/${data.author}`);
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
    <div>
      <form onSubmit={handleSubmit(handleServiceRegister)}>
        <Controller
          name="logisticsCapacity"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <div className="input-group mb-1">
              <span className="input-group-text">
                <i className="fa fa-archive fa-fw"></i>
              </span>
              <Select
                className="form-control p-0"
                value={capacities.find((capacity) => capacity.value === value)}
                onChange={(capacities) =>
                  onChange(capacities.map((capacity) => capacity.value))
                }
                isMulti
                onBlur={onBlur}
                options={capacities}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 0,
                  }),
                }}
                placeholder="Package capacity"
              />
              {errors.logisticsCapacity && (
                <div className="invalid-feedback">
                  {errors.logisticsCapacity.message}
                </div>
              )}
            </div>
          )}
        />

        <Controller
          name="vehicles"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <div className="input-group mb-1">
              <span className="input-group-text">
                <i className="fa fa-car fa-fw"></i>
              </span>
              <Select
                className="form-control p-0"
                value={vehicles.find((vehicle) => vehicle.value === value)}
                onChange={(vehicles) =>
                  onChange(vehicles.map((vehicle) => vehicle.value))
                }
                isMulti
                onBlur={onBlur}
                options={vehicles}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 0,
                  }),
                }}
                placeholder="Vehicles availables"
              />
              {errors.vehicles && (
                <div className="invalid-feedback">
                  {errors.vehicles.message}
                </div>
              )}
            </div>
          )}
        />

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-globe fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control g-places-finder ${
              errors.address ? "is-invalid" : ""
            }`}
            placeholder="Origin address..."
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
          <input type="hidden" name="lat" value="lat" />
          <input type="hidden" name="lng" value="lng" />
        </div>

        <div className="d-grid mt-3">
          <button className="btn btn-danger" type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceForm;
