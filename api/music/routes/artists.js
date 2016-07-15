require('mongoose');
const Utils = require('../utils');

const listArtistsHandler = function(req, res){
    Utils.artists.list(function(err, artists){
        if(err) res("Error");
        else res(artists);
    });
};

const addArtistHandler = function(req, res){
    
};

const getArtistHandler = function(req, res){
    var artistSlug = req.params.artistSlug;
    Utils.artists.get(artistSlug, function(err, artist){
        if(err) res("Error");
        else res(artist);
    });
};

const updateArtistHandler = function(req, res){
    var artistSlug = req.params.artistSlug;
};

const deleteArtistHandler = function(req, res){
    var artistSlug = req.params.artistSlug;
};

const getArtistBandsHandler = function(req, res){
    var artistSlug = req.params.artistSlug;
    Utils.artists.listBands(artistSlug, function(err, bands){
        console.log(bands);
        if(err) res("Error");
        else res(bands);
    });
};

const listArtists = {
    method: "GET",   
    path: "/music/artists",
    config: {
        handler: listArtistsHandler
    }
};

const addArtist = {
    method: "POST",   
    path: "/music/artists",
    config: {
        handler: addArtistHandler
    }
};

const getArtist = {
    method: "GET",   
    path: "/music/artists/{artistSlug}",
    config: {
        handler: getArtistHandler
    }
};

const updateArtist = {
    method: "PUT",   
    path: "/music/artists/{artistSlug}",
    config: {
        handler: updateArtistHandler
    }
};

const deleteArtist = {
    method: "DELETE",   
    path: "/music/artists/{artistSlug}",
    config: {
        handler: deleteArtistHandler
    }
};

const getArtistBands = {
    method: "GET",   
    path: "/music/artists/{artistSlug}/bands",
    config: {
        handler: getArtistBandsHandler
    }
};

module.exports = [ listArtists, 
                   addArtist, 
                   getArtist, 
                   updateArtist, 
                   deleteArtist, 
                   getArtistBands ];