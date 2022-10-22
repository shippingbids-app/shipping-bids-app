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
            <i className=" fa fa-user-circle-o text-primary me-2"></i>
            <b>{user?.username}</b>
          </h5>
          <h5 className="card-title">
            <i className=" fa fa-envelope-o me-2"></i>
            <b>{user?.email}</b>
          </h5>
          <h5 className="card-title">
            <i className=" fa fa-phone text-success me-2"></i>
            <b>{user?.phoneNumber}</b>
          </h5>
          <h5 className="card-title">
            <i className=" fa fa-signal me-2"></i>
            <b>{user?.rating}</b> <i className="fa fa-star text-warning"></i>
          </h5>
        </div>

        {userLogged?.user?.id === user?.id && (
          <div className=" d-flex justify-content-center mb-3">
            <Link to={`/users/${id}/profile`}>
              <button className="btn btn-outline-primary btn-sm mx-auto me-3">
                UPDATE
              </button>
            </Link>
          </div>
        )}
      </div>

      {services ? (
        <div class="card my-3">
          <div class="card-body">
            <div className="d-flex justify-content-between">
              <h3 className="text-primary">Services:</h3>
              <Link to={`/services/${serviceId}`}>
                <button className="btn btn-outline-primary btn-sm mb-3  ">
                  UPDATE
                </button>
              </Link>
            </div>
            <h5 class="card-title">
              <i className="fa fa-globe text-info fa-fw me-3"></i> Service
              available in:
            </h5>
            <div className="d-flex justify-content-center">
              <h6 class="card-subtitle mt-2 text-muted ms-3">
                {services.address}
              </h6>
            </div>
            <hr />
            <h5 class="card-title">
              <i className="fa fa-cubes text-warning fa-fw me-3"></i> Max
              capacity:
            </h5>
            <div className="d-flex justify-content-center">
              <h6 class="card-subtitle mt-2 text-muted ms-3">
                {capacityToShow}
              </h6>
            </div>
            <hr />
            <h5 class="card-title">
              <i className="fa fa-paper-plane fa-fw me-3"></i> Available
              vehicles:
            </h5>
            <li className="list-group-item">
              <div className="d-flex flex-row justify-content-center">
                {services.vehicles.map((vehicle) => (
                  <i
                    className={`fa fa-${vehicle} ms-4 text-muted`}
                    key={vehicle}
                  ></i>
                ))}
              </div>
            </li>
          </div>
        </div>
      ) : (
        <></>
      )}

      {offers ? (
        <div class="card my-3">
          <div class="card-body">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <h3 className="text-primary">Offers:</h3>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    {offers.map((offer) => (
                      <>
                        <ul key={offer.id} className="list-group">
                          <Link
                            to={`/offers/${offer.id}`}
                            className=" text-dark"
                          >
                            <li className="list-group-item text-center mb-1 rounded">
                              <h3>{offer.title}</h3>
                            </li>
                          </Link>
                        </ul>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UserDetailScreen;

{
  /* <ul className="list-group pt-3">
  <h3 className="ms-5 text-primary">Offers: </h3>
  {user?.offers.map((offer) => (
    <li className="list-group-item" key={offer.id}>
      Offer:
      <Link to={`/offers/${offer.id}`} className="ms-2 text-dark">
        {offer.title}
      </Link>
    </li>
  ))}
</ul>; */
}

//<ul className="list-group pt-3">
// <div className="d-flex justify-content-between pb-3">
//  <h3 className="ms-5 text-primary">Services: </h3>
// <Link to={`/services/${serviceId}`}>
// <button className="btn btn-outline-primary btn-sm align-self-center me-3">
// UPDATE
//  </button>
//</Link>
//  </div>
//  <li className="list-group-item">
//    Service available on: <b>{services.address}</b>
//  </li>
//  <h4 className="ms-5 text-primary">Vehicles:</h4>
//  <li className="list-group-item">
//  {services.vehicles.map((vehicle) => (
//
//     <i className={`fa fa-${vehicle} ms-4`} key={vehicle}></i>
//
//  ))}
//  </li>
//   <h4 className="ms-5 text-primary">Capacity:</h4>
//  <li className="list-group-item" key={capacity}>
//   <b>{capacityToShow}</b>
//  </li>
// </ul>
