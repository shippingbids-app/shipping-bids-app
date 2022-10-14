const express = require("express");
const router = express.Router();
const { auth, offer, service, comment, bid } = require("../controllers/");
const {
  secure,
  offersMid,
  servicesMid,
  commentsMid,
  bidMid,
} = require("../middlewares");

router.post("/register", auth.register);
router.post("/authenticate", auth.authenticate);
router.get("/profile", auth.profile)
router.get("/users", secure.isAuthenticated, auth.listUsers);
router.get("/users/:id", secure.isAuthenticated, auth.userProfile);
router.patch("/users/:id", secure.isAuthenticated, auth.userProfileUpdate);
router.delete("/logout", auth.logout);

router.post("/offers/create", secure.isAuthenticated, offer.create);
router.get("/offers", secure.isAuthenticated, offer.list);
router.get("/offers/:offerId", secure.isAuthenticated, offer.detail);
router.delete(
  "/offers/:offerId",
  secure.isAuthenticated,
  offersMid.isOwnedByUser,
  offer.delete
);

router.post("/offers/:offerId/bids", secure.isAuthenticated, offersMid.authorCanNotMakeBids, bid.create);
router.delete(
  "/offers/:offerId/bids/:id",
  secure.isAuthenticated,
  bidMid.bidIsOwnedByUser,
  bid.delete
);

router.post(
  "/offers/:offerId/comments",
  secure.isAuthenticated,
  comment.create
);
router.delete(
  "/offers/:offerId/comments/:id",
  secure.isAuthenticated,
  commentsMid.isComentOwnedByUser,
  comment.delete
);


router.post("/services/create", secure.isAuthenticated, service.create);
router.get("/services", secure.isAuthenticated, service.list);
router.get("/services/:serviceId", secure.isAuthenticated, service.detail);
router.patch(
  "/services/:serviceId",
  secure.isAuthenticated,
  servicesMid.isOwnedByUser,
  service.updateService
);
router.delete(
  "/services/:serviceId",
  secure.isAuthenticated,
  servicesMid.isOwnedByUser,
  service.delete
);

module.exports = router;
