'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const AlbumSchema = require('./album').schema;
const ArtistSchema = require('./artist').schema;

const bandSchema = Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    albums: [ AlbumSchema ],
    artists: [ ArtistSchema ]
});

const bandModel = Mongoose.model('Band', bandSchema);

module.exports = {
    schema: bandSchema,
    model: bandModel
};
