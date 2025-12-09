const express = require("express");
const router = express.Router();

router.post("/predict-success", (req, res) => {
    const { dsa, web, eng } = req.body;

    const score = Number(dsa) * 0.4 + Number(web) * 0.35 + Number(eng) * 0.25;

    let message = "";

    if (score >= 80) message = "🔥 Excellent! You are highly ready for placements.";
    else if (score >= 60) message = "👍 Good progress. Keep practicing DSA & Projects.";
    else message = "🚀 Start focusing more on DSA and Web Dev to boost your placement chances.";

    res.json({ prediction: message });
});

module.exports = router;
