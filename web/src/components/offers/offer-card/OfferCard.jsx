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
  const serviceIcon = service[0]?.icon

  return (
    <div className="card text-center my-2 col-md-5 col-xl-3 gap-2 border-0 shadow">
      <div className="card-header bg-gradient">
      <i className={`fa fa-${serviceIcon}`}></i> {serviceToShow}</div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">
          <u>{capacityToShow}</u> from <b>{originAddress}</b> to{" "}
          <b>{destinationAddress}</b>        </p>
        <Link to={`/offers/${offerId}`} className="btn btn-primary shadow">
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
