import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import Select from "react-select";
import { offerRegister } from "../../../services/offer-user-service";
import capacities from "../../../data/capacities";
import services from "../../../data/services";
import AutoComplete, { usePlacesWidget } from "react-google-autocomplete";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";

function OfferForm() {
  const navigation = useNavigate();

  const { originRef } = usePlacesWidget({
    apiKey: GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleOfferRegister = (data) => {
    data = {
      ...data,
      ...data.origin,
      ...data.destination,
    };

    console.log(data);

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
    <>
      <form onSubmit={handleSubmit(handleOfferRegister)}>
        <div className="input-group mb-1">
          <span className="input-group-text border-0">
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
              <span className="input-group-text border-0">
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
              <span className="input-group-text border-0">
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
        <Controller
          name="origin"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <div className="input-group mb-1">
              <span className="input-group-text border-0">
                <i className="fa fa-location-arrow fa-fw"></i>
              </span>
              <AutoComplete
                apiKey={GOOGLE_API_KEY}
                options={{ types: [] }}
                onPlaceSelected={(place) => {
                  const origin = {
                    originAddress: place.formatted_address,
                    origin: [
                      place.geometry.location.lat(),
                      place.geometry.location.lng(),
                    ],
                  };
                  onChange(origin);
                }}
                className="form-control"
              />
            </div>
          )}
        />
        <Controller
          name="destination"
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <div className="input-group mb-1">
              <span className="input-group-text border-0">
                <i className="fa fa-map-marker fa-fw"></i>
              </span>
              <AutoComplete
                apiKey={GOOGLE_API_KEY}
                options={{ types: [] }}
                onPlaceSelected={(place) => {
                  const destination = {
                    destinationAddress: place.formatted_address,
                    destination: [
                      place.geometry.location.lat(),
                      place.geometry.location.lng(),
                    ],
                  };
                  onChange(destination);
                }}
                className="form-control"
              />
            </div>
          )}
        />
        <div className="input-group mb-1">
          <span className="input-group-text border-0">
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
          <span className="input-group-text border-0">
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
          <button className="btn btn-danger shadow" type="submit" disabled={!isValid}>
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default OfferForm;
