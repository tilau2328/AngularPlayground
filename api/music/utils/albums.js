const Path = require('path');
const Music = require(Path.join(__dirname, "..", "models", "music"));
const Utils = require('./utils');

const listAlbums = function(band){
    const Band = Music.band
};

const getAlbum = function(band, title){
    
};

const createAlbum = function(band, title){
    
};

const updateAlbum = function(band, title){
    
};

const deleteAlbum = function(band, title){
    
};

module.exports = {
    add: createAlbum,
    read: getAlbum,
    list: listAlbums,
    update: updateAlbum,
    remove: deleteAlbum
};