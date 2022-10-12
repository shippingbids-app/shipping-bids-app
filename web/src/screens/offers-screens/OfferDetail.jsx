import moment from "moment/moment";
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

  const handleNewComment = (event) => {
    event.preventDefault()
    const form = event.target
    console.log(form.text.value)

    offerService.createOfferComment(id, {text: form.text.value})
      .then((comment) => {
        console.log(comment)
        setOffer({
          ...offer,
          comments: [...offer.comments, comment]
        })
      })
      .catch(error => console.error(error))
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
      <h3>Expiration date: {moment(offer.expirationDate).format("DD MMM YY, h:mm")}</h3>

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
          <small>Por {comment.user.name}</small>
        </div>
      ))}
    </div>
  );
}

export default OfferDetail;
