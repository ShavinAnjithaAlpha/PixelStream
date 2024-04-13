const Joi = require("joi");

function validatePhoto(data) {
  const photoSchema = Joi.object({
    // url: Joi.string().required(), // deprecated
    title: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(10).max(512),
    location: Joi.string().min(3).max(255),
    tags: Joi.string().optional(),
  });

  return photoSchema.validate(data);
}
function validateUserLikePhoto(data) {
  const schema = Joi.object({
    photoIds: Joi.array().items(Joi.number()).optional(),
  });

  return schema.validate(data);
}

module.exports = {
  validatePhoto,
  validateUserLikePhoto,
};
