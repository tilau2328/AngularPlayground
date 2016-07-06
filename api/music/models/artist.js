'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const BandSchema = require('./band').schema;
const TrackSchema = require('./track').schema;

const artistSchema = Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    aliases: [ String ],
    bands: [ BandSchema ],
    features: [ TrackSchema ]
});

const artistModel = Mongoose.model('Artist', artistSchema);

module.exports = {
    schema: artistSchema,
    model: artistModel
};
