import React from 'react'

function ImageInput({ register, errors}) {
  return (
    <div>        
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
    </div>
  )
}

export default ImageInput