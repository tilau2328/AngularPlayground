require('mongoose');
const Models = require('../models');

const Track = Models.Track;

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
    reset: resetTracks
};