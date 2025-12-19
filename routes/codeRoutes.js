const express = require("express");
const router = express.Router();
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// existing route
router.post("/run-code", async (req, res) => {
  try {
    const { files, language, stdin } = req.body;

    if (!files || !files.length) {
      return res.json({ output: "No code provided" });
    }

    const sourceCode = files[0].code; // ACTIVE FILE
    console.log("SOURCE CODE:", sourceCode);
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
        body: JSON.stringify({
          language_id: Number(language),
          source_code: sourceCode,
          stdin: stdin || ""
        })
      }
    );

    const data = await response.json();

    const output =
      data.stdout ||
      data.stderr ||
      data.compile_output ||
      data.message ||
      "No output";

    res.json({
      status: "done",
      output
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Execution Error" });
  }
});

router.post("/run-testcases", async (req, res) => {
  try {
    const { files, language, testcases } = req.body;

    const results = [];

    for (let tc of testcases) {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
          },
          body: JSON.stringify({
            language_id: Number(language),
            source_code: files[0].code,
            stdin: tc.input || ""
          })
        }
      );

      const data = await response.json();

      results.push({
        input: tc.input,
        expected: tc.expected,
        output:
          data.stdout?.trim() ||
          data.stderr ||
          data.compile_output ||
          ""
      });
    }

    res.json(results);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Testcase execution failed" });
  }
});


module.exports = router;
