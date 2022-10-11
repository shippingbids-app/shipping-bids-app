import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as offerService from "../../services/offer-user-service";

function OfferDetail() {
  const [offer, setOffer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    offerService
      .getOffer(id)
      .then((offer) => setOffer(offer))
      .catch((error) => console.error(error));
  }, [id]);

  if (!offer) {
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>{offer.title}</h1>
    </div>
  );
}

export default OfferDetail;
