const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const { User, userBodyValidator } = require("../models/user"); // relative path later

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log("get-all " + error);
  }
});

router.post("/", async (req, res) => {
  const { error } = userBodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // it's better to hashing after user creation so no schema error
  // const salt = await bcrypt.genSalt(10);
  // const hashed = await bcrypt.hash(req.body.password, salt);

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  // here destructuring the obj showed a lot of the interesting things
  // const { password, ...obj } = user;
  // console.log(obj, user);

  res.header("x-token", user.generateToken()).send(_.pick(user, ["name", "email", "_id"]));
});

module.exports = router;
