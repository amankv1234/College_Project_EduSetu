const express = require("express");
const router = express.Router();
const { signupUser, loginUser , roadmapPage, hackthonPage,progressPage, chatPage, testPage } = require("../controllers/authController");

// SIGNUP POST
router.post("/signup", signupUser);

// LOGIN POST
router.post("/login", loginUser);
router.post("/roadmap", roadmapPage);
router.post("/hackthon", hackthonPage);
router.post("/progress", progressPage);
router.post("/chat", chatPage);
router.post("/test", testPage);





module.exports = router;
