const express = require("express");
const router = express.Router();

const { homePage, loginPage, signupPage } = require("../controllers/mainController");
const { roadmapPage, hackthonPage,progressPage, chatPage, testPage } = require("../controllers/authController");

router.get("/", homePage);
router.get("/login", loginPage);
router.get("/signup", signupPage);
router.get("/roadmap", roadmapPage);
router.get("/hackthon", hackthonPage);
router.get("/progress", progressPage);
router.get("/chat", chatPage);
router.get("/test", testPage)




module.exports = router;
