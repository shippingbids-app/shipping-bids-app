import "./OfferDetail.css";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as offerService from "../../services/offer-user-service";
import { AuthContext } from "../../contexts/AuthContext";
import capacities from "../../data/capacities";
import services from "../../data/services";
import { AlertContext } from "../../contexts/AlertContext";

function OfferDetail() {
  const [offer, setOffer] = useState(null);
  const { offerId } = useParams();
  const user = useContext(AuthContext);
  const alertText = useContext(AlertContext);
  const capacity = capacities.filter(
    (cap) => cap.value === offer?.logisticsCapacity[0]
  );
  const capacityToShow = capacity[0]?.label;

  const service = services.filter((serv) => serv.value === offer?.services[0]);
  const serviceToShow = service[0]?.label;

  const navigation = useNavigate();

  useEffect(() => {
    offerService
      .getOffer(offerId)
      .then((offer) => setOffer(offer))
      .catch((error) => console.error(error));
  }, [offerId]);

  const handleDeleteOffer = (offer) => {
    const offerId = offer.id;

    if (offer.author?.id !== user.user?.id) {
      alertText.setAlert("You can't delete this offer");
    } else {
      offerService
        .offerDelete(offerId)
        .then(() => {
          console.log("offer deleted");
          navigation("/offers");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleNewComment = (event) => {
    event.preventDefault();
    const form = event.target;

    offerService
      .createOfferComment(offerId, { text: form.text.value })
      .then((comment) => {
        offerService.getOffer(offerId).then((offer) => setOffer(offer));
        // debugger
        form.text.value = "";
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteComment = (comment) => {
    const id = comment.id;

    if (comment.user?.id !== user.user.id) {
      alertText.setAlert("You can't delete this comment");
    }

    offerService
      .deleteOfferComment(offerId, id)
      .then(() => {
        offerService.getOffer(offerId).then((offer) => setOffer(offer));
      })
      .catch((error) => console.error(error));
  };

  const handleNewBid = (event) => {
    event.preventDefault();
    const form = event.target;

    if (offer.initialPrice < form.bid.value) {
      alertText.setAlert("Bids must be lower than the initial price");
    }

    offerService
      .createOfferBid(offerId, { bid: form.bid.value })
      .then((bid) => {
        offerService.getOffer(offerId).then((offer) => setOffer(offer));
        form.bid.value = "";
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteBid = (bid) => {
    const id = bid.id;

    if (bid.user?.id !== user.user.id) {
      alertText.setAlert("You can't delete this bid");
    }

    offerService
      .deleteOfferBid(offerId, id)
      .then(() => {
        offerService.getOffer(offerId).then((offer) => setOffer(offer));
      })
      .catch((error) => console.error(error));
  };

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
      <div className="card">
        <div className="card-body">
          <button
            className="deleteButton btn btn-sm text-danger "
            onClick={() => handleDeleteOffer(offer)}
          >
            <b>X</b>
          </button>

          <h3>Offer name: {offer.title}</h3>
          <h3>Created by: {offer?.author?.username}</h3>
          <h3>Ship from: {offer.originAddress}</h3>
          <h3>Ship to: {offer.destinationAddress}</h3>
          <h3>Initial price: {offer.initialPrice}€</h3>
          <h3>Logisctics size: {capacityToShow}</h3>
          <h3>Type of service: {serviceToShow}</h3>
          <h3>Offer state: {offer.offerState[0]}</h3>
          <h3>OfferId: {offer.id}</h3>
          <h3>
            Expiration date:{" "}
            {moment(offer.expirationDate).format("DD MMM YY, HH:mm")}
          </h3>
        </div>
      </div>

      <div
        className="accordion accordion-flush mt-5"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Bids
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <form onSubmit={handleNewBid} className="mb-3">
                <input
                  type="number"
                  name="bid"
                  className="form-control mb-2"
                  placeholder="Add your bid"
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Bid
                </button>
              </form>

              {offer.bids.map((bid) => (
                <div className="bidBox mb-4 border py-2 ps-2" key={bid.id}>
                  <small>
                    Bid created by:
                    <Link to={`/users/${bid?.user?.id}`} className="text-dark">
                      <b className="ms-2">{bid?.user?.username}</b>
                    </Link>
                    <b className="ms-2">
                      {bid?.user?.rating}{" "}
                      <i className="fa fa-star text-warning"></i>
                    </b>
                  </small>
                  <br />
                  <br />
                  <p>
                    I am willing to make this shipment for: <b>{bid.bid}€</b>
                  </p>

                  <button
                    className="deleteButton  btn btn-sm text-danger "
                    onClick={() => handleDeleteBid(bid)}
                  >
                    <b>X</b>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Comments
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <form onSubmit={handleNewComment} className="mb-3">
                <textarea
                  name="text"
                  className="form-control mb-2"
                  placeholder="Add Comment..."
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Comment
                </button>
              </form>
              {offer.comments.map((comment) => (
                <div
                  className="bidBox mb-4 border-bottom py-2"
                  key={comment.id}
                >
                  <small>
                    Comment by:
                    <Link
                      to={`/users/${comment?.user?.id}`}
                      className="text-dark"
                    >
                      <b className="ms-2">{comment?.user?.username}</b>
                    </Link>
                    <b className="ms-2">
                      {comment?.user?.rating}{" "}
                      <i className="fa fa-star text-warning"></i>
                    </b>
                    {/* <h5 className="ms-2">{comment.user.id}</h5> */}
                  </small>
                  <br />
                  <br />
                  <p>{comment.text}</p>
                  <button
                    className="deleteButton  btn btn-sm text-danger "
                    onClick={() => handleDeleteComment(comment)}
                  >
                    <b>X</b>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferDetail;
