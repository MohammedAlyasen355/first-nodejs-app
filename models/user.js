const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 255,
  },
  email: {
    type: String,
    minlength: 5,
    maxLength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxLength: 1024,
    required: true,
  },
  isAdmin: Boolean,
});

// Information Expert Principle
// who's know the info the one that will act with it
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get("jwt-private-key") || "12345"
  );
};

const User = mongoose.model("User", userSchema);

userBodyValidator = (body) => {
  const scheme = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return scheme.validate(body);
};

exports.User = User;
exports.userBodyValidator = userBodyValidator;
// exports.userSchema = userSchema; no need to export it
