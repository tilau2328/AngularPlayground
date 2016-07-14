'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const albumSchema = Schema({
    title: { type: String, required: true },
    bands: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Band' }]
});

albumSchema.static('update', function(album_id, album, cb){
    return this.findByIdAndModify({ query: { _id: album_id }, update: album }, cb);
});

albumSchema.static('delete', function(album_id, cb){
    return this.findByIdAndRemove({ _id: album_id }, cb);
});

const albumModel = Mongoose.model('Album', albumSchema);

module.exports = albumModel;