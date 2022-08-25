const bodyValidator = require("../helper");
const express = require("express");
const router = express.Router;

const courses = [
  { id: 1, name: "Node" },
  { id: 2, name: "HTML" },
  { id: 3, name: "CSS" },
];

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = bodyValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  // by convention we should return the new obj after adding it .. cause client need the new id
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  const { error } = bodyValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;

  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  courses.splice(courses.indexOf(course), 1);
  res.send(course);
  console.log(courses);
});

module.exports = router;
