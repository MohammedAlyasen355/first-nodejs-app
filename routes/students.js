const express = require("express");
const router = express.Router();
const { studentBodyValidator } = require("../helper");
const { Student } = require("../models/student");


router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    console.log("get-all " + error);
  }
});

router.post("/", async (req, res) => {
  const { error } = studentBodyValidator(req.body);
  if (error) {
    const errorList = [];
    for (f in error.details) {
      errorList?.push(error.details[f].message);
    }
    return res.status(400).send(errorList);
  }

  let student = new Student({
    name: req.body.name,
    lastname: req.body.lastname
  });

  student = await student.save();
  res.send(student);
});

module.exports = router;
