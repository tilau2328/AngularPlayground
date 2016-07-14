'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const trackListSchema = Schema({
    album: { type: Mongoose.Schema.Types.ObjectId, ref: 'Album' },
    track: { type: Mongoose.Schema.Types.ObjectId, ref: 'Track' },
    index: { type: Number, min: 1 }
});

trackListSchema.index({ album: 1, index: 1}, { unique: true });
trackListSchema.index({ album: 1, track: 1}, { unique: true });

// TODO: implementar stream
trackListSchema.static('listByAlbum', function(album_id, cb){
    return this.find({ album: album_id }).toArray(cb);
});

trackListSchema.static('getByIndex', function(album_id, index, cb){
    return this.findOne({ album: album_id, index: index }, cb);
});

trackListSchema.static('listByTrack', function(track_id, cb){
    return this.find({ track: track_id }).toArray(cb);
});

trackListSchema.static('update', function(album_id, track_id, albumTrackLink, cb){
    return this.findOneAndModify({ query: { album: album_id, track: track_id }, update: albumTrackLink }, cb); 
});

trackListSchema.static('delete', function(album_id, track_id, cb){
    return this.findOneAndRemove({ album: album_id, track: track_id }, cb);
});

const trackListModel = Mongoose.model('TrackList', trackListSchema);

module.exports = trackListModel;