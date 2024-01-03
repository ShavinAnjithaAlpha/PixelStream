const Joi = require("joi");

function validateUser(data) {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email().required(),
    firstname: Joi.string().min(3).max(255).required(),
    lastname: Joi.string().min(3).max(255).required(),
    location: Joi.string().max(255),
    bio: Joi.string().max(255),
    profile: Joi.string(),
    personalsite: Joi.string().uri().max(255),
  });

  return userSchema.validate(data);
}

function validateAuth(data) {
  const authSchema = Joi.object({
    username: Joi.string().min(3).max(255),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }).or("username", "email");

  return authSchema.validate(data);
}

module.exports = { validateUser, validateAuth };