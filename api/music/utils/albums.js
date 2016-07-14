require('mongoose');
const Models = require('../models');

const Album = Models.Album;
const TrackList = Models.TrackList;
const Tracks = require('./tracks');

function listAlbums(cb){
    return Album.find({}, cb);
}

function createAlbum(album, cb){
    var new_album = new Album(album);
    new_album.save(cb);
}

function getAlbum(album_id, cb){
    return Album.findById(album_id, cb);
}

function updateAlbum(album_id, album, cb){
    return Album.update(album_id, album, cb);
}

function removeAlbum(album_id, cb){
    return Album.delete(album_id, cb);
}

function listAlbumTracks(album_id, cb){
    return TrackList.listByAlbum(album_id, function(err, track_ids){
        if(err) return cb(err);
        var tracks = [];
        for(var i = 0; i < track_ids; i++){
            var track_id = track_ids[i];
            Tracks.getWithIndex(track_id._id, track_id.index, function(err, track){
                if(err) return cb(err);
                tracks.push(track);
                if(tracks.length == track_ids.length) return cb(null, tracks);
            });
        }
    });
}

function getAlbumTrack(album_id, index, cb){
    return TrackList.getByIndex(album_id, index, function(err, track_id){
        if(err) return cb(err);
        else return Tracks.getWithIndex(track_id._id, track_id.index, cb);
    });
}

function addTrackToAlbum(album_id, track_id, index, cb){
    return getAlbum(album_id, function(err, album){
        if(err) return cb(err);
        else{
            Tracks.getWithIndex(track_id, index, function(err, track){
                if(err) return cb(err);
                else {
                    var new_album_track = new TrackList({ album: album._id, track: track._id, index: index });
                    
                    return new_album_track.save(function(err){
                        if(err) return cb(err);
                        else {
                            console.log("Linkin'");
                            return cb(null);
                        }
                    });
                }
            });
        } 
    });
}

function updateAlbumTrack(album_id, track_id, trackAlbumLink, cb){
    return TrackList.update(album_id, track_id, trackAlbumLink, cb);
}

function removeTrackFromAlbum(album_id, track_id, cb){
    return TrackList.delete(album_id, track_id, cb);
}

function resetAlbums(cb){
    return TrackList.remove({}, function(err){
        if(err) return cb(err);
        else Album.remove({}, cb);
    });
}

module.exports = {
    list: listAlbums,
    create: createAlbum,
    get: getAlbum,
    update: updateAlbum,
    remove: removeAlbum,
    listTracks: listAlbumTracks,
    getTrack: getAlbumTrack,
    updateTrack: updateAlbumTrack,
    addTrack: addTrackToAlbum,
    removeTrack: removeTrackFromAlbum,
    reset: resetAlbums
};