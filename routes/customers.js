const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validators = require("../helper");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 5, maxLength: 255 },
    phone: { type: String, required: true, minlength: 5, maxLength: 255 },
  })
);

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send(customers);
  } catch (error) {
    console.log("get-all " + error);
  }
});

router.post("/", async (req, res) => {
  const { error } = validators.customerBodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});
