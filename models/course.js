const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    // author: String,
    // tags: {
    //   type: Array,
    //   validate: {
    //     validator: (v) => {
    //       return v && v.length > 0;
    //     },
    //     message: "At least one item entered",
    //   },
    // },
    // date: { type: Date, default: Date.now },
    // isPublished: Boolean,
    // category: { type: String, enum: ["front", "back"] },
    // price: {
    //   type: Number,
    //   required: function () {
    //     return this.isPublished;
    //   },
    // },
  })
);

exports.Course = Course;
