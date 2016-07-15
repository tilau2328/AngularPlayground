'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('TrackCtrl', ['$scope', '$stateParams', 'MusicService', TrackCtrl]);

function TrackCtrl($scope, $stateParams, MusicService){
    var trackId = $stateParams.id;
    
    $scope.track = {};
    $scope.loading = true;
    
    MusicService
    .getTrack(trackId)
    .then(function(res){ 
        $scope.track = res.data;
        $scope.loading = false;
    }, function(err){
        $scope.error = err;
        $scope.loading = false;
    });
}