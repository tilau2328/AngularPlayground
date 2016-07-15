require('mongoose');
const Utils = require('../utils');

const listTracksHandler = function(req, res){
    Utils.tracks.list(function(err, tracks){
        if(err) res("Error");
        else res(tracks);
    });
};

const addTrackHandler = function(req, res){
    
};

const getTrackHandler = function(req, res){
    var trackId = req.params.trackId;
    Utils.tracks.get(trackId, function(err, track){
        if(err) res("Error");
        else res(track);
    });
};

const updateTrackHandler = function(req, res){
    var trackId = req.params.trackId;
    
    Utils.tracks.remove(trackId, function(err){
        if(err) res("Error");
        else res("Success");
    });
};

const deleteTrackHandler = function(req, res){
    var trackId = req.params.trackId;
    Utils.tracks.remove(trackId, function(err){
        if(err) res("Error");
        else res("Success");
    });
};

const listTrackAlbumsHandler = function(req, res){
    var trackId = req.params.trackId;
    Utils.tracks.listAlbums(trackId, function(err, albums){
        if(err) res("Error");
        else res(albums);
    });
};

const listTrackBandsHandler = function(req, res){
    var trackId = req.params.trackId;
    Utils.tracks.listBands(trackId, function(err, bands){
        if(err) res("Error");
        else res(bands);
    });
};

const listTracks = {
    method: "GET",   
    path: "/music/tracks",
    config: {
        handler: listTracksHandler
    }
};

const addTrack = {
    method: "POST",   
    path: "/music/tracks",
    config: {
        handler: addTrackHandler
    }
};

const getTrack = {
    method: "GET",   
    path: "/music/tracks/{trackId}",
    config: {
        handler: getTrackHandler
    }
};

const updateTrack = {
    method: "PUT",   
    path: "/music/tracks/{trackId}",
    config: {
        handler: updateTrackHandler
    }
};

const deleteTrack = {
    method: "DELETE",   
    path: "/music/tracks/{trackId}",
    config: {
        handler: deleteTrackHandler
    }
};

const listTrackAlbums = {
    method: "GET",   
    path: "/music/tracks/{trackId}/albums",
    config: {
        handler: listTrackAlbumsHandler
    }
};

const listTrackBands = {
    method: "GET",   
    path: "/music/tracks/{trackId}/bands",
    config: {
        handler: listTrackBandsHandler
    }
};

module.exports = [ listTracks, 
                   addTrack, 
                   getTrack,
                   updateTrack, 
                   deleteTrack,
                   listTrackAlbums,
                   listTrackBands ];