'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const projectSchema = Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    description: { type: String, default: "" }
});

const projectModel = Mongoose.model('Project', projectSchema);

module.exports = projectModel;
