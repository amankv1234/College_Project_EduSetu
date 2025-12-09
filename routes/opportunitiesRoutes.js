const express = require("express");
const router = express.Router();
const { getStaticOpportunities } = require("../controllers/opportunitiesController");

// LEVEL 1
router.get("/opportunities/static", getStaticOpportunities);

module.exports = router;
