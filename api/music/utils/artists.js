require('mongoose');
const Models = require('../models');

const Artist = Models.Artist;
const Band = Models.Band;
const BandMember = Models.BandMember;

function listArtists(cb){
    return Artist.find({}, cb);
}

function createArtist(artist, cb){
    var new_artist = new Artist(artist);
    return new_artist.save(cb);
}

function getArtist(artist_slug, cb){
    return Artist.findOne({ slug: artist_slug }, cb);
}

function getArtistById(artist_id, cb){
    return Artist.findById(artist_id, cb);
}

function updateArtist(artist_slug, artist, cb){
    return Artist.update({ slug: artist_slug }, artist, cb);
}

function deleteArtist(artist_slug, cb){
    return Artist.delete({ slug: artist_slug }, cb);
}

function listArtistBands(artist_slug, cb){
    return getArtist(artist_slug, function(err, artist){
        if(err) return cb(err);
        return BandMember.find({ artist: artist._id }, function(err, band_ids){
            if(err) return cb(err);
            var bands = [];
            for(var i = 0; i < band_ids.length; i++){
                var band_id = band_ids[i];
                return Band.findById(band_id.band, function(err, band){
                    if(err) return cb(err);
                    bands.push(band);
                    if(bands.length == band_ids.length) return cb(null, bands);
                });
            }
        });
    });
}

function addBandToArtist(artist_slug, band_slug, cb){
    
}

function removeBandFromArtist(artist_slug, band_slug, cb){
    
}

function resetArtists(cb){
    return Artist.remove({}, cb);
}

module.exports = {
    list: listArtists,
    create: createArtist,
    get: getArtist,
    getById: getArtistById,
    update: updateArtist,
    remove: deleteArtist,
    listBands: listArtistBands,
    addBand: addBandToArtist,
    removeBand: removeBandFromArtist,
    reset: resetArtists
};