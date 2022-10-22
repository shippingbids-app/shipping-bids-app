import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams} from "react-router";
import Select from "react-select";
import { serviceUpdate } from "../../../services/offer-user-service";
import { capacities, vehicles } from "../../../data";

function SeviceUpdate() {
  const navigation = useNavigate();
  const { serviceId } = useParams()

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleServiceUpdate = (data) => {

    Object.keys(data).forEach((k) => {
      if (data[k] === "") {
        delete data[k]
      }
    })

    serviceUpdate(data, serviceId)
      .then((data) => {
        console.log("service updated");
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
      <form onSubmit={handleSubmit(handleServiceUpdate)}>
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
                onChange={(capacity) =>
                  onChange(capacity.value)
                }
                onBlur={onBlur}
                options={capacities}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 0,
                  }),
                }}
                placeholder="Max package capacity"
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
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default SeviceUpdate;
