const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/generate-test", aiController.generateTest);

module.exports = router;
