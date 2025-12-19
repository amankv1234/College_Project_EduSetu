require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function generateWithRetry(model, prompt, retries = 3, delay = 2000) {
  try {
    return await model.generateContent(prompt);
  } catch (error) {
    if (error.status === 503 && retries > 0) {
      console.log(`Gemini overloaded. Retrying in ${delay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return generateWithRetry(model, prompt, retries - 1, delay * 2);
    }
    throw error;
  }
}

/* =====================================================
   1️⃣ MCQ GENERATOR API (Tumhara wala – FIXED)
===================================================== */
exports.generateTest = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { topic, count } = req.body;

    if (!topic || !count) {
      return res.status(400).json({
        success: false,
        error: "Topic & number required"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Generate ${count} MCQ questions for topic "${topic}".

Return ONLY valid JSON:
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]

No explanation. No markdown.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let questions;
    try {
      questions = JSON.parse(text);
    } catch (err) {
      console.error("JSON PARSE ERROR:", text);
      return res.status(500).json({
        success: false,
        error: "Invalid AI response format"
      });
    }

    res.json({
      success: true,
      questions
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      success: false,
      error: "AI Server Error"
    });
  }
};


/* =====================================================
   2️⃣ ROADMAP / SUGGESTION AI (JO PAHLE THA)
===================================================== */
exports.aiSuggest = async (req, res) => {
  try {
    const payload = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an expert career mentor.

Goal: ${payload.metadata.goal}
Domain: ${payload.metadata.domain}
Weekly Hours: ${payload.metadata.weeklyHours}
Target Weeks: ${payload.metadata.targetWeeks}
Skills: ${(payload.skills || []).join(", ")}


Return JSON only:
[
  { "title": "", "desc": "", "duration": "", "points": 10 }
]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let refinedSteps;
    try {
      refinedSteps = JSON.parse(text);
    } catch (err) {
      console.error("AI RAW OUTPUT:", text);
      return res.status(500).json({
        success: false,
        error: "Invalid AI response"
      });
    }

    res.json({
  success: true,
  refinedSteps
});

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      success: false,
      error: "AI Server Error"
    });
  }
};
