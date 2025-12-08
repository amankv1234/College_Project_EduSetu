require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateTest = async (req, res) => {
       console.log("REQ BODY:", req.body);
  try {
    const { topic, count } = req.body;

    if (!topic || !count) {
      return res.status(400).json({ error: "Topic & number required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"   // NEW & VALID MODEL
    });

    const prompt = `
    Generate ${count} MCQ questions for topic "${topic}".
    Format:
    Q1. Question?
    A) Option1
    B) Option2
    C) Option3
    D) Option4
    Correct: A
    `;

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      questions: result.response.text()
    });

  } catch (err) {
    console.log("AI ERROR:", err);
    res.status(500).json({ success: false, error: "AI Server Error" });
  }
};
