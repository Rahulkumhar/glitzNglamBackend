const carts = require("../models/cartModel");
const products = require("../data/products");

const getCart = (req, res) => {
  const username = req.user.username;
  const cart = carts[username] || [];
  res.json(cart);
};

const addToCart = (req, res) => {
  const username = req.user.username;
  const { productId, quantity } = req.body;

  const product = products.list1
    .concat(products.list2)
    .find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!carts[username]) {
    carts[username] = [];
  }

  const existingItem = carts[username].find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[username].push({ productId, quantity });
  }

  res.status(200).json({ message: "Product added to cart" });
};

const updateCart = (req, res) => {
  const username = req.user.username;
  const { productId, quantity } = req.body;

  const product = products.list1
    .concat(products.list2)
    .find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!carts[username]) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingItem = carts[username].find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity = quantity;
    res.status(200).json({ message: "Cart updated" });
  } else {
    res.status(404).json({ message: "Product not found in cart" });
  }
};

const removeFromCart = (req, res) => {
  const username = req.user.username;
  const { productId } = req.body;

  if (!carts[username]) {
    return res.status(404).json({ message: "Cart not found" });
  }

  carts[username] = carts[username].filter(
    (item) => item.productId !== productId
  );

  res.status(200).json({ message: "Product removed from cart" });
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};
