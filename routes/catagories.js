const express = require("express");
const router = express.Router();
const { categoryBodyValidator } = require("../helper");
const { Category } = require("../models/category"); // relative path later

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    console.log("get-all " + error);
  }
});

router.post("/", async (req, res) => {
  const { error } = categoryBodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  let category = new Category({
    name: req.body.name,
    phone: req.body.phone,
  });

  category = await category.save();
  res.send(category);
});

module.exports = router;
