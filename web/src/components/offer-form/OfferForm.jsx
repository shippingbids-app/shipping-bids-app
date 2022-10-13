import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import Select from 'react-select';
import { offerRegister } from "../../services/offer-user-service";
import capacities from "../../data/capacities"

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
          console.log(errors);
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
            <span className="input-group-text"><i className='fa fa-pencil fa-fw'></i></span>
            <Select className='form-control p-0' 
              value={capacities.find((capacity) => capacity.value === value)} 
              onChange={(capacities) => onChange(capacities.map(capacity => capacity.value))} 
              onBlur={onBlur}
              options={capacities}
              styles={{
                control: (base) => ({
                  ...base,
                  border: 0
                })
              }}/>
            {errors.logisticsCapacity && (<div className="invalid-feedback">{errors.logisticsCapacity.message}</div>)}
          </div>
        )}
      />


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
