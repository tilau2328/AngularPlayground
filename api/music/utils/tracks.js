const Path = require('path');
const Music = require(Path.join(__dirname, "..", "models", "music"));
const Utils = require('./utils');

const listTracks = function(artist){
    
};

const getTrack = function(){
    
};

const createTrack = function(){
    
};

const updateTrack = function(){
    
};

const deleteTrack = function(){
    
};

module.exports = {
    add: createTrack,
    read: getTrack,
    list: listTracks,
    update: updateTrack,
    remove: deleteTrack
};