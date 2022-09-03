const { courseBodyValidator } = require("../helper");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    console.log("get-all " + error);
  }
});

// router.get("/:id", (req, res) => {
//   let course;
//   Course.findById(req.params.id)
//     .then((result) => {
//       if (!result)
//         return res
//           .status(404)
//           .send("sorry looks like you asked for the wrong course");
//       else {
//         course = result;
//         res.send(course);
//       }
//     })
//     .catch((e) => console.log(e)); // courses.find((c) => c.id === parseInt(req.params.id));
// });

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).catch((e) =>
      console.log("local " + e)
    );
    if (!course) return;
    res.send(course);
  } catch (e) {
    console.log("general " + e);
  }
});

router.post("/", async (req, res) => {
  const { error } = courseBodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  let course = new Course({
    name: req.body.name,
    // author: req.body.author,
    // tags: req.body.tags,
    // date: req.body.date,
    // isPublished: req.body.ispublished,
    // category: req.body.category,
    // price: req.body.price,
  });

  course = await course.save();
  res.send(course);
});

router.put("/:id", async (req, res) => {
  const { error } = bodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  const course = await Course.findByIdAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );

  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  res.send(course);
});

module.exports = router;
