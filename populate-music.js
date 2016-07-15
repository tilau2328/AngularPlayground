const mongoose = require('mongoose');
const Utils = require('./api/music/utils');
const music = require('./music-mock');

mongoose.connect("0.0.0.0:27017/my-website");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connected correctly to server");
    resetDB(function(err){
        if(err) throw err;
        else{
            console.log("Database successfully reset");
            populateBands(function(err){
                if(err) throw err;
                else{
                console.log("Database successfully reset");
                    populateArtists(function(err){ 
                        if(err) throw err;
                        else{
                            populateAlbums(function(err){ 
                                if(err) throw err;
                                else{
                                    populateTracks(function(err){ 
                                        if(err) throw err;
                                        else{
                                            db.close();  
                                            console.log("Database successfully populated");
                                        } 
                                    });    
                                } 
                            });  
                        } 
                    });
                } 
            });     
        }
    });
});

function resetDB(cb){
    var ctr = 4;
    Utils.bands.reset(function(err){
        if(err) return cb(err);
        else {
            console.log("Bands successfully reset");
            if(--ctr == 0) cb(null);
        }
    });
    Utils.artists.reset(function(err){
        if(err) return cb(err);
        else {
            console.log("Artists successfully reset");
            if(--ctr == 0) cb(null);
        }
    });
    Utils.albums.reset(function(err){
        if(err) return cb(err);
        else {
            console.log("Albums successfully reset");
            if(--ctr == 0) cb(null);
        }
    });
    Utils.tracks.reset(function(err){
        if(err) return cb(err);
        else {
            console.log("Tracks successfully reset");
            if(--ctr == 0) cb(null);
        }
    });
}

function populateBands(cb){
    var ctr = 0;
    for(var i = 0; i < music.bands.length; i++){
        ctr++;
        createBand(i, function(err, new_band){
            if(err) return cb(err);
            else console.log("New Band " + new_band.name);
            if(--ctr == 0) return cb(null);
        });
    }
}

function createBand(index, cb){
    var band = music.bands[index];
    Utils.bands.create({ name: band.name }, function(err, band){
        if(err) return cb(err);
        else {
            music.bands[index].model = band;
            return cb(null, band);
        }
    });
}

function populateArtists(cb){
    var ctr = 0;
    for(var i = 0; i < music.bands.length; i++){
        var band = music.bands[i];
        for(var j = 0; j < band.artists.length; j++){
            ctr++;
            createArtist(band, j, function(err, new_artist){
                if(err) return cb(err);
                else console.log("New Artist " + new_artist.name);
                if(--ctr == 0) return cb(null);          
            });
        }
    }
}

function createArtist(band, index, cb){
    var artist = band.artists[index];
    Utils.artists.create({ name: artist.name }, function(err, artist){
        if(err) return cb(err);
        else {
            band.artists[index].model = artist;
            linkBandArtist(band.model, artist, function(err){
                if(err) return cb(err);
                else {
                    console.log("Link: " + band.name + " - " + artist.name);
                    return cb(null, artist);
                }
            });
        }
    });
}

function linkBandArtist(band, artist, cb){
    Utils.bands.addArtist(band.slug, artist.slug, cb);
}

function populateAlbums(cb){
    var ctr = 0;
    for(var i = 0; i < music.bands.length; i++){
        var band = music.bands[i];
        for(var j = 0; j < band.albums.length; j++){
            ctr++;
            createAlbum(band, j, function(err, new_album){
                if(err) return cb(err);
                else console.log("New Album " + new_album.title);
                if(--ctr == 0) return cb(null);          
            });
        }
    }
}

function createAlbum(band, index, cb){
    var album = band.albums[index];
    Utils.albums.create({ title: album.title }, function(err, new_album){
        if(err) return cb(err);
        else {
            band.albums[index].model = new_album;
            linkBandAlbum(band.model, new_album, function(err){
                if(err) return cb(err);
                else {
                    console.log("Link: " + band.name + " - " + album.title);
                    return cb(null, new_album);
                }
            });
        }
    });
}

function linkBandAlbum(band, album, cb){
    Utils.bands.addAlbum(band.slug, album._id, cb);
}

function populateTracks(cb){
    var ctr = 0;
    for(var i = 0; i < music.bands.length; i++){
        var band = music.bands[i];
        for(var j = 0; j < band.albums.length; j++){
            var album = band.albums[j];
            for(var k = 0; k < album.tracks.length; k++){
                ctr++;
                createTrack(band, album, k, function(err, new_track){
                    if(err) return cb(err);
                    else console.log("New Track " + new_track.title);
                    if(--ctr == 0) return cb(null);          
                });
            }
        }
    }
}

function createTrack(band, album, index, cb){
    var track = album.tracks[index];
    Utils.tracks.create({ title: track.title, index: track.index }, function(err, new_track){
        if(err) return cb(err);
        else {
            var ctr = 2;
            album.tracks[index].model = new_track;
            linkAlbumTrack(album.model, new_track, track.index, function(err){
                if(err) return cb(err);
                else {
                    console.log("Link: " + album.title + " - " + track.title);
                    if(--ctr == 0) return cb(null, new_track);
                }
            });
            
            linkBandTrack(band.model, new_track, function(err){
                if(err) return cb(err);
                else {
                    console.log("Link: " + band.name + " - " + track.title);
                    if(--ctr == 0) return cb(null, new_track);
                }
            });
        }
    });
}

function linkAlbumTrack(album, track, index, cb){
    Utils.albums.addTrack(album._id, track._id, index, cb);
}

function linkBandTrack(band, track, cb){
    Utils.bands.addTrack(band.slug, track._id, cb);
}