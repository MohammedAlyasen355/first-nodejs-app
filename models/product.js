const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    price:{
      type: Number,
      required: true
    },
    

  })
);

exports.Product = Product;
