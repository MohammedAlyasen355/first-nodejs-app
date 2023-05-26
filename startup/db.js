const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    // using of "localhost" instead "127.0.0.1:27017"
    .connect("mongodb://127.0.0.1:27017/playground", {useUnifiedTopology: true})
    .then(() => winston.info("Connected to MongoDB."))
    .catch((err) => winston.error(err.message, err));
};
