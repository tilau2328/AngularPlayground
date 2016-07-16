'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('TrackCtrl', ['$scope', '$stateParams', 'MusicService', TrackCtrl]);

function TrackCtrl($scope, $stateParams, MusicService){
    var trackId = $stateParams.id;
    
    $scope.track = {};
    $scope.loadingTrack = true;
    $scope.loadingBands = true;
    $scope.loadingAlbums = true;
    
    var getTrack = function(){
        MusicService.tracks.detail.get({id: trackId}, function(track){
            $scope.track = track;
            $scope.loadingTrack = false;
            getTrackAlbums();
            getTrackBands();
        });
    };
    
    var getTrackAlbums = function(){
        MusicService.tracks.albums.query({id: trackId}, function(albums){
            $scope.track.albums = albums;
            $scope.loadingAlbums = false;
        });
    };
    
    var getTrackBands = function(){
        MusicService.tracks.bands.query({id: trackId}, function(bands){
            $scope.track.bands = bands;
            $scope.loadingBands = false;
        });
    };
   
    getTrack();
}