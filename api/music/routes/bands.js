require('mongoose');
const Utils = require('../utils');

const listBandsHandler = function(req, res){
    Utils.bands.list(function(err, bands){
        if(err) res("Error");
        else res(bands);
    });
};

const addBandHandler = function(req, res){
    
};

const getBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
    Utils.bands.get(bandSlug, function(err, band){
        if(err) res("Error");
        else res(band);
    });
};

const updateBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const deleteBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const getBandArtistsHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const addArtistToBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const updateArtistInBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const removeArtistFromBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const getBandAlbumsHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const addAlbumToBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const removeAlbumFromBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const getBandTracksHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const addTrackToBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};

const removeTrackFromBandHandler = function(req, res){
    var bandSlug = req.params.bandSlug;
};


const listBands = {
    method: "GET",   
    path: "/music/bands",
    config: {
        handler: listBandsHandler
    }
};

const addBand = {
    method: "POST",   
    path: "/music/bands",
    config: {
        handler: addBandHandler
    }
};

const getBand = {
    method: "GET",   
    path: "/music/bands/{bandSlug}",
    config: {
        handler: getBandHandler
    }
};

const updateBand = {
    method: "PUT",   
    path: "/music/bands/{bandSlug}",
    config: {
        handler: updateBandHandler
    }
};

const deleteBand = {
    method: "DELETE",   
    path: "/music/bands/{bandSlug}",
    config: {
        handler: deleteBandHandler
    }
};

const getBandArtists = {
    method: "GET",   
    path: "/music/bands/{bandSlug}/artists",
    config: {
        handler: getBandArtistsHandler
    }
};

const addArtistToBand = {
    method: "POST",   
    path: "/music/bands/{bandSlug}/artists/{artistSlug}",
    config: {
        handler: addArtistToBandHandler
    }
};

const updateArtistInBand = {
    method: "PUT",   
    path: "/music/bands/{bandSlug}/artists/{artistSlug}",
    config: {
        handler: updateArtistInBandHandler
    }
};

const removeArtistFromBand = {
    method: "DELETE",   
    path: "/music/bands/{bandSlug}/artists/{artistSlug}",
    config: {
        handler: removeArtistFromBandHandler
    }
};

const getBandAlbums = {
    method: "GET",   
    path: "/music/bands/{bandSlug}/albums",
    config: {
        handler: getBandAlbumsHandler
    }
};

const addAlbumToBand = {
    method: "POST",   
    path: "/music/bands/{bandSlug}/albums/{albumId}",
    config: {
        handler: addAlbumToBandHandler
    }
};

const removeAlbumFromBand = {
    method: "DELETE",   
    path: "/music/bands/{bandSlug}/albums/{albumId}",
    config: {
        handler: removeAlbumFromBandHandler
    }
};

const getBandTracks = {
    method: "GET",   
    path: "/music/bands/{bandSlug}/tracks",
    config: {
        handler: getBandTracksHandler
    }
};

const addTrackToBand = {
    method: "POST",   
    path: "/music/bands/{bandSlug}/tracks/{trackId}",
    config: {
        handler: addTrackToBandHandler
    }
};

const removeTrackFromBand = {
    method: "DELETE",   
    path: "/music/bands/{bandSlug}/tracks/{trackId}",
    config: {
        handler: removeTrackFromBandHandler
    }
};

module.exports = [ listBands, 
                   addBand, 
                   getBand, 
                   updateBand, 
                   deleteBand, 
                   getBandArtists,
                   addArtistToBand,
                   updateArtistInBand,
                   removeArtistFromBand,
                   getBandAlbums,
                   addAlbumToBand,
                   removeAlbumFromBand,
                   getBandTracks,
                   addTrackToBand,
                   removeTrackFromBand
                ];