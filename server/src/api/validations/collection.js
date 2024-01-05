const Joi = require("joi");

function validateCollection(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(255).optional(),
    coverPhoto: Joi.number().optional(),
    photos: Joi.array().items(Joi.number()).optional(),
  });

  return schema.validate(data);
}

function validateCollectionUpdate(data) {
  const schema = Joi.object({
    photoIds: Joi.array().items(Joi.number()),
  });

  return schema.validate(data);
}

module.exports = {
  validateCollection,
  validateCollectionUpdate,
};
