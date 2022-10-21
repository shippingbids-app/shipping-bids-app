import React from "react";
import GMaps from "../../g-maps/GMaps";

function OfferMap({ offers }) {
    const markers = offers?.map((offer) => ({title: offer.title, position: { lat: offer.origin[0], lng: offer.origin[1] }}))
    // const markers = [{title: "patata", position: { lat: 42.23, lng: -8.72 }}]
    const center = { lat: 42.23, lng: -8.72 }
  return (
    <GMaps markers={markers} center={center} zoom={8} />
  );
}

export default OfferMap;
