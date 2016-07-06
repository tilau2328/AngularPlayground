const Path = require('path');
const Music = require(Path.join(__dirname, "..", "models", "music"));
const Utils = require('./utils');

const listBands = function(){
    return Music.band.find({});
};

const getBand = function( band ){
    const band = Music.band.findOne({ slug: band });
    return band || {};
};

const listBandAlbums = function(band){
    const band = Music.band.findOne({ slug: band });
    return band.albums;
};

//TODO: implementar intervalos de tempo 
const listBandArtists = function(band){
    const band = Music.band.findOne({ slug: band });
    return band.artists;
};

const createBand = function( name ){
    return Music.band.insertOne({ name: name, slug: Utils.slugify(name) });
};

const updateBand = function( band ){
    return Music.band.updateOne();
};

const deleteBand = function( band ){
    return Music.band.removeOne({ slug: band });
};

module.exports = {
    add: createBand,
    read: getBand,
    list: listBands,
    albums: listBandAlbums,
    artists: listBandArtists,
    update: updateBand,
    remove: deleteBand
};