'use strict';
/* global angular */
var app = app || angular.module('playgroundApp');

app.factory('MusicService', ['$http', MusicService]);

function MusicService($http) {
    
    const getArtists = function(){
        return $http.get('/music/artists');
    };
    
    const getBands = function(){
        return $http.get('/music/bands');
    };
    
    const getAlbums = function(){
        return $http.get('/music/albums');
    };
    
    const getTracks = function(){
        return $http.get('/music/tracks');
    };
    
    const getArtist = function(artistSlug){
        return $http.get('/music/artists/' + artistSlug);
    };
    
    const getBand = function(bandSlug){
        return $http.get('/music/bands/' + bandSlug);
    };
    
    const getAlbum = function(albumId){
        return $http.get('/music/albums/' + albumId);
    };
    
    const getTrack = function(trackId){
        return $http.get('/music/tracks/' + trackId);
    };
    
    return {
        getArtists: getArtists,
        getBands: getBands,
        getAlbums: getAlbums,
        getTracks: getTracks,
        getArtist: getArtist,
        getBand: getBand,
        getAlbum: getAlbum,
        getTrack: getTrack
    };
}