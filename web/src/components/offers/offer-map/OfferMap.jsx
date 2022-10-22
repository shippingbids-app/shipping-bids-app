import React from "react";
import GMaps from "../../g-maps/GMaps";

function OfferMap({ offers }) {
  const markers = offers?.map((offer) => ({
    title: offer.title,
    position: { lat: offer.origin[0], lng: offer.origin[1] },
    id: offer.id,
    destination: offer.destinationAddress,
    capacity: offer.logisticsCapacity,
  }));

  const center = { lat: 40.41, lng: -3.70 };
  return <GMaps markers={markers} center={center} zoom={5.2} />;
}

export default OfferMap;
