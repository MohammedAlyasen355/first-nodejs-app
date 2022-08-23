const Joi = require("joi");

module.exports = bodyValidator = (body) => {
  const scheme = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return scheme.validate(body);
};
