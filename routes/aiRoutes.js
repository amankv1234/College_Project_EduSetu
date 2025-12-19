const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

router.post("/generate-test", aiController.generateTest);
router.post("/ai/suggest", aiController.aiSuggest);

module.exports = router;
