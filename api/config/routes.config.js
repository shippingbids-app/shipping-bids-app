const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller")


router.post("/register", auth.register)
router.post("/authenticate", auth.authenticate)
router.get("/users", auth.listUsers)
// router.get("/profile/:id", auth.profile)
// router.patch("/profile/:id", auth.profileUpdate)

module.exports = router;
