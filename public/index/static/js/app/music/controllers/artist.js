'use strict';
/* global angular */

var app = app || angular.module('playgroundApp', []);

app.controller('ArtistCtrl', ['$scope', '$stateParams', 'MusicService', ArtistCtrl]);

function ArtistCtrl($scope, $stateParams, MusicService){
    var artistSlug = $stateParams.slug;
    
    $scope.artist = {};
    $scope.loadingArtist = true;
    $scope.loadingBands = true;
    
    var getArtist = function(){
        MusicService
        .getArtist(artistSlug)
        .then(function(res){ 
            $scope.artist = res.data;
            $scope.loadingArtist = false;
            getBands();
        }, function(err){
            $scope.error = err;
            $scope.loadingArtist = false;
        });
    };
    
    var getBands = function(){
        MusicService
        .getArtistBands(artistSlug)
        .then(function(res){ 
            $scope.artist.bands = res.data;
            $scope.loadingBands = false;
        }, function(err){
            $scope.error = err;
            $scope.loadingBands = false;
        });
    };
    
    
    getArtist();
}