import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/offer-user-service";

function UserDetailScreen() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const services = user?.services[0];
  const offers = user?.offers;

  const serviceId = user?.services[0]?.id

  useEffect(() => {
    getUserProfile(id)
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  }, [id]);

  if (!user) {
    return (
      <>
        <div className="d-flex justify-content-center mt-5 pt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }
console.log(user)
  return (
    <div>
      <div className="card">
        <img src={user?.image} className="card-img-top" alt={user?.username} />
        <div className="card-body">
          <h5 className="card-title">
            User name: <b>{user?.username}</b>
          </h5>
          <h5 className="card-title">
            Email: <b>{user?.email}</b>
          </h5>
          <h5 className="card-title">
            Phone number: <b>{user?.phoneNumber}</b>
          </h5>
          <h5 className="card-title">
            Rating: <b>{user?.rating} <i className="fa fa-star text-warning"></i></b>
          </h5>
        </div>
        {offers ? (
          <ul className="list-group pt-3">
            <h3 className="ms-5 text-primary">Offers: </h3>
            {user?.offers.map((offer) => (
              <li className="list-group-item" key={offer.id}>
                Offer:
                <Link to={`/offers/${offer.id}`} className="ms-2 text-dark">
                  {offer.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}

        {services ? (
          <ul className="list-group pt-3">
            <div className="d-flex justify-content-between pb-3">
              <h3 className="ms-5 text-primary">Services: </h3>
              <Link to={`/services/${serviceId}`}>
              <button className="btn btn-outline-primary btn-sm align-self-center me-3">UPDATE</button>
              </Link>
              </div>
            <li className="list-group-item">
              Service available on: <b>{services.address}</b>
            </li>
            <h4 className="ms-5 text-primary">Vehicles:</h4>
            {services.vehicles.map((vehicle) => (
              <li className="list-group-item" key={vehicle}>
                <b>{vehicle}</b>
              </li>
            ))}
            <h4 className="ms-5 text-primary">Capacity:</h4>
            {services.logisticsCapacity.map((capacity) => (
              <li className="list-group-item" key={capacity}>
                <b>{capacity}</b>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default UserDetailScreen;
