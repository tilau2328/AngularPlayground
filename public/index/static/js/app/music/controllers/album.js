'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('AlbumCtrl', ['$scope', '$stateParams', 'MusicService', AlbumCtrl]);

function AlbumCtrl($scope, $stateParams, MusicService){
    var albumId = $stateParams.id;
    
    $scope.album = {};
    $scope.loadingAlbum = true;
    $scope.loadingTracks = true;
    $scope.loadingBands = true;
    
    var getAlbum = function (){
        MusicService
        .getAlbum(albumId)
        .then(function(res){ 
            $scope.album = res.data;
            $scope.loadingAlbum = false;
            getAlbumTracks();
            getAlbumBands();
        }, function(err){
            $scope.error = err;
            $scope.loadingAlbum = false;
        });
    };
    
    var getAlbumTracks = function(){
        MusicService
        .getAlbumTracks(albumId)
        .then(function(res){ 
            var tracks = res.data;
            tracks.sort(function(a, b) {
                return a.index - b.index;
            });
            $scope.album.tracks = tracks;
            $scope.loadingTracks = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingTracks = false;
        });
    };
    
    var getAlbumBands = function(){
        MusicService
        .getAlbumBands(albumId)
        .then(function(res){
            $scope.album.bands = res.data;
            $scope.loadingBands = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingBands = false;
        });
    };
    
    getAlbum();
}

