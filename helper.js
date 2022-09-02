const Joi = require("joi");

module.exports = bodyValidator = (body) => {
  const scheme = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    // author: Joi.string(),
    // tags: Joi.array(),
    // date: Joi.date(),
    // isPublished: Joi.boolean(),
    // category: Joi.array(),
    // price: Joi.number().required(),
  });
  return scheme.validate(body);
};
