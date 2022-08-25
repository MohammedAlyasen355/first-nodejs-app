const express = require("express");
const router = express.Router;

router.get("/", (req, res) => {
  // res.send(courses);
  res.render("index", { title: "TuhMoh", message: "You are welcome" });
});

module.exports = home;
