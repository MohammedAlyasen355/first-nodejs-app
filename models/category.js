const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxLength: 255 },
  phone: { type: String, minlength: 5, maxLength: 255 },
});

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.categorySchema = categorySchema;
