const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const { imageSchema } = require("./image");
const { variantSchema } = require("./variant");
const { optionSchema } = require("./option");
const { pricerangeSchema } = require("./pricerange.js");
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    description: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },

    pricerange: {
      type: pricerangeSchema,
      required: true,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    image: {
      type: imageSchema,
      required: true,
    },
    variant: {
      type: variantSchema,
      required: true,
    },
    option: {
      type: optionSchema,
      required: true,
    },
    price:{
      type: Number,
      required: true
    },
 featureimage: {
  type: imageSchema,
  required: true,
},
handle: {
  type: String,
  required: true,
},
  })
);

exports.Product = Product;
