'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const AlbumSchema = require('./album').schema;
const ArtistSchema = require('./artist').schema;

const trackSchema = Schema({
    index: { type: Number },
    title: { type: String, required: true },
    album: AlbumSchema,
    features: [ ArtistSchema ]
});

const trackModel = Mongoose.model('Track', trackSchema);

module.exports = {
    schema: trackSchema,
    model: trackModel
};
