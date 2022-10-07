const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/playground")
    .then(() => winston.info("Connected to MongoDB."))
    .catch((err) => winston.error(err.message, err));
};
