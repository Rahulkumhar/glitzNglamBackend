const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/", removeFromCart);

module.exports = router;
