const Joi = require("joi");

const register = Joi.object({
    username: Joi.string().required(),
    phoneNumber: Joi.string().min(11).max(11).required(),
    password: Joi.string().min(8).max(25).required(),
    email: Joi.string().required(),

  });
  const login = Joi.object({
    password: Joi.string().min(8).max(25).required(),
    email: Joi.string().required(),

  });

  module.exports = {
    register,
    login
  };
  