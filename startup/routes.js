const courses = require("../routes/courses");
const customers = require("../routes/customers");
const catagories = require("../routes/catagories");
const users = require("../routes/users");
const home = require("../routes/home");
const auth = require("../routes/auth");
const helmet = require("helmet");
const error = require("../middleware/error");
const morgan = require("morgan");

module.exports = function (app, express) {
  app.use(express.json());
  // all to navigate the static files in the specific folder
  app.use(express.static("public"));
  // add some headers to the returned response
  app.use(helmet());
  if (app.get("env") === "development") {
    // print logs on every request and it could save to logs file
    app.use(morgan("tiny"));
    console.log("Dev Mode");
  }

  app.use(error);
  app.use("/api/courses", courses);
  app.use("/api/customers", customers);
  app.use("/api/catagories", catagories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/", home);
};
