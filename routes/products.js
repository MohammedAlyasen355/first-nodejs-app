const express = require("express");
const router = express.Router();
const { productBodyValidator } = require("../helper");
const { Product } = require("../models/product"); // relative path later

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log("get-all " + error);
  }
});

router.post("/", async (req, res) => {
  const { error } = productBodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  let product = new Product({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  product = await product.save();
  res.send(product);
});

module.exports = router;
