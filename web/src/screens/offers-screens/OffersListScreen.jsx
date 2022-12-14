import React, { useEffect, useState } from "react";
import OfferCard from "../../components/offers/offer-card/OfferCard";
import ScrollUp from "../../components/ui/scroll-up/ScrollUp";
import * as offerService from "../../services/offer-user-service";

function OffersListScreen() {
  const [offers, setOffers] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    offerService
      .getOffers()
      .then((offers) =>
        setOffers(
          offers.filter((offer) =>
            offer.originAddress.toLowerCase().includes(search.toLowerCase())
          )
        )
      )
      .catch((error) => console.error(error));
  }, [search]);

  if (!offers) {
    return (
      <>
        <div className="text-primary text-center mt-5 pt-5">
          <div className="spinner-grow mt-5" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <ScrollUp />
      <div className="input-group justify-content-center mt-3">
        <div className="form-outline">
          <input
            type="text"
            value={search}
            className="form-control me-2"
            placeholder="Search by origin address"
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </div>
        <span
          className="input-group-text ms-1"
          style={{ backgroundColor: "white", border: "none" }}
        >
          <i className="fa fa-search"></i>
        </span>
      </div>
      <div className="d-flex flex-wrap gap-3 justify-content-center">
      {offers?.map((offer) => (
        <OfferCard {...offer} key={offer.id} />
      ))}
      </div>
    </div>
  );
}

export default OffersListScreen;
