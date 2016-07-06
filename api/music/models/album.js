'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const albumSchema = Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    tracks: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    bands: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Band'
    }]
});

const albumModel = Mongoose.model('Album', albumSchema);

module.exports = {
    schema: albumSchema,
    model: albumModel
};
