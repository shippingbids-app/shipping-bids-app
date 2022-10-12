import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserProfile } from "../../services/offer-user-service";

function UserDetailScreen() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const services = user?.services[0];

  useEffect(() => {
    getUserProfile(id)
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  }, [id]);
  console.log(user);

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
    <div>
      {/* <h1>User name: {user?.username}</h1>
      <img src={user?.image} alt={user?.username} />
      <h1>Email: {user?.email}</h1>
      <h1>Phone Number: {user?.phoneNumber}</h1>
      <h1>Offers:</h1>
      {user?.offers.map((offer) => (
        <h1 key={offer.id}>Offer: {offer.title}</h1>
      ))}
      {user?.services.map((service) => (
        <h1 key={service.id}>Service available on: {service.address}</h1>
      ))} */}
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
        </div>
        <ul className="list-group pt-3">
          <h3 className="ms-5 text-primary">Offers: </h3>
          {user?.offers.map((offer) => (
            <li className="list-group-item" key={offer.id}>
              Offer: {offer.title}
            </li>
          ))}
        </ul>
        {services ? (
          <ul className="list-group pt-3">
            <h3 className="ms-5 text-primary">Services: </h3>
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
