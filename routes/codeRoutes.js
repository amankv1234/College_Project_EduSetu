const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/run-code", async (req, res) => {
    try {
        const { code, lang } = req.body;

        const submission = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": process.env.RAPID_API_KEY,
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
            },
            body: JSON.stringify({
                language_id: lang,
                source_code: code
            })
        });

        const result = await submission.json();

        const output = result.stdout || result.stderr || result.compile_output || "No output";

        res.json({ output });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Execution Error" });
    }
});

module.exports = router;
