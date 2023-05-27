const express = require("express");
const router = express.Router();
const { productBodyValidator } = require("../helper");
const { Product } = require("../models/product"); // relative path later
const { Category } = require("../models/category");

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

  // we expect to get category id no the category obj from front
  const category = await Category.findById(req.body.categoryid);
  if (!category) return res.status(400).send("category is not right");

  let product = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    category: { _id: category._id, name: category.name },
  });

  product = await product.save();
  res.send(product);
});

module.exports = router;
