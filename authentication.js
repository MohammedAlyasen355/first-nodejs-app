const auth = (req, res, next) => {
  console.log("Auth....ing");
  next();
};

module.exports = auth;
