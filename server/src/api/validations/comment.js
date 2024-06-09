const Joi = require("joi");

function validateComment(comment) {
  const schema = Joi.object({
    comment: Joi.string().required(),
  });

  return schema.validate(comment);
}

module.exports = { validateComment };
