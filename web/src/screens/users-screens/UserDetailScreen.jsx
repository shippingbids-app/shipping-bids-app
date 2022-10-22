import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/offer-user-service";
import { AuthContext } from "../../contexts/AuthContext";
import { capacities } from "../../data";

function UserDetailScreen() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const services = user?.services[0];
  const offers = user?.offers;

  const userLogged = useContext(AuthContext);

  const serviceId = user?.services[0]?.id;
  const capacity = capacities.filter(
    (cap) => cap.value === services?.logisticsCapacity[0]
  );
  const capacityToShow = capacity[0]?.label;
  
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

  return (
    <div className="mt-2">
      <div className="card">
        <img src={user?.image} className="card-img-top" alt={user?.username} />
        <div className="card-body">
          <h5 className="card-title">
            <i className=" fa fa-user-circle-o me-2"></i>
            <b>{user?.username}</b>
          </h5>
          <h5 className="card-title">
            <i className=" fa fa-envelope-o me-2"></i>
            <b>{user?.email}</b>
          </h5>
          <h5 className="card-title">
            <i className=" fa fa-phone me-2"></i>
            <b>{user?.phoneNumber}</b>
          </h5>
          <h5 className="card-title">
            <i className=" fa fa-signal me-2"></i>
            <b>{user?.rating}</b>{" "}
            <i className="fa fa-star text-warning"></i>
          </h5>

          {userLogged?.user?.id === user?.id && (
            <div className=" d-flex justify-content-center">
              <Link to={`/users/${id}/profile`}>
                <button className="btn btn-outline-primary btn-sm mx-auto me-3">
                  UPDATE
                </button>
              </Link>
            </div>
          )}
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
                <button className="btn btn-outline-primary btn-sm align-self-center me-3">
                  UPDATE
                </button>
              </Link>
            </div>
            <li className="list-group-item">
              Service available on: <b>{services.address}</b>
            </li>
            <h4 className="ms-5 text-primary">Vehicles:</h4>
            <li className="list-group-item">
            {services.vehicles.map((vehicle) => (
              
                <i className={`fa fa-${vehicle} ms-4`} key={vehicle}></i>
              
            ))}
            </li>
            <h4 className="ms-5 text-primary">Capacity:</h4>
              <li className="list-group-item" key={capacity}>
                <b>{capacityToShow}</b>
              </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default UserDetailScreen;
