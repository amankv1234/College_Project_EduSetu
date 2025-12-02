const express = require("express");
const router = express.Router();

const { homePage, loginPage, signupPage } = require("../controllers/mainController");

router.get("/", homePage);
router.get("/login", loginPage);
router.get("/signup", signupPage);

module.exports = router;
