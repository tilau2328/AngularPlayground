'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const bandMemberSchema = Schema({
    artist: { type: Mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    band: { type: Mongoose.Schema.Types.ObjectId, ref: 'Band' },
    from: { type: Date },
    to: { type: Date }
});

bandMemberSchema.static('listByBand', function(band_id, cb){
    return this.find({ band: band_id }).toArray(cb);
});

bandMemberSchema.static('listByArtist', function(artist_id, cb){
    return this.find({ artist: artist_id }).toArray(cb);
});

bandMemberSchema.static('update', function(band_id, artist_id, band_member, cb) {
    return this.findOneAndModify({ query: { band: band_id, artist: artist_id }, update: band_member }, cb);
});

bandMemberSchema.static('delete', function(band_id, artist_id, cb) {
    return this.findOneAndRemove({ band: band_id, artist: artist_id }, cb);
});

const bandMemberModel = Mongoose.model('BandMember', bandMemberSchema);

module.exports = bandMemberModel;