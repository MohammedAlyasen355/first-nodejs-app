require("express-async-errors");
require("winston-mongodb");
const taxDebug = require("debug")("app:tax");
const dbDebug = require("debug")("app:db");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./startup/routes")(app, express);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config")();

app.set("view engine", "pug");
app.set("views", "./views");

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
// app.get("/api/posts/:year/:month", (req, res) => {
//   // notice that the query didn't define it param name
//   // TODO: is there a syntax to reserve the the query param name
//   res.send([req.params, req.query]);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
