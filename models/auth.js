const Joi = require("joi");

authBodyValidator = (body) => {
  const scheme = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return scheme.validate(body);
};

// exports.User = User;
exports.authBodyValidator = authBodyValidator;
// exports.userSchema = userSchema; no need to export it
