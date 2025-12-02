const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const authRoutes = require("../routes/authRoutes");
const mainRoutes = require("../routes/mainRoutes");

const app = express();

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
app.use("/", mainRoutes);
app.use("/", authRoutes);

// Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
