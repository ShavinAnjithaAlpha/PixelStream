const Joi = require("joi");

function validateUser(data) {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9.,-/+*@_]{3,30}$")),
    email: Joi.string().email().required(),
    firstname: Joi.string().min(3).max(255).required(),
    lastname: Joi.string().min(3).max(255).required(),
    location: Joi.string().max(255).optional(),
    bio: Joi.string().max(512).optional(),
    profile: Joi.string().optional(),
    personalsite: Joi.string().uri().max(255).optional(),
  });

  return userSchema.validate(data);
}

function validateUserProfile(data) {
  const profileSchema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    location: Joi.string().max(255).optional(),
    bio: Joi.string().max(512).optional(),
    profile: Joi.string().optional(),
    personalsite: Joi.string().uri().max(255).optional(),
  });

  return profileSchema.validate(data, { allowUnknown: true });
}

function validateAuth(data) {
  const authSchema = Joi.object({
    username: Joi.string().min(3).max(255),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9.,-/+*@_]{3,30}$"))
      .required(),
  }).or("username", "email");

  return authSchema.validate(data);
}

function validatePasswordBody(data) {
  const passwordSchema = Joi.object({
    oldPassword: Joi.string().pattern(
      new RegExp("^[a-zA-Z0-9.,-/+*@_]{3,30}$")
    ),
    newPassword: Joi.string().pattern(
      new RegExp("^[a-zA-Z0-9.,-/+*@_]{3,30}$")
    ),
  });

  return passwordSchema.validate(data);
}

module.exports = {
  validateUser,
  validateAuth,
  validateUserProfile,
  validatePasswordBody,
};
