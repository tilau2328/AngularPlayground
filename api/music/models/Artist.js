'use strict';

const Mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = Mongoose.Schema;

const artistSchema = Schema({
    name: { type: String, required: true, unique: true }
});

artistSchema.plugin(URLSlugs('name', { field: 'slug' }));

artistSchema.static('update', function(slug, band, cb) {
    return this.findOneAndModify({ query: { slug: slug }, update: band }, cb);
});

artistSchema.static('delete', function(slug, cb) {
    return this.findOneAndRemove({ slug: slug }, cb);
});
const artistModel = Mongoose.model('Artist', artistSchema);

module.exports = artistModel;