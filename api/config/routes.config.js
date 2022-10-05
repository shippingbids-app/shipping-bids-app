const express = require("express");
const router = express.Router();
const { auth, offer } = require("../controllers/");

router.post("/register", auth.register);
router.post("/authenticate", auth.authenticate);
router.get("/users", auth.listUsers);
router.get("/profile/:id", auth.profile);
router.patch("/profile/:id", auth.profileUpdate);

router.post("/offers/create", offer.create)
router.get("/offers", offer.list)
router.get("/offers/:id", offer.detail)
router.delete("/offers/:id", offer.delete)

module.exports = router;
