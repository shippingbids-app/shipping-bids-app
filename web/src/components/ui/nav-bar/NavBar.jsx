import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Shipping Bids</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/offers" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Offers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/map" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Map</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>User</NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar