import "./OfferDetail.css";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as offerService from "../../services/offer-user-service";
import { AuthContext } from "../../contexts/AuthContext";
import capacities from "../../data/capacities";
import services from "../../data/services";
import { AlertContext } from "../../contexts/AlertContext";
import Avatar from "@mui/material/Avatar";

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
  const serviceIcon = service[0]?.icon


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
        <div className="text-primary text-center mt-5 pt-5">
          <div className="spinner-grow mt-5" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="card mt-3">
        <div className="card-body">
          <button
            className="deleteButton btn btn-sm text-danger "
            onClick={() => handleDeleteOffer(offer)}
          >
            <b>X</b>
          </button>

          <h1 className="text-center py-1 fw-bold text-decoration-underline">
            {offer.title}
          </h1>
          <Link
            to={`/users/${offer?.author?.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex flex-row justify-content-center align-items-center m-3">
              <Avatar
                alt={offer?.author?.username}
                src={offer?.author?.image}
                variant="rounded"
              />
              <h3 className="ms-2">{offer?.author?.username}</h3>
            </div>
          </Link>
          <br />
          <h3 className="fw-bold text-center">
            <i className="fa fa-eur me-2"></i>Initial price:{" "}
            {offer.initialPrice}€
          </h3>
          <br />
          
          <h2>
            <i className="fa fa-location-arrow me-2 text-primary"></i>From:{" "}
            {offer.originAddress}
          </h2>
          <h2>
            <i className="fa fa-map-marker me-2 text-danger"></i>To:{" "}
            {offer.destinationAddress}
          </h2>
          <br />
          <h3 className="fw-bold text-center">
            <i className="fa fa-calendar fa-sm me-2"></i>Date:{" "}
            {moment(offer.expirationDate).format("DD MMM YY, HH:mm")}
          </h3>
          <br />
          <h5>
            <i className="fa fa-archive me-2"></i> {capacityToShow}
          </h5>
          <h5>
            <i className={`fa fa-${serviceIcon} me-2`}></i> {serviceToShow}
          </h5>
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
              <b>BIDS</b>
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
                <button type="submit" className="btn btn-sm btn-info">
                  Bid
                </button>
              </form>

              {offer.bids
                .sort((a, b) => {
                  return a.bid - b.bid;
                })
                .map((bid) => (
                  <div className="bidBox mb-4 border py-2 ps-2" key={bid.id}>
                    <small>
                      <Link
                        to={`/users/${bid?.user?.id}`}
                        className="text-dark"
                      >
                        <div className="d-flex flex-row">
                        <Avatar
                          alt={bid?.user?.username}
                          src={bid?.user?.image}
                        />
                        <b className="ms-2 align-self-center">
                          {bid?.user?.username}
                        </b>
                        <b className="ms-2 align-self-center">
                          {bid?.user?.rating}
                          <i className="fa fa-star text-warning"></i>
                        </b>
                      </div>
                      </Link>
                    </small>
                    <p>
                      I am willing to make this shipment for: <b className="text-success">{bid.bid}€</b>
                    </p>

                    <button
                      className="deleteButton btn btn-sm text-danger"
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
              <b>COMMENTS</b>
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
                <button type="submit" className="btn btn-sm btn-info">
                  Comment
                </button>
              </form>
              {offer.comments.map((comment) => (
                <div
                  className="bidBox mb-4 border-bottom py-2"
                  key={comment.id}
                >
                  <small>
                    <Link
                      to={`/users/${comment?.user?.id}`}
                      className="text-dark"
                    >
                      <div className="d-flex flex-row">
                        <Avatar
                          alt={comment?.user?.username}
                          src={comment?.user?.image}
                        />
                        <b className="ms-2 align-self-center">
                          {comment?.user?.username}
                        </b>
                        <b className="ms-2 align-self-center">
                          {comment?.user?.rating}
                          <i className="fa fa-star text-warning"></i>
                        </b>
                      </div>
                    </Link>
                  </small>
                  <br />
                  <p>{comment.text}</p>
                  <button
                    className="deleteButton btn btn-sm text-danger "
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
