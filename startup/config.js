module.exports = function () {
  if (!config.get("jwt-private-key")) {
    throw new Error("FATAL ERROR: jwt-private-key is not defined");
    // 0 main exit success anything else meaning there is an error
    // process.exit(1);
  }
};
