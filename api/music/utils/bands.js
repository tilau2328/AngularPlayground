require('mongoose');
const Models = require('../models');

const Band = Models.Band;
const Artist = Models.Artist;
const BandMember = Models.BandMember;
const Albums = require('./albums');
const Artists = require('./artists');
const Tracks = require('./tracks');

function listBands(cb){
    return Band.find({}, cb);
}

function createBand(band, cb){
    var new_band = new Band(band);
    return new_band.save(cb);
}

function getBand(band_slug, cb){
    return Band.findOne({ slug: band_slug }, cb);
}

function getBandById(band_id, cb){
    return Band.findById(band_id, cb);
}

function updateBand(band_slug, band, cb){
    return Band.update({ slug: band_slug }, band, cb);
}

function deleteBand(band_slug, cb){
    return Band.delete({ slug: band_slug }, cb);
}

function listBandAlbums(band_slug, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            var albums = [];
            for(var i = 0; i < band.albums.length; i++){
                Albums.get(band.albums[i], function(err, album){
                    if(err) return cb(err);
                    albums.push(album);
                    if(albums.length == band.albums.length) return cb(null, albums);
                });
            }
        }
    });
}

function addAlbumToBand(band_slug, album_id, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Albums.get(album_id, function(err, album){
                if(err) return cb(err);
                else {
                    var ctr = 2;
                    band.albums.push(album._id);
                    band.save(function(err){
                        if(err) return cb(err);
                        else if(--ctr == 0) return cb(null);
                    });
                    
                    album.bands.push(band._id);
                    album.save(function(err){
                        if(err) return cb(err);
                        else if(--ctr == 0) return cb(null);
                    });
                }
            });
        }
    });
}

function removeAlbumFromBand(band_slug, album_id, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Albums.get(album_id, function(err, album){
                if(err) return cb(err);
                var index = band.albums.indexOf(album._id);
                if(index == -1) return cb(new Error("fail"));
                else {
                    band.albums.splice(index, 1);
                    index = album.bands.indexOf(band._id);
                    if(index == -1) return cb(new Error("fail"));
                    else {
                        var ctr = 2;
                        album.bands.splice(index, 1);
                        
                        band.save(function(err){
                            if(err) return cb(err);
                            else if(--ctr == 0) return cb(null);
                        });
                        
                        album.save(function(err){
                            if(err) return cb(err);
                            else if(--ctr == 0) return cb(null);
                        });
                    }
                }
            });
        }
    });
}

function listBandArtists(band_slug, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            return BandMember.find({ band: band._id }, function(err, artist_ids){
                if(err) return cb(err);
                var artists = [];
                for(var i = 0; i < artist_ids.length; i++){
                    var artist_id = artist_ids[i];
                    Artist.findById(artist_id.artist, function(err, artist){
                        if(err) return cb(err);
                        else {
                            artists.push(artist);
                            if(artists.length == artist_ids.length) return cb(null, artists);
                        }
                    });
                }
            });
        }
    });
}

function addArtistToBand(band_slug, artist_slug, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Artists.get(artist_slug, function(err, artist){
                if(err) return cb(err);
                else {
                    var new_band_artist = new BandMember({ band: band._id, artist: artist._id });
                    new_band_artist.save(cb);
                }
            });
        }
    });
}

function updateArtistBandRelationship(band_slug, artist_slug, band_artist, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Artists.getArtist(artist_slug, function(err, artist){
                if(err) return cb(err);
                else BandMember.update(band._id, artist._id, band_artist, cb);
            });
        }
    });
}

function removeArtistFromBand(band_slug, artist_slug, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Artists.getArtist(artist_slug, function(err, artist){
                if(err) return cb(err);
                else BandMember.delete(band._id, artist._id, cb);
            });
        }
    });
}

function listBandTracks(band_slug, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            var ctr = 2;
            var album_ctr = 0;
            var tracks = [];
            
            for(var i = 0; i < band.albums; i++){
                album_ctr++;
                Albums.listTracks(band.albums[i], function(err, album_tracks){
                    if(err) return cb(err);
                    tracks.push.apply(tracks, album_tracks);
                    if(--album_ctr == 0) ctr--;
                    if(ctr == 0) return cb(null, tracks);
                });
            }
            
            Tracks.listByBand(band._id, function(err, participation_tracks){
                if(err) return cb(err);
                else {
                    tracks.push.apply(tracks, participation_tracks);
                    if(--ctr == 0) return cb(null, tracks);
                }
            });
        }
    });
}

function addTrackToBand(band_slug, track_id, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Tracks.get(track_id, function(err, track){
                if(err) return cb(err);
                else {
                    var ctr = 2;
                    band.participations.push(track._id);
                    band.save(function(err){
                        if(err) return cb(err);
                        else if(--ctr == 0) return cb(null);
                    });
                    
                    track.participations.push(band._id);
                    track.save(function(err){
                        if(err) return cb(err);
                        else if(--ctr == 0) return cb(null);
                    });
                }
            });
        }
    });
}

function removeTrackFromBand(band_slug, track_id, cb){
    return getBand(band_slug, function(err, band){
        if(err) return cb(err);
        else {
            Tracks.get(track_id, function(err, track){
                if(err) return cb(err);
                var index = band.participations.indexOf(track._id);
                if(index == -1) return cb(new Error("fail"));
                else {
                    band.participations.splice(index, 1);
                    index = track.participations.indexOf(band._id);
                    if(index == -1) return cb(new Error("fail"));
                    else {
                        var ctr = 2;
                        track.participations.splice(index, 1);
                        
                        band.save(function(err){
                            if(err) return cb(err);
                            if(--ctr == 0) return cb(null);
                        });
                        
                        track.save(function(err){
                            if(err) return cb(err);
                            if(--ctr == 0) return cb(null);
                        });
                    }
                }
            });
        }
    });
}

function resetBands(cb){
    return BandMember.remove({}, function(err){
        if(err) return cb(err);
        else Band.remove({}, cb);
    });
}

module.exports = {
    list: listBands,
    create: createBand,
    get: getBand,
    getById: getBandById,
    update: updateBand,
    remove: deleteBand,
    listAlbums: listBandAlbums,
    addAlbum: addAlbumToBand,
    removeAlbum: removeAlbumFromBand,
    listArtists: listBandArtists,
    addArtist: addArtistToBand,
    updateArtist: updateArtistBandRelationship,
    removeArtist: removeArtistFromBand,
    listTracks: listBandTracks,
    addTrack: addTrackToBand,
    removeTrack: removeTrackFromBand,
    reset: resetBands
};