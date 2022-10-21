import React, { useEffect, useState } from "react";
import OfferMap from "../components/offers/offer-map/OfferMap";
import { getOffers } from "../services/offer-user-service";

function MapScreen() {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    getOffers(offers)
      .then((offers) => setOffers(offers))
      .catch(error => console.error(error))
  }, [])
  return (
    <div className="mt-3">
      <OfferMap offers={offers}/>
    </div>
  );
}

export default MapScreen;
