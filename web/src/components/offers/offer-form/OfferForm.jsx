import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import Select from "react-select";
import { offerRegister } from "../../../services/offer-user-service";
import capacities from "../../../data/capacities";
import services from "../../../data/services";

function OfferForm() {
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleOfferRegister = (data) => {
    offerRegister(data)
      .then((data) => {
        console.log(`${data.title} created`);
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
    <div>
      <form onSubmit={handleSubmit(handleOfferRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-sticky-note fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Offer title..."
            {...register("title", {
              required: "A title is required",
            })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>
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
                onChange={(v) => {
                  onChange(v.value);
                }}
                onBlur={onBlur}
                options={capacities}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 0,
                  }),
                }}
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
          name="services"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <div className="input-group mb-1">
              <span className="input-group-text">
                <i className="fa fa-building fa-fw"></i>
              </span>
              <Select
                className="form-control p-0"
                value={services.find((service) => service.value === value)}
                onChange={(s) => {
                  onChange(s.value);
                }}
                onBlur={onBlur}
                options={services}
                styles={{
                  control: (base) => ({
                    ...base,
                    border: 0,
                  }),
                }}
              />
              {errors.services && (
                <div className="invalid-feedback">
                  {errors.services.message}
                </div>
              )}
            </div>
          )}
        />
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-location-arrow fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control g-places-finder ${errors.originAddress ? "is-invalid" : ""}`}
            placeholder="Origin address..."
            {...register("originAddress", {
              required: "Origin address is required",
            })}
          />
          {errors.originAddress && (
            <div className="invalid-feedback">{errors.originAddress.message}</div>
          )}
          <input type="hidden" name="lat" value="lat" />
          <input type="hidden" name="lng" value="lng" />
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-map-marker fa-fw"></i>
          </span>
          <input
            type="text"
            className={`form-control g-places-finder ${errors.destinationAddress ? "is-invalid" : ""}`}
            placeholder="Destination address..."
            {...register("destinationAddress", {
              required: "Destination address is required",
            })}
          />
          {errors.destinationAddress && (
            <div className="invalid-feedback">{errors.destinationAddress.message}</div>
          )}
          <input type="hidden" name="lat" value="lat" />
          <input type="hidden" name="lng" value="lng" />
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-calendar fa-fw"></i>
          </span>
          <input
            type="datetime-local"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            placeholder="Offer date..."
            {...register("expirationDate", {
              required: "A date is required",
            })}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date.message}</div>
          )}
        </div>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-eur fa-fw"></i>
          </span>
          <input
            type="number"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Offer price..."
            {...register("initialPrice", {
              required: "A price is required",
            })}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
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

export default OfferForm;
