'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('AlbumCtrl', ['$scope', '$stateParams', 'MusicService', AlbumCtrl]);

function AlbumCtrl($scope, $stateParams, MusicService){
    var albumId = $stateParams.id;
    
    $scope.album = {};
    $scope.loading = true;
    
    var getAlbum = function (){
        MusicService
        .getAlbum(albumId)
        .then(function(res){ 
            $scope.album = res.data; 
            getAlbumTracks();
        }, function(err){
            $scope.error = err;
            $scope.loading = false;
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
            $scope.loading = false;
        }, function(err){
            $scope.error = err;
            $scope.loading = false;
        });
    };
    
    getAlbum();
}

