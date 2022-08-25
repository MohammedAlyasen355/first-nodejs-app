const config = require("config");
const taxDebug = require("debug")("app:tax");
const dbDebug = require("debug")("app:db");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const auth = require("./authentication");
const app = express();
const port = process.env.PORT || 3000;
const bodyValidator = require("./helper");

app.use(express.json());
// all to navigate the static files in the specific folder
app.use(express.static("public"));
// Custom MW
app.use(auth);
// add some headers to the returned response
app.use(helmet());

if (app.get("env") === "development") {
  // print logs on every request and it could save to logs file
  app.use(morgan("tiny"));
  console.log("Dev Mode");
}

try {
  // working using SET "password":"app_password" SET app_password=123
  // inside custom-environment-variables file
  console.log(config.get("mail.password"));
} catch (error) {
  console.log(error);
}

// working using SET DEBUG=app:tax
taxDebug("Some Tax debugging >>>>");
// working using SET DEBUG=app:db
dbDebug("Some DB debugging >>>>");

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
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = bodyValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  // by convention we should return the new obj after adding it .. cause client need the new id
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
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

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("sorry looks like you asked for the wrong course");

  courses.splice(courses.indexOf(course), 1);
  res.send(course);
  console.log(courses);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
