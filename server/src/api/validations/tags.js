const Joi = require("joi");

function validateTagBody(data) {
  const TagSchema = Joi.object({
    tags: Joi.array().items(Joi.string().min(3).max(255)).required(),
  });

  return TagSchema.validate(data);
}

module.exports = {
  validateTagBody,
};
