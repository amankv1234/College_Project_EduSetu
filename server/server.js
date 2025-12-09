const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const aiRoutes = require ("../routes/aiRoutes.js");
const authRoutes = require("../routes/authRoutes");
const mainRoutes = require("../routes/mainRoutes");
const codeRoutes = require("../routes/codeRoutes");
const successRoutes = require("../routes/successRoutes");
const opportunitiesRoutes = require("../routes/opportunitiesRoutes");
const app = express();
app.use(express.json());
// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/EduSetu", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// ROUTES
app.get("/livecode", (req, res) => {
    res.render("livecode");
});
app.get("/success", (req, res) => {
    res.render("success");
});
app.get("/opportunities", (req, res) => {
    res.render("opportunities");
});

app.use("/", opportunitiesRoutes);
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/api", aiRoutes);
app.use("/api", codeRoutes);
app.use("/api", successRoutes);
// Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
