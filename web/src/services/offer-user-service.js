import axios from "axios"

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
})

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("unauthenticated, redirect to login");
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getOffers() {
  return http.get("/offers")
}

export function getOffer(offerId) {
  return http.get(`/offers/${offerId}`)
}

export function authenticate(data) {
  return http.post("/authenticate", data);
}

export function getProfile() {
  return http.get("/profile")
}

export function getUserProfile(id) {
  return http.get(`/users/${id}`)
}

export function userRegister(user) {
  user.image = user.image[0]
  const data = new FormData()

  Object.keys(user).forEach(key => {
    data.append(key, user[key])
  })

  return http.post("/register", data)
}

export function userLogout() {
  return http.delete("/logout")
}

export function offerRegister(data) {
  return http.post("/offers/create", data)
}

export function createOfferComment(offerId, data) {
  return http.post(`/offers/${offerId}/comments`, data)
}

export function deleteOfferComment(offerId, id) {
  return http.delete(`offers/${offerId}/comments/${id}`)
}

export function createOfferBid(offerId, data) {
  return http.post(`/offers/${offerId}/bids`, data)
}

export function deleteOfferBid(offerId, id) {
  return http.delete(`offers/${offerId}/bids/${id}`)
}

export function serviceRegister(data) {
  return http.post("/services/create", data)
}

export function serviceUpdate(data, serviceId) {
  return http.patch(`/services/${serviceId}`, data)
}