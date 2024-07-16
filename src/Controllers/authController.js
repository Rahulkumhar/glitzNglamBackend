const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

const secretKey = "your_secret_key"; // Replace with your own secret key

const signUp = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT
  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};

module.exports = {
  signUp,
  login,
};
