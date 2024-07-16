const products = require("../data/products");

const getProducts = (req, res) => {
  res.json(products);
};

const getProductList = (req, res) => {
  const list = req.params.list;
  if (products[list]) {
    res.json(products[list]);
  } else {
    res.status(404).send("List not found");
  }
};

const getProduct = (req, res) => {
  const list = req.params.list;
  const id = parseInt(req.params.id);
  if (products[list]) {
    const product = products[list].find((p) => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } else {
    res.status(404).send("List not found");
  }
};

module.exports = {
  getProducts,
  getProductList,
  getProduct,
};
