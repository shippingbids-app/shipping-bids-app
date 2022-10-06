const express = require("express");
const router = express.Router();
const { auth, offer, service } = require("../controllers/");
const { secure, offersMid } = require("../middlewares");

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

router.post("/services/create", secure.isAuthenticated, service.create)

module.exports = router;
