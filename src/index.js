const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
