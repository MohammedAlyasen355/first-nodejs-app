const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    lastname: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
    }
  })
);

exports.Student = Student;
