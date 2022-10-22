import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import capacities from "../../../data/capacities";
import { servicesType } from "../../../data";

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
  const capacity = capacities.filter(
    (cap) => cap.value === logisticsCapacity[0]
  );
  const capacityToShow = capacity[0]?.label;

  const service = servicesType.filter((serv) => serv.value === services[0]);
  const serviceToShow = service[0]?.label;

  return (
    <div className="card text-center my-2">
      <div className="card-header">{serviceToShow}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          Ship {capacityToShow} box, from {originAddress} to{" "}
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
