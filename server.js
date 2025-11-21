const express = require("express");
const path = require("path");
const User = require("./models/User");
const mongoose = require("mongoose");
const app = express();

//mongoose connection
mongoose
.connect("mongodb://127.0.0.1:27017/EduSetu", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });

  // Redirect to login after successful signup
  res.redirect("/login");
});


// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");
  if (user.password !== password) return res.send("Incorrect password");

  // Redirect to home page after login
  res.redirect("/");
});


// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
