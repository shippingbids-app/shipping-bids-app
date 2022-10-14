import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function OfferCard({
  author,
  id,
  title,
  logisticsCapacity,
  originAddress,
  destinationAddress,
  services,
  expirationDate,
}) {
  const offerId = id;

  return (
    <div className="card text-center my-2">
      <div className="card-header">{services[0]}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          Ship {logisticsCapacity[0]} box, from {originAddress} to{" "}
          {destinationAddress}
        </p>
        <Link to={`/offers/${offerId}`} className="btn btn-primary">
          Go bid!
        </Link>
      </div>
      <div className="card-footer text-muted">
        {author?.username} {moment({ expirationDate }).endOf("day").fromNow()}
      </div>
    </div>
  );
}

export default OfferCard;
