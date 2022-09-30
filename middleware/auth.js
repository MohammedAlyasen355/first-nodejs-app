const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) return res.status(401).send("Access Denied. Not token provided");
  // in this try-catch block we pass control or terminate it
  try {
    const decoded = jwt.verify(token, config.get("jwt-private-key") || "12345");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
