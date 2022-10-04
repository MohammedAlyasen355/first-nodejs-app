const { courseBodyValidator } = require("../helper");
const express = require("express");
const router = express.Router();
const { Course } = require("../models/course");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
  })
);

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

  // we expect to get category id no the category obj from front
  const category = await Category.findById(req.body.categoryid);
  if (!category) return res.status(400).send("category is not right");

  console.log(category);

  let course = new Course({
    name: req.body.name,
    category: { _id: category._id, name: category.name },
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
    { name: req.body.name, category: req.body.category },
    { new: true }
  );

  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  res.send(course);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  res.send(course);
});

module.exports = router;
