const Joi = require("joi");

function validatePhoto(data) {
  const photoSchema = Joi.object({
    url: Joi.string().required(),
    title: Joi.string().min(10).max(255).required(),
    description: Joi.string().min(10).max(512),
    location: Joi.string().min(3).max(255),
    tags: Joi.array().items(Joi.string().min(3).max(255)).optional(),
  });

  return photoSchema.validate(data);
}

module.exports = {
  validatePhoto,
};
