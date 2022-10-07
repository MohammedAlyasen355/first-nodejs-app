const mongoose = require("mongoose");
require("express-async-errors");
const config = require("config");
const taxDebug = require("debug")("app:tax");
const dbDebug = require("debug")("app:db");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const authMW = require("./middleware/auth");
const error = require("./middleware/error");
const winston = require("winston");
require("winston-mongodb");
const app = express();
const port = process.env.PORT || 3000;
require("./startup/routes")(app);

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/playground" })
);

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("success connecting"))
  .catch((err) => winston.error(err.message, err));

app.use(express.json());
// all to navigate the static files in the specific folder
app.use(express.static("public"));
// Custom MW
// app.use(authMW); // it's wrong to implement it here we don't want to auth all routes
// add some headers to the returned response
app.use(helmet());
app.use(error);

app.set("view engine", "pug");
app.set("views", "./views");

if (app.get("env") === "development") {
  // print logs on every request and it could save to logs file
  app.use(morgan("tiny"));
  console.log("Dev Mode");
}

// if (!config.get("jwt-private-key")) {
//   console.error("FATAL ERROR: jwt-private-key is not defined");
//   // 0 main exit success anything else meaning there is an error
//   process.exit(1);
// }

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

// example: http://localhost:3000/api/posts/2018/1?queryParam=10
app.get("/api/posts/:year/:month", (req, res) => {
  // notice that the query didn't define it param name
  // TODO: is there a syntax to reserve the the query param name
  res.send([req.params, req.query]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
