const express = require("express");
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

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

module.exports = router;
