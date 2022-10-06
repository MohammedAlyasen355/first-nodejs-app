const courses = require("./routes/courses");
const customers = require("./routes/customers");
const catagories = require("./routes/catagories");
const users = require("./routes/users");
const home = require("./routes/home");
const auth = require("./routes/auth");

module.exports = function () {
  app.use("/api/courses", courses);
  app.use("/api/customers", customers);
  app.use("/api/catagories", catagories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/", home);
};
