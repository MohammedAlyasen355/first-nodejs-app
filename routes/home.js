const express = require("express");
const home = express.Router();

home.get("/", (req, res) => {
  res.send(courses);
  // res.render("index", { title: "TuhMoh", message: "You are welcome" });
});

module.exports = home;
