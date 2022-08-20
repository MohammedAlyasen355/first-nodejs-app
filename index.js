const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const Logger = require("./logger");
const logger = new Logger();
// reserve in the party .. of course before the party starting
logger.on("loggedMessage", (arg) => {
  console.log("Hi .. I'n listening you", arg);
});
logger.log("log"); // announce the party

app.get("/", (req, res) => {
  res.send([1, "MODE"]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
