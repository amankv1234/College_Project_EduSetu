const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/authController");

// SIGNUP POST
router.post("/signup", signupUser);

// LOGIN POST
router.post("/login", loginUser);

module.exports = router;
