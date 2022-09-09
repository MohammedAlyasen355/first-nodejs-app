const Joi = require("joi");

courseBodyValidator = (body) => {
  const scheme = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    categoryid: Joi.string().min(5).max(255).required(),
  });
  return scheme.validate(body);
};

customerBodyValidator = (body) => {
  const scheme = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(5).max(255).required(),
    isGold: Joi.boolean(),
  });
  return scheme.validate(body);
};

categoryBodyValidator = (body) => {
  const scheme = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return scheme.validate(body);
};

exports.courseBodyValidator = courseBodyValidator;
exports.customerBodyValidator = customerBodyValidator;
exports.categoryBodyValidator = categoryBodyValidator;
