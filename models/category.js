const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxLength: 255 },
    phone: { type: String, minlength: 5, maxLength: 255 },
  })
);

exports.Category = Category;
