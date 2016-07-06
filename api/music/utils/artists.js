const Path = require('path');
const Music = require(Path.join(__dirname, "..", "models", "music"));
const Utils = require('./utils');

const listArtists = function(){
    return Music.artist.find({});
};

const getArtist = function(slug){
    return Music.artist.find({ slug: slug });
};

const createArtist = function(name){
    return Music.artist.insertOne({ name: name, slug: Utils.slugify(name) });
};

const updateArtist = function(slug){
    return Music.artist.updateOne({ slug: slug });
};

const deleteArtist = function(slug){
    return Music.artist.removeOne({ slug: slug });
};

module.exports = {
    add: createArtist,
    read: getArtist,
    list: listArtists,
    update: updateArtist,
    remove: deleteArtist
};