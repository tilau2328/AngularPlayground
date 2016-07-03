'use strict';

const Joi = require('joi');

const createProject = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string()
});

const updateProject = Joi.object({
    title: Joi.string().min(2).max(30),
    description: Joi.string()
});

const params = Joi.object({
    slug: Joi.string().min(2).max(30).required()
});

module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    params: params
};