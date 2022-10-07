const express = require("express");
const router = express.Router();
const { auth, offer, service, comment } = require("../controllers/");
const {
  secure,
  offersMid,
  servicesMid,
  commentsMid,
} = require("../middlewares");

router.post("/register", auth.register);
router.post("/authenticate", auth.authenticate);
router.get("/users", secure.isAuthenticated, auth.listUsers);
router.get("/profile/:id", secure.isAuthenticated, auth.profile);
router.patch("/profile/:id", secure.isAuthenticated, auth.profileUpdate);

router.post("/offers/create", secure.isAuthenticated, offer.create);
router.get("/offers", secure.isAuthenticated, offer.list);
router.get("/offers/:id", secure.isAuthenticated, offer.detail);
router.delete(
  "/offers/:id",
  secure.isAuthenticated,
  offersMid.isOwnedByUser,
  offer.delete
);

router.post("/services/create", secure.isAuthenticated, service.create);
router.get("/services", secure.isAuthenticated, service.list);
router.get("/services/:id", secure.isAuthenticated, service.detail);
router.patch(
  "/services/:id",
  secure.isAuthenticated,
  servicesMid.isOwnedByUser,
  service.updateService
);
router.delete(
  "/services/:id",
  secure.isAuthenticated,
  servicesMid.isOwnedByUser,
  service.delete
);


router.post("/offers/:id/comments", secure.isAuthenticated, comment.create);
router.delete(
  "/offers/:id/comments/:commentId",
  secure.isAuthenticated,
  commentsMid.isComentOwnedByUser,
  comment.delete
);

module.exports = router;
