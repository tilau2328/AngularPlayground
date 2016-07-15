require('mongoose');
const Models = require('../models');

const Track = Models.Track;
const Band = Models.Band;
const Album = Models.Album;
const TrackList = Models.TrackList;

function listTracks(cb){
    return Track.find({}, cb);
}

function createTrack(track, cb){
    var new_track = new Track(track);
    return new_track.save(cb);
}
    
function getTrack(track_id, cb){
    return Track.findById(track_id, cb);
}

function updateTrack(track_id, track, cb){
    return Track.update(track_id, track, cb);
}

function deleteTrack(track_id, cb){
    return Track.delete(track_id, cb);
}

function getTrackWithIndex(track_id, index, cb){
    return getTrack(track_id, function(err, track){
        if(err) return cb(err);
        else {
            track.index = track_id.index;
            return cb(null, track);
        }
    });
}

function listTrackBands(track_id, cb){
    return Band.find({ participations: track_id }, cb);
}

function listTrackAlbums(track_id, cb){
    return TrackList.find({ track: track_id }, function(err, album_ids){
        if(err) return cb(err);
        var albums = [];
        for(var i = 0; i < album_ids.length; i++){
            var album_id = album_ids[i];
            Album.findById(album_id.album, function(err, album){
                if(err) return cb(err);
                albums.push(album);
                if(albums.length == album_ids.length) return cb(null, albums);
            });
        }
    });
}

function resetTracks(cb){
    return Track.remove({}, cb);
}

module.exports = {
    list: listTracks,
    create: createTrack,
    get: getTrack,
    update: updateTrack,
    remove: deleteTrack,
    getWithIndex: getTrackWithIndex,
    listBands: listTrackBands,
    listAlbums: listTrackAlbums,
    reset: resetTracks
};