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

export function getOffer(id) {
  return http.get(`/offers/${id}`)
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
