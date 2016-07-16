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
        MusicService.albums.detail.get({id: albumId}, function(album){
            $scope.album = album;
            $scope.loadingAlbum = false;
            getAlbumTracks();
            getAlbumBands();
        });
    };
    
    var getAlbumTracks = function(){
        MusicService.albums.tracks.query({id: albumId}, function(tracks){
            tracks.sort(function(a, b) {
                return a.index - b.index;
            });
            $scope.album.tracks = tracks;
            $scope.loadingTracks = false;
        });
    };
    
    var getAlbumBands = function(){
        MusicService.albums.bands.query({id: albumId}, function(bands){
            $scope.album.bands = bands;
            $scope.loadingBands = false;
        });
    };
    
    getAlbum();
}

