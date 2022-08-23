const express = require("express");
const Joi = require("joi");
const { reset } = require("nodemon");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

/* 
const Logger = require("./logger");
const logger = new Logger();
// reserve in the party .. of course before the party starting
logger.on("loggedMessage", (arg) => {
  console.log("Hi .. I'n listening you", arg);
});
logger.log("log"); // announce the party

*/

const courses = [
  { id: 1, name: "Node" },
  { id: 2, name: "HTML" },
  { id: 3, name: "CSS" },
];

app.get("/", (req, res) => {
  res.send(courses);
});

// example: http://localhost:3000/api/posts/2018/1?queryParam=10
app.get("/api/posts/:year/:month", (req, res) => {
  // notice that the query didn't define it param name
  // TODO: is there a syntax to reserve the the query param name
  res.send([req.params, req.query]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("sorry looks like you asked for the wrong course");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const scheme = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error } = scheme.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  // by convention we should return the new obj after adding it .. cause client need the new id
  res.send(course);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
