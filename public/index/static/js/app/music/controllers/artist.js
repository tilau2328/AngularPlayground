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
        MusicService.artists.detail.get({slug: artistSlug}, function(artist){
            $scope.artist = artist;
            $scope.loadingArtist = false;
            getBands();
        });
    };
    
    var getBands = function(){
        MusicService.artists.bands.query({slug: artistSlug}, function(bands){
            $scope.artist.bands = bands;
            $scope.loadingBands = false;
        });
    };
    
    
    getArtist();
}