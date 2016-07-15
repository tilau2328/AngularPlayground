'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('TrackCtrl', ['$scope', '$stateParams', 'MusicService', TrackCtrl]);

function TrackCtrl($scope, $stateParams, MusicService){
    var trackId = $stateParams.id;
    
    $scope.track = {};
    $scope.loadingTracks = true;
    
    var getTrack = function(){
        MusicService
        .getTrack(trackId)
        .then(function(res){ 
            $scope.track = res.data;
            $scope.loadingTracks = false;
            getTrackAlbums();
            getTrackBands();
        }, function(err){
            $scope.error = err;
            $scope.loadingTracks = false;
        });
    };
    
    var getTrackAlbums = function(){
        MusicService
        .getTrackAlbums(trackId)
        .then(function(res){ 
            $scope.track.albums = res.data;
            $scope.loadingAlbums = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingTracks = false;
        });
    };
    
    var getTrackBands = function(){
        MusicService
        .getTrackBands(trackId)
        .then(function(res){ 
            $scope.track.bands = res.data;
            $scope.loadingBands = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingTracks = false;
        });
    };
    
    getTrack();
}