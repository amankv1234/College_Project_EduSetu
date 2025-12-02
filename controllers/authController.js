const User = require("../models/User");

exports.signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });
  res.redirect("/login");
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.send("User not found");
  if (user.password !== password) return res.send("Incorrect password");

  res.redirect("/");
};
