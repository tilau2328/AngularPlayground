'use strict';

const Joi = require('joi');

const login = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required()
  }),
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
);

const register = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const update = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
  admin: Joi.boolean()
});

const params = Joi.object({
    username: Joi.string().alphanum().min(2).max(30)
});

module.exports = {
    login: login,
    register: register,
    update: update,
    params: params
};