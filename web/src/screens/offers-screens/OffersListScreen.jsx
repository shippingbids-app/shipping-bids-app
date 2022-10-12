import React, { useEffect, useState } from "react";
import OfferCard from "../../components/offer-card/OfferCard";
import * as offerService from "../../services/offer-user-service";

function OffersListScreen() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    offerService
      .getOffers()
      .then((offers) => setOffers(offers))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    <div className="container">
      {offers?.map((offer) => (
        <OfferCard {...offer} key={offer.id} />
      ))}
    </div>
  );
}

export default OffersListScreen;
