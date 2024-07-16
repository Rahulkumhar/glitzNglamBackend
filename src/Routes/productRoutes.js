const express = require("express");
const {
  getProducts,
  getProductList,
  getProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/products/", getProduct);
router.get("/product/:list", getProductList);
router.get("/:list/:id", getProduct);

module.exports = router;
