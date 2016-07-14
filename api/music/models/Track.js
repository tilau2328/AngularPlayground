'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const trackSchema = Schema({
    title: { type: String, required: true },
    participations: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Band' }]
});

trackSchema.static('listByBand', function(band, cb){
    return this.find({ participations: band }, cb);
});

trackSchema.static('update', function(track_id, track, cb){
    return this.findByIdAndModify({ query: { _id: track_id }, update: track }, cb);
});

trackSchema.static('delete', function(track_id, cb){
    return this.findByIdAndRemove({ _id: track_id }, cb);
});

const trackModel = Mongoose.model('Track', trackSchema);

module.exports = trackModel;