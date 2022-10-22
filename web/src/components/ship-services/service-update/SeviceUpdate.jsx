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
    if (data.address === undefined) {
      data.address = ""
    }

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
            </div>
          )}
        />

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-globe fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control g-places-finder`}
            placeholder="Origin address..."
            {...register("address")}
          />
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
