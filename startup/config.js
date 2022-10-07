module.exports = function () {
  try {
    // working using SET "password":"app_password" SET app_password=123
    // inside custom-environment-variables file
    console.log(config.get("mail.password"));
  } catch (error) {
    console.log(error);
  }

  if (!config.get("jwt-private-key")) {
    throw new Error("FATAL ERROR: jwt-private-key is not defined");
    // 0 main exit success anything else meaning there is an error
    // process.exit(1);
  }
};
