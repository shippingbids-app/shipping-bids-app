import "./OfferDetail.css"
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as offerService from "../../services/offer-user-service";

function OfferDetail() {
  const [offer, setOffer] = useState(null);
  const { offerId } = useParams();
  console.log(offer)

  useEffect(() => {
    offerService
      .getOffer(offerId)
      .then((offer) => setOffer(offer))
      .catch((error) => console.error(error));
  }, [offerId]);

  const handleNewComment = (event) => {
    event.preventDefault()
    const form = event.target
    console.log("comment " + form.text.value)

    offerService.createOfferComment(offerId, {text: form.text.value})
      .then((comment) => {
        console.log(comment)
        setOffer({
          ...offer,
          comments: [...offer.comments, comment]
        })
      })
      .catch(error => console.error(error))
  }

  const handleNewBid = (event) => {
    event.preventDefault()
    const form = event.target
    console.log("bid " + form.bid.value)

    offerService.createOfferBid(offerId, {bid: form.bid.value})
      .then((bid) => {
        console.log(bid)
        setOffer({
          ...offer,
          bids: [...offer.bids, bid]
        })
      })
      .catch(error => console.error(error))
  }

  const handleDeleteBid = (bid) => {
    const id = bid.id
    console.log(bid)
    offerService.deleteOfferBid(offerId, id)
      .then(() => console.log("offer erased"))
      .catch((error) => console.error(error))
  }

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
      <h3>Offer name: {offer.title}</h3>
      <h3>Created by: {offer.author}</h3>
      <h3>Ship from: {offer.originAddress}</h3>
      <h3>Ship to: {offer.destinationAddress}</h3>
      <h3>Initial price: {offer.initialPrice}€</h3>
      <h3>Logisctics size: {offer.logisticsCapacity[0]}</h3>      
      <h3>Type of service: {offer.services[0]}</h3>
      <h3>Offer state: {offer.offerState[0]}</h3>
      <h3>OfferId: {offer.id}€</h3>
      <h3>Expiration date: {moment(offer.expirationDate).format("DD MMM YY, h:mm")}</h3>

      <h5>Bids</h5>

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
          <p>I am willing to make this shipment for: <b>{bid.bid}€</b></p>
          <p>Bid id<b>{bid.id}</b></p>
          <small>Bid created by: <b>{bid.user.username}</b></small>
          <button className="deleteButton  btn btn-sm text-danger " onClick={() => handleDeleteBid(bid)}><b>X</b></button>
        </div>
      ))}

      <h5>Comments</h5>

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
        <div className="mb-4 border-bottom py-2" key={comment.id}>
          <p>{comment.text}</p>
          <small>Por {comment.user.username}</small>
        </div>
      ))}
    </div>
  );
}

export default OfferDetail;
