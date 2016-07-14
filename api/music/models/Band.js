'use strict';

const Mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = Mongoose.Schema;

const bandSchema = Schema({
    name: { type: String, required: true },
    albums: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Album' }],
    participations: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});

bandSchema.plugin(URLSlugs('name', { field: 'slug' }));

bandSchema.static('update', function(slug, band, cb) {
    return this.findOneAndModify({ query: { slug: slug }, update: band }, cb);
});

bandSchema.static('delete', function(slug, cb) {
    return this.findOneAndRemove({ slug: slug }, cb);
});

const bandModel = Mongoose.model('Band', bandSchema);

module.exports = bandModel;