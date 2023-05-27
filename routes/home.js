const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Steam-AIU",
    message: `You are welcome .. Node app is working on port 
      ${process.env.PORT || 3000}`,
  });
});

module.exports = router;
