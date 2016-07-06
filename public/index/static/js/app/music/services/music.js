'use strict';
/* global angular */
var app = app || angular.module('playgroundApp');

app.factory('MusicService', ['$http', MusicService]);

function MusicService($http) {
    
    const getAllInfo = function(){
        
    };
    
    const getBandInfo = function(){
        
    };
    
    const getAlbumInfo = function(){
        
    };
    
    const getTrackInfo = function(){
        
    };
    
    const getBand = function(){
        
    };
    
    const getAlbum = function(){
        
    };
    
    const getTrack = function(){
        
    };
    
    return {
        getAllInfo: getAllInfo,
        getBandInfo: getBandInfo,
        getAlbumInfo: getAlbumInfo,
        getTrackInfo: getTrackInfo,
        getBand: getBand,
        getAlbum: getAlbum,
        getTrack: getTrack
    };
}