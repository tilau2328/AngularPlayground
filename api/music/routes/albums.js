require('mongoose');
const Utils = require('../utils');

const listAlbumsHandler = function(req, res){
    Utils.albums.list(function(err, albums){
        if(err) res("Error");
        else res(albums);
    });
};

const addAlbumHandler = function(req, res){
    
};

const getAlbumHandler = function(req, res){
    var albumId = req.params.albumId;
    Utils.albums.get(albumId, function(err, album){
        if(err) res("Error");
        else res(album);
    });
};

const updateAlbumHandler = function(req, res){
    var albumId = req.params.albumId;
};

const deleteAlbumHandler = function(req, res){
    var albumId = req.params.albumId;
};

const getAlbumTracksHandler = function(req, res){
    var albumId = req.params.albumId;
    Utils.albums.listTracks(albumId, function(err, tracks){
        if(err) res("Error");
        else res(tracks);
    });
};

const addTrackToAlbumHandler = function(req, res){
    var albumId = req.params.albumId;
};

const updateTrackInAlbumHandler = function(req, res){
    var albumId = req.params.albumId;
};

const removeTrackFromAlbumHandler = function(req, res){
    var albumId = req.params.albumId;
};

const getAlbumBandsHandler = function(req, res){
    var albumId = req.params.albumId;
    Utils.albums.listBands(albumId, function(err, tracks){
        if(err) res("Error");
        else res(tracks);
    });
};

const listAlbums = {
    method: "GET",   
    path: "/music/albums",
    config: {
        handler: listAlbumsHandler
    }
};

const addAlbum = {
    method: "POST",   
    path: "/music/albums",
    config: {
        handler: addAlbumHandler
    }
};

const getAlbum = {
    method: "GET",   
    path: "/music/albums/{albumId}",
    config: {
        handler: getAlbumHandler
    }
};

const updateAlbum = {
    method: "PUT",   
    path: "/music/albums/{albumId}",
    config: {
        handler: updateAlbumHandler
    }
};

const deleteAlbum = {
    method: "DELETE",   
    path: "/music/albums/{albumId}",
    config: {
        handler: deleteAlbumHandler
    }
};

const getAlbumTracks = {
    method: "GET",   
    path: "/music/albums/{albumId}/tracks",
    config: {
        handler: getAlbumTracksHandler
    }
};

const addTrackToAlbum = {
    method: "POST",   
    path: "/music/albums/{albumId}/tracks/{trackId}",
    config: {
        handler: addTrackToAlbumHandler
    }
};

const updateTrackInAlbum = {
    method: "PUT",   
    path: "/music/albums/{albumId}/tracks/{trackId}",
    config: {
        handler: updateTrackInAlbumHandler
    }
};

const removeTrackFromAlbum = {
    method: "DELETE",   
    path: "/music/albums/{albumId}/tracks/{trackId}",
    config: {
        handler: removeTrackFromAlbumHandler
    }
};

const getAlbumBands = {
    method: "GET",   
    path: "/music/albums/{albumId}/bands",
    config: {
        handler: getAlbumBandsHandler
    }
};

module.exports = [ listAlbums, 
                   addAlbum, 
                   getAlbum, 
                   updateAlbum, 
                   deleteAlbum,
                   getAlbumTracks,
                   addTrackToAlbum,
                   updateTrackInAlbum,
                   removeTrackFromAlbum,
                   getAlbumBands ];